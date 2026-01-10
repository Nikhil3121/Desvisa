import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase";

function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    const email = e.target.email.value;

    try {
      setLoading(true);

      // 🔐 Force correct reset redirect URL
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      });

      setSuccess(true);
      setMessage("✅ Password reset email sent. Please check your inbox.");

      e.target.reset();
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.code === "auth/user-not-found"
          ? "❌ No account found with this email"
          : err.code === "auth/too-many-requests"
          ? "❌ Too many requests. Try again later."
          : "❌ Failed to send reset email"
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
            Forgot Password
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your email to reset your password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
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
          Remembered your password?{" "}
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

export default ForgotPassword;
