import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/users/${username}`);
      if (response.status === 200) {
        navigate(`/${username}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Нямаш акаунт? <Link to="/register">Регистрирай се</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
