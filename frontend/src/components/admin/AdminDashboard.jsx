import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  // **Apply dark mode from localStorage on mount**
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, []);

  return (
    <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <div className="p-3 text-center fw-bold fs-3 text-primary">
          💠 HydroTrim
        </div>
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">⚡ Admin Panel</h4>
          <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
            📊 Dashboard
          </Link>
          <div className="mb-2">
            <button
              className="btn btn-dark w-100 text-start"
              onClick={() => setShowReports(!showReports)}
            >
              📑 Reports ▾
            </button>
            {showReports && (
              <div className="ms-3 mt-2 d-flex flex-column">
                <button
                  className="btn btn-outline-light text-start mb-1"
                  onClick={() => setSelectedDisease("dengue")}
                >
                  Dengue
                </button>
                <button
                  className="btn btn-outline-light text-start mb-1"
                  onClick={() => setSelectedDisease("typhoid")}
                >
                  Typhoid
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={() => setSelectedDisease("cholera")}
                >
                  Cholera
                </button>
              </div>
            )}
          </div>
          <Link to="/admin/sos" className="btn btn-dark text-start mb-2">🚨 SOS Alerts</Link>
          <Link to="/admin/users" className="btn btn-dark text-start mb-2">👥 Users</Link>
          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">⚙️ Settings</Link>
          <Link to="/admin/update" className="btn btn-dark text-start mb-2">✏️ Update Information</Link>
        </aside>
      </div>

      {/* Main Dashboard */}
      <main className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>Admin Dashboard</h2>
            <p>
              Welcome <strong>Admin 🚀</strong> — manage everything at a glance.
            </p>
          </div>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/admin/profile")}
            >
              👤 Profile
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              🔒 Logout
            </button>
          </div>
        </div>

        {/* Disease Data */}
        {selectedDisease && (
          <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
            <div className="card-body">
              <h4 className="fw-bold text-capitalize">
                📌 {selectedDisease} Data
              </h4>
              <p>
                Showing reports and statistics related to <strong>{selectedDisease}</strong>.
              </p>
              <ul>
                <li>Cases reported: 25</li>
                <li>Active cases: 10</li>
                <li>Recovered: 12</li>
                <li>Deaths: 3</li>
              </ul>
            </div>
          </div>
        )}

        {/* Cards Section */}
        <div className="row g-4 mb-4">
          {["Total Users", "Active Reports", "SOS Alerts"].map((title, i) => (
            <div className="col-md-4" key={i}>
              <div className={`card text-center shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                  <h5 className="text-muted">{title}</h5>
                  <p className="fs-3 fw-bold">{i === 0 ? 150 : i === 1 ? 12 : 3}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className={`card shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
          <div className="card-body">
            <h5 className="mb-3">📌 Recent Activity</h5>
            <ul className="list-unstyled">
              <li>✅ 5 new users registered</li>
              <li>🚨 2 new SOS alerts triggered</li>
              <li>📊 4 reports submitted today</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
