import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  // Send Firebase token to backend
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/firebase-login`,
    { idToken }
  );

  // Store tokens
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};
