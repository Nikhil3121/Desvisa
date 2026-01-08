import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const firebaseSignup = async (email, password) => {
  const userCred = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendEmailVerification(userCred.user);

  return userCred.user;
};

export const firebaseLogin = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const idToken = await userCred.user.getIdToken();

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/firebase-login`,
    { idToken }
  );

  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);

  return res.data.user;
};
