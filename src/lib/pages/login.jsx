import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/state/api";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email: e.target.email.value,
        password: e.target.password.value,
      }).unwrap();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/profile");
    } catch (err) {
      setMessage(`❌ ${err?.data?.message || "Login failed"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
