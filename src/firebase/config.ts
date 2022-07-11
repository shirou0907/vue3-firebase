// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: "auth-width-vue3",
  storageBucket: "auth-width-vue3.appspot.com",
  messagingSenderId: "1049321760580",
  appId: import.meta.env.VITE_APP_ID,
  measurementId: "G-X2S7YNBMEJ",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
auth.languageCode = "it";

export { db, auth };
