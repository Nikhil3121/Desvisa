import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 6) {
      return setMessage("❌ New password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("❌ New passwords do not match");
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error("User not authenticated");
      }

      // 🚫 Google-only users cannot change password
      const hasPasswordProvider = user.providerData.some(
        (p) => p.providerId === "password"
      );

      if (!hasPasswordProvider) {
        throw new Error("This account uses Google sign-in");
      }

      // 🔐 Re-authenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // 🔑 Update password
      await updatePassword(user, newPassword);

      setSuccess(true);
      setMessage("✅ Password changed successfully. Please login again.");

      // 🔒 Logout
      setTimeout(async () => {
        await auth.signOut();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.message === "This account uses Google sign-in"
          ? "❌ Password change not available for Google accounts"
          : err.code === "auth/wrong-password"
          ? "❌ Current password is incorrect"
          : err.code === "auth/requires-recent-login"
          ? "❌ Please login again to change password"
          : "❌ Failed to change password"
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
            Change Password
          </h1>
          <p className="text-gray-500 mt-2">
            Keep your account secure
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : success
              ? "Password Updated"
              : "Change Password"}
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
            to="/profile"
            className="font-semibold text-black hover:underline"
          >
            Profile
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;
