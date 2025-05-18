import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/register", { username, email });
      alert("Registration successful! Please log in.");
      setUsername("");
      setEmail("");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
