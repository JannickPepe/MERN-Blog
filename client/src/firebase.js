// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f4547.firebaseapp.com",
  projectId: "mern-blog-f4547",
  storageBucket: "mern-blog-f4547.appspot.com",
  messagingSenderId: "993543050744",
  appId: "1:993543050744:web:2667dc6d2c7adf8cebb20d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
