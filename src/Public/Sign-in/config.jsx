import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDgsiV_6sWm7DAQz_fIT3joN0W7RoFfhqo",
  authDomain: "sign-in-autentification.firebaseapp.com",
  projectId: "sign-in-autentification",
  storageBucket: "sign-in-autentification.appspot.com",
  messagingSenderId: "73866198458",
  appId: "1:73866198458:web:04609cdd47aa2c897fb183",
  measurementId: "G-K5QKK84QNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const Provider = new GoogleAuthProvider()
export {auth, Provider}