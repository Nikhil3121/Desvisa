import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/verify-email/${token}`
        );

        // 🔐 STORE TOKENS
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        setStatus("success");
        setMessage(res.data.message);

        // ⏳ Redirect after animation
        setTimeout(() => navigate("/profile"), 2500);
      } catch (err) {
        setStatus("error");
        setMessage(
          err?.response?.data?.message || "Verification failed"
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-md">

        {status === "loading" && (
          <p className="text-lg font-medium">Verifying your email…</p>
        )}

        {status === "success" && (
          <div className="animate-pop">
            <div className="text-green-600 text-6xl mb-4">✔</div>
            <h2 className="text-2xl font-bold mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600">
              Redirecting to your account…
            </p>
          </div>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Verification Failed
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>

      {/* ANIMATION */}
      <style>
        {`
          .animate-pop {
            animation: pop 0.6s ease-out;
          }
          @keyframes pop {
            0% { transform: scale(0.6); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default VerifyEmail;
