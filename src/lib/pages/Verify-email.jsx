import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useFirebaseLoginMutation } from "@/state/api";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [firebaseLogin] = useFirebaseLoginMutation();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      try {
        const oobCode = searchParams.get("oobCode");

        if (!oobCode) {
          throw new Error("missing-code");
        }

        // 🔐 Apply Firebase email verification
        await applyActionCode(auth, oobCode);

        // 🔄 If user is logged in, sync with backend
        if (auth.currentUser) {
          await auth.currentUser.reload();
        }

        if (!isMounted) return;

        setStatus("success");
        setMessage("Email verified successfully");

        setTimeout(() => navigate("/profile"), 2500);
      } catch (err) {
        if (!isMounted) return;

        setStatus("error");

        if (err.code === "auth/invalid-action-code") {
          setMessage("Invalid or expired verification link");
        } else if (err.message === "missing-code") {
          setMessage("Invalid verification link");
        } else {
          setMessage("Email verification failed. Please login again.");
        }
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [searchParams, firebaseLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-md">
        {status === "loading" && (
          <p className="text-lg font-medium">Verifying your email…</p>
        )}

        {status === "success" && (
          <div className="animate-pop">
            <div className="text-green-600 text-6xl mb-4">✔</div>
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-600">Redirecting to your account…</p>
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
