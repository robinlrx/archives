// firebase config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2BNXbnVwyYa-ccxgUI6QRE4aRihJZX-k",
  authDomain: "omar-2b0e7.firebaseapp.com",
  projectId: "omar-2b0e7",
  storageBucket: "omar-2b0e7.appspot.com",
  messagingSenderId: "675335574331",
  appId: "1:675335574331:web:7c3d54284e8328c615dd1e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);