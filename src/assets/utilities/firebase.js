import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
require('dotenv').config();
const {
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  DATABASE_URL,
} = process.env;

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  databaseURL: DATABASE_URL,
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const secondDB = getDatabase(secondaryApp);
const secondAuth = getAuth(secondaryApp);
export { auth, db, secondDB, secondAuth };
