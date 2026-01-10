import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const oobCode = searchParams.get("oobCode"); // 🔑 Firebase reset code

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!oobCode) {
      return setMessage("❌ Invalid or expired reset link");
    }

    if (password.length < 6) {
      return setMessage("❌ Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    try {
      setLoading(true);

      // 🔐 Firebase confirms reset
      await confirmPasswordReset(auth, oobCode, password);

      setSuccess(true);
      setMessage("✅ Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.code === "auth/expired-action-code"
          ? "❌ Reset link expired. Please request a new one."
          : err.code === "auth/invalid-action-code"
          ? "❌ Invalid reset link"
          : "❌ Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Reset Password
          </h1>
          <p className="text-gray-500 mt-2">
            Create a new secure password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading
              ? "Resetting..."
              : success
              ? "Password Reset"
              : "Reset Password"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Back to{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
