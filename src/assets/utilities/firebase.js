import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const secondDB = getDatabase(secondaryApp);
const secondAuth = getAuth(secondaryApp);
const analytics = getAnalytics(firebaseApp);
export { auth, db, secondDB, secondAuth ,analytics};
