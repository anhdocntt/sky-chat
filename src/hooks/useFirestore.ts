import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection } from "../firebase/collection";
import { Condition } from "../interfaces/Condition";

export default function useFirestore(collection: collection, condition: Condition) {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).limit(100);

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

    const unsubcribe = collectionRef.onSnapshot(snapshot => {
      const docs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocs(docs);
    });
    
    return () => {
      unsubcribe();
    }
  }, [collection, condition]);

  return docs;
};
