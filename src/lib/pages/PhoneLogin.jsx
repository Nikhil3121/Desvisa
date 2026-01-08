import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "@/firebase/firebase"; // 🔥 your firebase config

function PhoneLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= SEND OTP ================= */
  const sendOtp = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      setConfirmation(confirmationResult);
      setMessage("OTP sent successfully");
    } catch (err) {
      setMessage(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");

      const result = await confirmation.confirm(otp);
      const idToken = await result.user.getIdToken();

      // 🔐 Send Firebase token to backend
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/firebase-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await res.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/profile");
    } catch (err) {
      setMessage("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-center font-semibold mb-3">
        Login with Phone
      </h3>

      <div id="recaptcha-container"></div>

      <input
        placeholder="+91XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input mb-3"
      />

      <button
        onClick={sendOtp}
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-lg"
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>

      {confirmation && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input mt-4"
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-3"
          >
            Verify OTP
          </button>
        </>
      )}

      {message && (
        <p className="text-center text-sm mt-3 text-red-600">
          {message}
        </p>
      )}
    </div>
  );
}

export default PhoneLogin;
