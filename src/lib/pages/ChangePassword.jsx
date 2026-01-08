import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useChangePasswordMutation } from "@/state/api";

function ChangePassword() {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
      await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      setSuccess(true);
      setMessage("✅ Password changed successfully. Please login again.");

      // 🔒 logout user after password change
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setMessage(
        `❌ ${err?.data?.message || "Failed to change password"}`
      );
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
            disabled={isLoading || success}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {isLoading
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
