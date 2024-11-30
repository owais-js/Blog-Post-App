import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBsRyDBK-tFj_T64CVyYxsbB2yiGncUzik",
  authDomain: "blog-post-app-bc330.firebaseapp.com",
  projectId: "blog-post-app-bc330",
  storageBucket: "blog-post-app-bc330.firebasestorage.app",
  messagingSenderId: "431744428405",
  appId: "1:431744428405:web:bc40172e73dbdb6f820b3c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);