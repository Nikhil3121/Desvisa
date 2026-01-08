import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile", { replace: true });
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-gray-100 to-zinc-200 px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl px-10 py-12">
      
      {/* BRAND */}
      <div className="text-center mb-10">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold">
          D
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Login to continue shopping on{" "}
          <span className="font-semibold text-gray-900">Desvisa</span>
        </p>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6">

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-gray-900 focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-14 text-gray-900 focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-black"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* ACTION ROW */}
        <div className="flex items-center justify-end text-sm">
          <Link
            to="/forgot-password"
            className="text-gray-600 hover:text-black font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* CTA */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black py-3.5 text-white font-semibold text-base tracking-wide hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Login"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}
      </form>

      {/* FOOTER */}
      <div className="mt-10 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-black hover:underline"
        >
          Create one
        </Link>
      </div>
    </div>
  </div>
);


}
