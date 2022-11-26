// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnFmfVlB2xGbxtWmE8gF3hYQQFwn0dv3s",
  authDomain: "iot-ecg-ui.firebaseapp.com",
  projectId: "iot-ecg-ui",
  storageBucket: "iot-ecg-ui.appspot.com",
  messagingSenderId: "595153102046",
  appId: "1:595153102046:web:266cf93da4c591d17a8e4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db; 

 