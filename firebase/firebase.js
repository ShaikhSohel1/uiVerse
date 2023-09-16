import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// main db
const firebaseConfig = {
  apiKey: "AIzaSyCo-Guoq96PtWOeF3W6_aFqu6rEPo8Trws",
  authDomain: "uiverse-7e818.firebaseapp.com",
  projectId: "uiverse-7e818",
  storageBucket: "uiverse-7e818.appspot.com",
  messagingSenderId: "633526511823",
  appId: "1:633526511823:web:08312d48d0a3ab13b66fba",
  measurementId: "G-YNZJYT6V8L"
};

// test db
// const firebaseConfig = {
//   apiKey: "AIzaSyD39nVC-jmT6xadD-ynpoIcGOIQi3AYu8g",
//   authDomain: "uiverse-2.firebaseapp.com",
//   projectId: "uiverse-2",
//   storageBucket: "uiverse-2.appspot.com",
//   messagingSenderId: "351436800494",
//   appId: "1:351436800494:web:e9d0f8ed249c21e799ceff",
//   measurementId: "G-NRGDX7CEQL"
// };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};