import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found. Please login again.");
          navigate("/admin/login");
          return;
        }
        const res = await axios.get("http://localhost:4000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) {
    return (
      <div className={`d-flex justify-content-center align-items-center min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
        <p className="text-muted fs-5">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      {/* Top Logo Section */}
      <div className="d-flex align-items-center p-3 border-bottom mb-4">
        <div className="fw-bold fs-3 text-primary">💠 HydroTrim</div>
      </div>

      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>👤 Admin Profile</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/dashboard")}
          >
            🏠 Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Profile Information</h5>
            <p className="card-text">
              <strong>Email:</strong> {profile.email}
            </p>
            <p className="card-text">
              <strong>Head Name:</strong> {profile.headName}
            </p>
            <p className="card-text">
              <strong>Hospital Name:</strong> {profile.hospitalName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
