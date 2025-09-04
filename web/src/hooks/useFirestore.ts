import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = (collectionName: string, conditions?: any[]) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let q = collection(db, collectionName);
    
    if (conditions && conditions.length > 0) {
      q = query(q, ...conditions);
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, JSON.stringify(conditions)]);

  const addDocument = async (docData: any, docId?: string) => {
    try {
      const docRef = docId ? doc(db, collectionName, docId) : doc(collection(db, collectionName));
      await setDoc(docRef, { ...docData, createdAt: new Date() });
      return docRef.id;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateDocument = async (docId: string, updates: any) => {
    try {
      await updateDoc(doc(db, collectionName, docId), updates);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument
  };
};

export const useDocument = (collectionName: string, docId: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!docId) return;

    const unsubscribe = onSnapshot(doc(db, collectionName, docId), 
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, docId]);

  return { data, loading, error };
};