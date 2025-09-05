import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", formData);
      if (res.status === 201) {
        alert("✅ Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-bg">
      <div className="overlay"></div>

      {/* ✅ Wrap both sections inside signup-container */}
      <div className="signup-container">
        {/* Quote Section */}
        <div className="quote-section text-white">
          <h1 className="display-5 fw-bold">
            💧 "Pure water is the world’s first and foremost medicine."
          </h1>
          <p className="lead mt-3">– Slovakian Proverb</p>
        </div>

        {/* Signup Form */}
        <div className="form-section">
          <div className="card signup-card shadow-lg p-4">
            <h2 className="text-center mb-4">👋 Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign Up
              </button>
              <p className="text-center text-muted">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
