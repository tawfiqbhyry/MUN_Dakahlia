import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  authDomain: `${process.env.VUE_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_MESSAGING_SENDER_ID}`,
  appId: process.env.VUE_APP_APP_ID,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const secondDB = getDatabase(secondaryApp);
const secondAuth = getAuth(secondaryApp);
export { auth, db, secondDB, secondAuth };
