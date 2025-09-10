import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

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
      sessionStorage.removeItem("token");
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  return (
    <div className="animated-bg" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>⚡ Admin Panel</h2>
        <a href="/admin/dashboard">📊 Dashboard</a>

        {/* Reports Dropdown */}
        <div>
          <button
            className="dropdown-btn"
            onClick={() => setShowReports(!showReports)}
          >
            📑 Reports ▾
          </button>
          {showReports && (
            <div className="dropdown-container">
              <button
                className="dropdown-item"
                onClick={() => setSelectedDisease("dengue")}
              >
                Dengue
              </button>
              <button
                className="dropdown-item"
                onClick={() => setSelectedDisease("typhoid")}
              >
                Typhoid
              </button>
              <button
                className="dropdown-item"
                onClick={() => setSelectedDisease("cholera")}
              >
                Cholera
              </button>
            </div>
          )}
        </div>

        <a href="/admin/sos">🚨 SOS Alerts</a>
        <a href="/admin/users">👥 Users</a>
        <a href="/admin/settings">⚙️ Settings</a>
        <a href="/admin/update">✏️ Update Information</a>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-container">
        {/* 🔹 Top Header with Profile + Logout */}
        <div className="d-flex justify-content-end mb-4">
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

        {/* Header Section */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>
            Welcome <strong>Admin 🚀</strong> — manage everything at a glance.
          </p>
        </div>

        {/* Disease Data Section */}
        {selectedDisease && (
          <div className="card mt-3 p-3 shadow-sm">
            <h4 className="fw-bold text-capitalize">📌 {selectedDisease} Data</h4>
            <p>
              Showing reports and statistics related to{" "}
              <strong>{selectedDisease}</strong>.
            </p>
            {/* TODO: Replace with API fetch */}
            <ul>
              <li>Cases reported: 25</li>
              <li>Active cases: 10</li>
              <li>Recovered: 12</li>
              <li>Deaths: 3</li>
            </ul>
          </div>
        )}

        {/* Cards Section */}
        <div className="cards mt-4">
          <div className="card">
            <h2>Total Users</h2>
            <p>150</p>
          </div>
          <div className="card">
            <h2>Active Reports</h2>
            <p style={{ color: "red" }}>12</p>
          </div>
          <div className="card">
            <h2>SOS Alerts</h2>
            <p style={{ color: "blue" }}>3</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity mt-4">
          <h2>📌 Recent Activity</h2>
          <ul>
            <li>✅ 5 new users registered</li>
            <li>🚨 2 new SOS alerts triggered</li>
            <li>📊 4 reports submitted today</li>
          </ul>
        </div>
      </main>
    </div>
  );
}





































// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css"; // Import CSS file

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:4000/api/auth/logout", // 🔹 adjust to match your backend route
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Clear token after API logout
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");

//       navigate("/admin/login"); // or "/login" depending on your routes
//     } catch (err) {
//       console.error("Logout error:", err);

//       // Clear token anyway and redirect
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");

//       navigate("/admin/login"); // fallback redirect
//     }
//   };

//   return (
//     <div className="animated-bg" style={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>⚡ Admin Panel</h2>
//         <a href="/admin/dashboard">📊 Dashboard</a>
//         <a href="/admin/reports">📑 Reports</a>
//         <a href="/admin/sos">🚨 SOS Alerts</a>
//         <a href="/admin/users">👥 Users</a>
//         <a href="/admin/settings">⚙️ Settings</a>
//         <button className="logout-btn" onClick={handleLogout}>
//           🔒 Logout
//         </button>
//       </aside>

//       {/* Main Dashboard */}
//       <main className="dashboard-container">
//         {/* Header */}
//         <div className="dashboard-header">
//           <h1>Admin Dashboard</h1>
//           <p>
//             Welcome <strong>Admin 🚀</strong> — manage everything at a glance.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="cards">
//           <div className="card">
//             <h2>Total Users</h2>
//             <p>150</p>
//           </div>
//           <div className="card">
//             <h2>Active Reports</h2>
//             <p style={{ color: "red" }}>12</p>
//           </div>
//           <div className="card">
//             <h2>SOS Alerts</h2>
//             <p style={{ color: "blue" }}>3</p>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="activity">
//           <h2>📌 Recent Activity</h2>
//           <ul>
//             <li>✅ 5 new users registered</li>
//             <li>🚨 2 new SOS alerts triggered</li>
//             <li>📊 4 reports submitted today</li>
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// }
