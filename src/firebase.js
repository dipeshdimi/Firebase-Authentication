import { initializeApp } from "firebase/app";
import {getAuth/*, GoogleAuthProvider*/} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbPYQCbeAw0irfiL89HvgVnYSdY0680zI",
  authDomain: "fir-auth-74c38.firebaseapp.com",
  projectId: "fir-auth-74c38",
  storageBucket: "fir-auth-74c38.appspot.com",
  messagingSenderId: "341568247362",
  appId: "1:341568247362:web:4315d24a7fcaef7595ffdb",
  measurementId: "G-S8YGL4DWZH"
};

const app = initializeApp(firebaseConfig);

export const myAuth = getAuth(app);

export const myStorage = getStorage();

export const myDB = getFirestore()