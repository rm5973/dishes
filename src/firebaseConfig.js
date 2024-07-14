// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXW9twwYRsfi0utzPBe5SrHXMNaZloj74",
  authDomain: "dishesproject-b8779.firebaseapp.com",
  databaseURL:"https://dishesproject-b8779-default-rtdb.firebaseio.com/",
  projectId: "dishesproject-b8779",
  storageBucket: "dishesproject-b8779.appspot.com",
  messagingSenderId: "328574684744",
  appId: "1:328574684744:web:a8298202ed6372862b127d",
  measurementId: "G-25TFX9LR2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };