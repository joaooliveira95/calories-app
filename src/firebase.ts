// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0T5M6Dut0OzqdoLceyhdOIq9JL3J-fRk",
  authDomain: "calorie-app-d78f4.firebaseapp.com",
  projectId: "calorie-app-d78f4",
  storageBucket: "calorie-app-d78f4.appspot.com",
  messagingSenderId: "1061203213337",
  appId: "1:1061203213337:web:aa20c5166ae1c094df3e88",
  measurementId: "G-XKVSNFDB4Y",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(firebaseApp)
// const analytics = getAnalytics(FirebaseApp);
