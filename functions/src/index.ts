import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/lib/providers/https";
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

module.exports.deleteComment = functions.https.onCall(async (data, context) => {
  try {
    const user = await auth.getUser(context.auth?.token.uid as string);
    const doc = await db.doc("articles/" + data.article).get();
    if (doc.exists) {
      const comments: any[] = (doc as any).data().comments;
      const comment = comments.find(com => com.id === data.comment);
      if (comment) {
        if (user.uid === comment.user.uid) {
          const index = comments.indexOf(comment);
          comments.splice(index, 1);
          await doc.ref.update({
            comments
          });
          return "success";
        } else {
          throw new HttpsError("permission-denied", "not this user");
        }
      } else {
        throw new HttpsError("not-found", "comment not found");
      }
    } else {
      throw new HttpsError("not-found", "article not found");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});
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
    return "success";
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
      console.log(change.after.id, context.auth?.uid);
      const batch = db.batch();
      const query = db
        .collection("articles")
        .where("user.uid", "==", change.after.id);
      const snapshot = await query.get();
      console.log(snapshot.empty);
      snapshot.forEach(doc => {
        batch.update(doc.ref, {
          user: {
            uid: change.after.id,
            displayName,
            photoURL
          }
        });
      });
      await batch.commit();
      return "success";
    } catch (error) {
      console.log(error);
      return error;
    }
  });

module.exports.onUserCreate = functions.auth.user().onCreate(async user => {
  try {
    let userObject;
    if (user.displayName) {
      userObject = {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        institute: "not set",
        about: "not set"
      };
    } else
      userObject = {
        uid: user.uid,
        photoURL: user.photoURL,
        institute: "not set",
        about: "not set"
      };
    await db.doc("users/" + user.uid).set(userObject, { merge: true });
    return "success";
  } catch (error) {
    console.log(error);
    return error;
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
        () => {
          console.log(`deleted ${doc.id}`);
          return "success";
        },
        err => {
          console.error(err.message);
          return err;
        }
      )
      .catch(err => {
        console.error(err.message);
        return err;
      });
  });
