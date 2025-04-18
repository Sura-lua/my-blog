// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2NBNgVJ_BxxJybYHkzRdBolBkErhTgFk",
  authDomain: "bonnoblog.firebaseapp.com",
  projectId: "bonnoblog",
  storageBucket: "bonnoblog.firebasestorage.app",
  messagingSenderId: "148878287420",
  appId: "1:148878287420:web:b89510bc0f909f2264d939",
  measurementId: "G-63DLFBPS5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
