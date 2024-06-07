import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFD7wJcS_ePKATFqB9m3BhX_oxlJp8RJg",
  authDomain: "next-project-738ef.firebaseapp.com",
  projectId: "next-project-738ef",
  storageBucket: "next-project-738ef.appspot.com",
  messagingSenderId: "982442509481",
  appId: "1:982442509481:web:becafda5359d05051b15b8",
  measurementId: "G-25Q1KCGFVG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);