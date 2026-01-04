import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "@/state/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = await login({ email, password });

      // Optional: store user info (token if backend sends it)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/profile");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Welcome Back</h1>
          <p style={heroSubtitle}>
            Login to continue your Desvisa journey
          </p>
        </div>
      </section>

      {/* LOGIN FORM */}
      <section style={formSection}>
        <form style={form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            style={input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={submitBtn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p style={{ marginTop: "10px" }}>{message}</p>}

          <p style={signupText}>
            Don’t have an account?{" "}
            <Link to="/signup" style={signupLink}>
              Sign Up
            </Link>
          </p>
        </form>
      </section>

      {/* TRUST SECTION */}
      <section style={highlightSection}>
        <h2 style={highlightHeading}>Why Login to Desvisa?</h2>
        <div style={benefitsGrid}>
          <div>✔ Track Orders Easily</div>
          <div>✔ Save Wishlist Items</div>
          <div>✔ Faster Checkout</div>
          <div>✔ Exclusive Offers</div>
        </div>
      </section>
    </div>
  );
}
