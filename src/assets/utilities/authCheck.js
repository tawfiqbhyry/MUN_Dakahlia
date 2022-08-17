import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";

export default function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return `error: ${errorCode}: ${errorMessage}`;
    });
}
