// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRfgHEmFFKyn3DdU134X3YXmbWe5Cdeaw",
  authDomain: "buzzr-377b7.firebaseapp.com",
  projectId: "buzzr-377b7",
  storageBucket: "buzzr-377b7.appspot.com",
  messagingSenderId: "883846425181",
  appId: "1:883846425181:web:bd902657e12ede1b347bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)