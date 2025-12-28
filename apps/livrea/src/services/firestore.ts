// Import the functions you need from the SDKs you need

import {getAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: process.env.VITE_FIREBASE_API_KEY,
   appId: process.env.VITE_FIREBASE_APP_ID,
   authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
   measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
   messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   projectId: process.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { analytics, firestore, auth };
