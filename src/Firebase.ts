import firebase from "firebase/app";
import config from "./firebase-conf";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/storage";

firebase.apps.length || firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();

export default firebase;
