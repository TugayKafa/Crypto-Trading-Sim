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
      const userResponse = await axios.get(`http://localhost:8080/users/${username}`);
      if (userResponse.status === 200) {
        const userId = userResponse.data.userId;
        
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        const accountResponse = await axios.get(`http://localhost:8080/accounts/user/${userId}`);
        if (accountResponse.status === 200) {
          const balance = accountResponse.data.balance;
          const accountId = accountResponse.data.accountId;

          localStorage.setItem("balance", balance);
          localStorage.setItem("accountId", accountId);

          navigate(`/${username}`);
        }
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
          Start trading now? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
