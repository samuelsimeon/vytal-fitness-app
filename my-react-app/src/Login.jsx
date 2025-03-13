// src/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure styling is in a separate file

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Update form data on change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("http://localhost:3009/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If you want the server to store session cookies, include credentials:
         credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        // If express-validator or other server errors exist
        if (data.errors && data.errors.length > 0) {
          // Combine all error messages into a single string
          const combinedErrors = data.errors.map((err) => err.msg).join(", ");
          setMessage(combinedErrors);
        } else {
          setMessage(data.error || "Login failed");
        }
      } else {
        // Successful login
        if (setUser) setUser(data.user);
        setMessage(data.message);
        navigate("/");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Login Form */}
        <div className="login-form">
          <h2>Welcome Back</h2>
          <p>Login to continue your fitness journey</p>

          {/* noValidate prevents built-in HTML5 validation pop-ups */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-btn2">
              Login
            </button>
          </form>

          {/* Display any messages */}
          {message && <p className="message">{message}</p>}

          {/* Social Login */}
          <div className="social-login">
            <p>Or login with</p>
            <button className="google-login">
              <img src="/icons/google2.png" alt="Google" />
            </button>
          </div>

          {/* Forgot Password & Register Links */}
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
          <p className="register-text">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>

        {/* Right Side: Branding Image */}
        <div className="login-branding">
          <div className="logo-branding-content">
            <Link to="/">
              <img
                src="/images/vytallogoorange.png"
                alt="Brand Logo"
                className="home-link"
              />
            </Link>
            <h3>Track Improve Dominate</h3>
            <p>Log in to access your workouts, meals, and progress in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
