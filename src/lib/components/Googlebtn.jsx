import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";

const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/firebase-login`,
    { idToken }
  );

  localStorage.setItem("accessToken", res.data.accessToken);
  localStorage.setItem("refreshToken", res.data.refreshToken);

  window.location.href = "/profile";
};
