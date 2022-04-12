
import * as firebase from "firebase/app";

import  { getFirestore } from 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyC6lmhPhvHVyL3rcwuoOzT2PYTEfO-iUwc",
  authDomain: "chatdev-a6b30.firebaseapp.com",
  projectId: "chatdev-a6b30",
  storageBucket: "chatdev-a6b30.appspot.com",
  messagingSenderId: "868780627039",
  appId: "1:868780627039:web:43e5977040a1b0a88e37ea"
});

const db = getFirestore()

export {firebase, db}