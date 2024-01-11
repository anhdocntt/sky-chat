import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection } from "../enums/collection";
import { Condition } from "../interfaces/Condition";

export default function useFirestore(
  collection: collection,
  condition?: Condition,
  limit: number = 100
) {
  const [docs, setDocs] = useState<any[]>([]);
  let curDocs: any[] = [];

  useEffect(() => {
    let collectionRef = db
      .collection(collection)
      .orderBy("createdAt")
      .limit(limit);

    if (condition) {
      if (!condition.value || !condition.value?.length) {
        setDocs([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldPath,
        condition.opStr,
        condition.value
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const newDocs = snapshot
        .docChanges()
        .map((change) => {
          if (change.type === "added" || change.type === "modified") {
            const newDoc = {
              id: change.doc.id,
              ...change.doc.data(),
            };

            const existingDocIndex = curDocs.findIndex(
              (doc) => doc.id === newDoc.id
            );

            if (existingDocIndex === -1) {
              return newDoc;
            } else {
              curDocs[existingDocIndex] = newDoc;
            }

            return null;
          }

          if (change.type === "removed") {
          }

          return null;
        })
        .filter((doc) => doc !== null);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      curDocs = [...curDocs, ...newDocs];
      setDocs(curDocs);
    });

    return () => {
      unsubscribe();
    };
  }, [collection, condition]);

  return docs;
}
