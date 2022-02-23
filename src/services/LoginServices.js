import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export default class LoginServices {
  static Signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  static Login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  static Logout() {
    signOut(auth);
  }
}
