import firebase from "firebase/app";
import { db } from "./config";

export const addDocument = (collection: string, data: any) => {
  const query = db.collection(collection);

  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
};
