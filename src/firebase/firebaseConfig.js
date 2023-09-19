// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBUZYuLcg9vLHE3plcXSsVw6uj52keL5OE",
  authDomain: "expense-tracker-b321c.firebaseapp.com",
  projectId: "expense-tracker-b321c",
  storageBucket: "expense-tracker-b321c.appspot.com",
  messagingSenderId: "1084830971814",
  appId: "1:1084830971814:web:bab816a44b6ec6be64c167"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore

export { app, auth, provider, db };