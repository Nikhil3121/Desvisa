import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "@/state/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      return setMessage("❌ Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    try {
      await resetPassword({ token, password }).unwrap();

      setSuccess(true);
      setMessage("✅ Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setSuccess(false);
      setMessage(
        `❌ ${err?.data?.message || "Reset link expired or invalid"}`
      );
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
            disabled={isLoading}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
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
