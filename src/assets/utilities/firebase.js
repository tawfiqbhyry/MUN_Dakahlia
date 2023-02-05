import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyA8sB7ygOsbkZZT7eUxzblQs1OIzvBTCDo",
  authDomain: "mun-website-b80f5.firebaseapp.com",
  databaseURL: "https://mun-website-b80f5-default-rtdb.firebaseio.com",
  projectId: "mun-website-b80f5",
  storageBucket: "mun-website-b80f5.appspot.com",
  messagingSenderId: "693292642041",
  appId: "1:693292642041:web:5019fc1c858b51673abc28",
  measurementId: "G-MTG13PP7DK"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "secondary");
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
const secondDB = getDatabase(secondaryApp);
const secondAuth = getAuth(secondaryApp);
const analytics = getAnalytics(firebaseApp);
const analyticsss = getAnalytics(secondaryApp);
export { auth, db, secondDB, secondAuth ,analytics,analyticsss};
