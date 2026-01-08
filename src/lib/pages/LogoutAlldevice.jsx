import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogoutAllDevicesMutation } from "@/state/api";

function LogoutAllDevices() {
  const navigate = useNavigate();
  const [logoutAllDevices, { isLoading }] = useLogoutAllDevicesMutation();

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogoutAll = async () => {
    setMessage("");

    try {
      await logoutAllDevices().unwrap();

      // 🔒 Clear tokens locally
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setSuccess(true);
      setMessage("✅ You have been logged out from all devices.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setMessage(
        `❌ ${err?.data?.message || "Failed to logout from all devices"}`
      );
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
          This will sign you out from all browsers and devices.
        </p>

        {/* Action */}
        <button
          onClick={handleLogoutAll}
          disabled={isLoading || success}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-60"
        >
          {isLoading
            ? "Logging out..."
            : success
            ? "Logged Out"
            : "Logout All Devices"}
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
