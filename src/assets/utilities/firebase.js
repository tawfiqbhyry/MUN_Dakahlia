import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
  appId: `${process.env.APP_ID}`,
  databaseURL: `${process.env.DATABASE_URL}`,
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const secondDB = getDatabase(secondaryApp);
const secondAuth = getAuth(secondaryApp);
export { auth, db, secondDB, secondAuth };
