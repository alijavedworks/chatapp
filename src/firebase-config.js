import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoGaX8iuI39tZA4Pf75UgBX4I5gfkMfLM",
  authDomain: "chatapp-3b9c5.firebaseapp.com",
  projectId: "chatapp-3b9c5",
  storageBucket: "chatapp-3b9c5.appspot.com",
  messagingSenderId: "245775230683",
  appId: "1:245775230683:web:c8bfb985b3f27ed9c30efe",
  measurementId: "G-WQE75RHZ5M",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
