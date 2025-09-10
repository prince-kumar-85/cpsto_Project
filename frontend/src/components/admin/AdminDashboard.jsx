import React from "react";
import "./Dashboard.css"; 

export default function AdminDashboard() {
  return (
    <div className="animated-bg" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>⚡ Admin Panel</h2>
        <a href="/admin/dashboard">📊 Dashboard</a>
        <a href="/admin/reports">📑 Reports</a>
        <a href="/admin/sos">🚨 SOS Alerts</a>
        <a href="/admin/users">👥 Users</a>
        <a href="/admin/settings">⚙️ Settings</a>
        <button className="logout-btn">🔒 Logout</button>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>
            Welcome <strong>Admin 🚀</strong> — manage everything at a glance.
          </p>
        </div>

        {/* Cards */}
        <div className="cards">
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
        <div className="activity">
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
