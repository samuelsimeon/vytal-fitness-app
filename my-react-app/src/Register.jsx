// src/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css"; // Make sure to create this file

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3009/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If you want the server to store session cookies, include:
        // credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        // If express-validator errors exist, display them
        if (data.errors && data.errors.length > 0) {
          // Combine all error messages into one string
          const combinedErrors = data.errors.map((err) => err.msg).join(", ");
          setMessage(combinedErrors);
        } else {
          setMessage(data.error || "Registration failed");
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side: Registration Form */}
        <div className="register-form">
          <h2>Create an account</h2>
          <p>Let's get started by filling out the information below</p>

          {/* noValidate disables HTML5 validation */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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

            {/* Terms Checkbox */}
            <div className="terms">
              <input type="checkbox" />
              <label>
                I agree to the <Link to="/terms">Terms & Conditions</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="register-btn2">
              Register
            </button>
          </form>

          {message && <p>{message}</p>}

          {/* Social Register */}
          <div className="social-register">
            <p>Or register with</p>
            <button className="google-register">
              <img src="/icons/google2.png" alt="Google" />
            </button>
          </div>

          {/* Already have an account */}
          <p className="login-text">
            Already have an account? <Link to="/login">Login Now</Link>
          </p>
        </div>

        {/* Right Side: Branding Section */}
        <div className="register-branding">
          <div className="branding-content">
            <Link to="/">
              <img
                src="/images/vytallogoorange.png"
                alt="Brand Logo"
                className="home-link"
              />
            </Link>
            <h3>Join the Community</h3>
            <p>Connect, train, and grow with the best fitness platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
