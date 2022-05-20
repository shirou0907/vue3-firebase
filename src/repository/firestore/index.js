import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "@/firebase/config.js";

export async function getData(document) {
  const querySnapshot = await getDocs(collection(db, document));
  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
}

export async function getOneDoc(collection, id) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const result = docSnap.data();
    return { result };
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function addNewDoc(document, data) {
  try {
    await addDoc(collection(db, document), data);
  } catch (error) {
    console.log(error);
  }
}

export async function createOrUpdate(document, data, id) {
  try {
    const cityRef = doc(db, document, id);
    await setDoc(cityRef, data, { merge: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateData(document, data, id) {
  try {
    const ref = doc(db, document, id);
    await updateDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
}

export function updateArray() {
  const updateComment = async (document, data, id) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        comments: arrayUnion(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLike = async (document, data, id) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        like: arrayUnion(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unLike = async (document, data, id) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        like: arrayRemove(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { updateComment, updateLike, unLike };
}
