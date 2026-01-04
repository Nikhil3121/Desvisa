import { useState } from "react";
import { signup } from "@/state/api";

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

      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      setMessage("✅ Signup successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });
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
          <h1 style={heroTitle}>Create Your Account</h1>
          <p style={heroSubtitle}>
            Join Desvisa and upgrade your fashion experience
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
