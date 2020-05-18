import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyBrIneovHHszKjj5CT32uJGwUj8MYDt1RA",
  authDomain: "gontobbo-ruet.firebaseapp.com",
  databaseURL: "https://gontobbo-ruet.firebaseio.com",
  projectId: "gontobbo-ruet",
  storageBucket: "gontobbo-ruet.appspot.com",
  messagingSenderId: "515513045111",
  appId: "1:515513045111:web:151e0ccdccf6cd5022f672",
  measurementId: "G-KWF6X3CNW8"
});
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
