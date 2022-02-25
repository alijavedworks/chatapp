import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export default class UserService {
  static addUser = (newUser) => {
    console.log(newUser);
    const docRef = doc(db, "users", newUser.uid);
    return setDoc(docRef, newUser);
  };

  static updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };

  static deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    return deleteDoc(userDoc);
  };

  static getAllUsers = () => {
    return getDocs(usersCollectionRef);
  };

  static getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
}
