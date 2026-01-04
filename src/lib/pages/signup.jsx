import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || "Signup failed"}`);
      } else {
        setMessage("✅ Signup successful!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      setMessage("❌ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Create Your Account</h1>
          <p style={heroSubtitle}>
            Join Deshvisa and upgrade your fashion experience
          </p>
        </div>
      </section>

      {/* SIGNUP FORM */}
      <section style={formSection}>
        <form style={form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            style={input}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            style={input}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            style={input}
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={input}
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            style={input}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" style={submitBtn} disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>
      </section>
    </div>
  );
}

export default Signup;

/* ================= STYLES ================= */

const heroStyle = {
  height: "60vh",
  background: "linear-gradient(to right, #111, #333)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: "80px"
};

const heroContent = { maxWidth: "600px" };
const heroTitle = { fontSize: "48px", marginBottom: "10px" };
const heroSubtitle = { fontSize: "18px", color: "#ccc" };

const formSection = {
  padding: "50px",
  display: "flex",
  justifyContent: "center"
};

const form = {
  maxWidth: "450px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  background: "#f9f9f9",
  padding: "40px"
};

const input = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc"
};

const submitBtn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px"
};
