import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { googleLogin } from "@/lib/utils";
import { useFirebaseLoginMutation } from "@/state/api";

/* ================= PASSWORD STRENGTH ================= */
const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export default function Signup() {
  const navigate = useNavigate();
  const [firebaseLogin] = useFirebaseLoginMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ][strength];

  const strengthColor = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-yellow-400",
    "bg-green-500",
    "bg-green-600",
  ][strength];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= EMAIL SIGNUP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      await sendEmailVerification(user, {
        url: "https://desvisa.com/emailverify",
      });

      setSuccess(true);
      setMessage("Check your email to verify your account.");
    } catch (err) {
      setSuccess(false);
      setMessage(
        err.code === "auth/email-already-in-use"
          ? "Email already registered"
          : "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE SIGNUP ================= */
  const handleGoogleSignup = async () => {
    try {
      await googleLogin();

      const idToken = await auth.currentUser.getIdToken();
      await firebaseLogin(idToken).unwrap();

      navigate("/profile");
    } catch {
      alert("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl px-10 py-12">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h1>
          <p className="text-gray-500 mt-2">
            Join <span className="font-semibold">Desvisa</span> today
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            onChange={handleChange}
            className="input"
          />

          <input
            name="phone"
            placeholder="Phone number (optional)"
            onChange={handleChange}
            className="input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input"
          />

          {/* PASSWORD STRENGTH */}
          {form.password && (
            <div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strengthColor}`}
                  style={{ width: `${(strength / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs mt-1 text-gray-600">
                Strength: <strong>{strengthLabel}</strong>
              </p>
            </div>
          )}

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            required
            className="input"
          />

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
          >
            Continue with Google
          </button>

          {/* TERMS */}
          <label className="flex gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="accent-black mt-1"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="underline font-medium">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline font-medium">
                Privacy Policy
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading
              ? "Creating account..."
              : success
              ? "Check your email"
              : "Create Account"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* FOOTER */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 0.9rem 1.1rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.9rem;
            outline: none;
          }
          .input:focus {
            border-color: #000;
            box-shadow: 0 0 0 1px #000;
          }
        `}
      </style>
    </div>
  );
}
