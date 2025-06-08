import { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import "../css/Login.scss"; 

export default function LoginRegisterPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const toggleMode = () => {
    setMessage("");
    setForm({ username: "", email: "", password: "" });
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;

    const result = isRegister
      ? await registerUser({ username, email, password })
      : await loginUser({ email, password });
    console.log("Register result:", result);

    setMessage(result.message || result.error || (isRegister ? "Registered!" : "Logged in!"));
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>

      <p style={{ color: "#ccc", textAlign: "center" }}>{message}</p>

      <div className="auth-toggle">
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={toggleMode}>
          {isRegister ? "Login here" : "Register here"}
        </button>
      </div>
    </div>
  );
}
