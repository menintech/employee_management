// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBN2HMzTHhqnB2HftMUJIHF-1fOaFEjmQ",
  authDomain: "menintech-ems.firebaseapp.com",
  projectId: "menintech-ems",
  storageBucket: "menintech-ems.firebasestorage.app",
  messagingSenderId: "599164953237",
  appId: "1:599164953237:web:f509e8a900f208eaa0b19c",
  measurementId: "G-4GM65NCFLX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
