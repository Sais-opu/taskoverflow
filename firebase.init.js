// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsq1i-f0UpZAbytE6iugDmQNX2vEXvXD0",
  authDomain: "taskoverflow-6f0b0.firebaseapp.com",
  projectId: "taskoverflow-6f0b0",
  storageBucket: "taskoverflow-6f0b0.firebasestorage.app",
  messagingSenderId: "542597347094",
  appId: "1:542597347094:web:e963b50fb2988f47ed4237"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;