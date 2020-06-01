import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// const gcs = require('@google-cloud/storage')();

// const bucket = gcs.bucket(functions.config().firebase.storageBucket)

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

function uuid() {
  const ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const ID_LENGTH = 8;
  let rtn = "";
  for (let i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

module.exports.addComment = functions.https.onCall(async (data, context) => {
  try {
    const user = await auth.getUser(context.auth?.token.uid as string);
    if (user) {
      const { uid, displayName, photoURL } = user;
      db.doc("articles/" + data.id).update({
        comments: admin.firestore.FieldValue.arrayUnion({
          user: { uid, displayName, photoURL },
          text: data.comment,
          time: new Date(),
          id: uuid()
        })
      });
    } else console.log("user not found");
  } catch (error) {
    console.log(error);
    return error;
  }
});

module.exports.updateArticleUser = functions.firestore
  .document("users/{userId}")
  .onUpdate(async (change, context) => {
    try {
      const { displayName, photoURL } = (change as any).after.data();
      const batch = db.batch();
      const qs = await db
        .collection("articles")
        .where("user.uid", "==", change.after.id)
        .get();
      qs.forEach(doc => {
        batch.update(doc.ref, {
          user: {
            uid: change.after.id,
            displayName,
            photoURL
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

module.exports.onUserCreate = functions.auth.user().onCreate(async user => {
  try {
    db.doc("users/" + user.uid).set({
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      institute: "not set",
      about: "not set"
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports.onArticleDelete = functions.firestore
  .document("articles/{articleID}")
  .onDelete((doc, context) => {
    admin
      .storage()
      .bucket()
      .file("articles/" + doc.id)
      .delete()
      .then(
        () => console.log(`deleted ${doc.id}`),
        err => console.error(err.message)
      )
      .catch(err => console.log(err.message));
  });
