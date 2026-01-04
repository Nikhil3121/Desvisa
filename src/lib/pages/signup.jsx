import { useState } from "react";
import { useSignupUserMutation } from "@/state/api";

function Signup() {
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
      }).unwrap();

      setMessage("✅ Signup successful!");
    } catch (err) {
      setMessage(`❌ ${err?.data?.message || "Signup failed"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" />
      <input name="password" type="password" placeholder="Password" required />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Sign Up"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default Signup;
