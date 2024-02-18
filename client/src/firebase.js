// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-3a9b8.firebaseapp.com",
    projectId: "mern-blog-3a9b8",
    storageBucket: "mern-blog-3a9b8.appspot.com",
    messagingSenderId: "310511273468",
    appId: "1:310511273468:web:1033b349e298130c495e79"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);