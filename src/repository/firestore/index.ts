import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";
import { db } from "@/firebase/config.js";

export async function getData(document: string) {
  const querySnapshot = await getDocs(collection(db, document));
  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return data;
}

export async function getOneDoc(collection: string, id: string) {
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

export async function addNewDoc(document: string, data: any) {
  try {
    await addDoc(collection(db, document), data);
  } catch (error) {
    console.log(error);
  }
}

export async function createOrUpdate(document: string, data: any, id: string) {
  try {
    const cityRef = doc(db, document, id);
    await setDoc(cityRef, data, { merge: true });
  } catch (error) {
    console.log(error);
  }
}

export async function updateData(document: string, data: any, id: string) {
  try {
    const ref = doc(db, document, id);
    await updateDoc(ref, data);
  } catch (error) {
    console.log(error);
  }
}

export function updateArray() {
  const updateComment = async (document: string, data: any, id: string) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        comments: arrayUnion(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const like = async (document: string, data: any, id: string) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        [`likes.${data}`]: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const unLike = async (document: string, data: any, id: string) => {
    try {
      const ref = doc(db, document, id);
      await updateDoc(ref, {
        [`likes.${data}`]: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { updateComment, like, unLike };
}
