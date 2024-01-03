import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQqfK1CdECkT0Nq3gGUsXZFmXl_E4fKh4",
  authDomain: "sky-chat-961fd.firebaseapp.com",
  projectId: "sky-chat-961fd",
  storageBucket: "sky-chat-961fd.appspot.com",
  messagingSenderId: "138833786928",
  appId: "1:138833786928:web:18dd97d86b2aecf00855f5"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
