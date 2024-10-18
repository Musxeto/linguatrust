import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBuqso-Xxs3ZuUr6uja6xPHIWsP3kls6ZE",
    authDomain: "translator-b0976.firebaseapp.com",
    projectId: "translator-b0976",
    storageBucket: "translator-b0976.appspot.com",
    messagingSenderId: "322886560482",
    appId: "1:322886560482:web:8f1b0604ba256613208cbb"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realdb = getDatabase(app);
export { auth, db, storage, realdb};
