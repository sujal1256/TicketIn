// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaap7X0XVN5iQ0EouHgrO8vjKmhMlXZIs",
  authDomain: "ticketin-1728a.firebaseapp.com",
  projectId: "ticketin-1728a",
  storageBucket: "ticketin-1728a.firebasestorage.app",
  messagingSenderId: "335597021204",
  appId: "1:335597021204:web:fe69b93eecb07fa4c89f01",
  measurementId: "G-KDS0FKBYXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export {app, auth, googleProvider};