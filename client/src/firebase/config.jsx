// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADHDLrr5qxkVb9JAmiNiHtVB8b_jB48mc",
  authDomain: "note-app-a240f.firebaseapp.com",
  projectId: "note-app-a240f",
  storageBucket: "note-app-a240f.firebasestorage.app",
  messagingSenderId: "606629572107",
  appId: "1:606629572107:web:ec915c636738cabc02e10e",
  measurementId: "G-8P4J8V208G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);