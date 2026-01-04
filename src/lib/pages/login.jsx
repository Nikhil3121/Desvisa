import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN FROM BACKEND
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/profile");
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Welcome Back</h1>
          <p style={heroSubtitle}>Login to continue your Deshvisa journey</p>
        </div>
      </section>

      {/* LOGIN INTRO */}
      <section style={section}>
        <h2 style={heading}>Login</h2>
        <p style={text}>
          Sign in to your Deshvisa account to manage your orders, wishlist, and
          profile.
        </p>
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

          <button
            type="button"
            style={submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p style={{ marginTop: "10px" }}>{message}</p>}

          <p style={signupText}>
            Don’t have an account?{" "}
            <span
              style={signupLink}
              onClick={() => (window.location.href = "/login")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </section>

      {/* TRUST SECTION */}
      <section style={highlightSection}>
        <h2 style={highlightHeading}>Why Login to Deshvisa?</h2>
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

/* ================= STYLES ================= */

const heroStyle = {
  height: "60vh",
  background: "linear-gradient(to right, #111, #333)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: "80px",
};

const heroContent = { maxWidth: "600px" };
const heroTitle = { fontSize: "48px", marginBottom: "10px" };
const heroSubtitle = { fontSize: "18px", color: "#ccc" };

const section = { padding: "70px 80px" };
const heading = { fontSize: "32px", marginBottom: "20px" };
const text = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#555",
  maxWidth: "800px",
};

const formSection = {
  padding: "50px 80px",
  display: "flex",
  justifyContent: "center",
};

const form = {
  maxWidth: "450px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  background: "#f9f9f9",
  padding: "40px",
};

const input = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc",
};

const submitBtn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

const signupText = {
  marginTop: "15px",
  fontSize: "14px",
  textAlign: "center",
};

const signupLink = {
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};

const highlightSection = {
  padding: "60px 80px",
  background: "#000",
  color: "#fff",
  textAlign: "center",
};

const highlightHeading = {
  fontSize: "32px",
  marginBottom: "30px",
};

const benefitsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  fontSize: "18px",
};
