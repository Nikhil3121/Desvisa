import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

function LogoutAllDevices() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogoutAll = async () => {
    setMessage("");
    setLoading(true);

    try {
      // 🔐 Firebase sign out (current device)
      await signOut(auth);

      // 🔒 Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setSuccess(true);
      setMessage(
        "✅ You have been logged out from this device. Please login again on other devices if needed."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setMessage("❌ Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Logout From All Devices
        </h1>
        <p className="text-gray-500 mb-6">
          This will sign you out from this device.
        </p>

        {/* Action */}
        <button
          onClick={handleLogoutAll}
          disabled={loading || success}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-60"
        >
          {loading
            ? "Logging out..."
            : success
            ? "Logged Out"
            : "Logout"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Changed your mind?{" "}
          <Link
            to="/profile"
            className="font-semibold text-black hover:underline"
          >
            Go back to Profile
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogoutAllDevices;
