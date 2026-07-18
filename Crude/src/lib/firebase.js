// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL7NPAWtQdBdQ7nr8kDr6qvFfsixU0MyU",
  authDomain: "school-f1ae7.firebaseapp.com",
  projectId: "school-f1ae7",
  storageBucket: "school-f1ae7.firebasestorage.app",
  messagingSenderId: "399954007903",
  appId: "1:399954007903:web:cab93eef0cac81046c08ea",
  measurementId: "G-BPXWGY16XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);