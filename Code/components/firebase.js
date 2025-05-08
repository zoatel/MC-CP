import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXL7xkoBaTWN7N0IwIfU-1aFgrF-hkgI0",
  authDomain: "mobile-c-publiclibrary.firebaseapp.com",
  projectId: "mobile-c-publiclibrary",
  storageBucket: "mobile-c-publiclibrary.firebasestorage.app",
  messagingSenderId: "733660003017",
  appId: "1:733660003017:web:f4296e7e51ada7df67ab18",
  measurementId: "G-877DQHLKDT",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, googleProvider, facebookProvider };