
import React, { useState } from "react";
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

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Section */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        {/* Project Name (above the dark sidebar) */}
        <div className="p-3 text-center fw-bold fs-3 text-primary">
          💠 HydroTrim
        </div>

        {/* Actual Sidebar starts here */}
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">⚡ Admin Panel</h4>

          <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
            📊 Dashboard
          </Link>

          {/* Reports Dropdown */}
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

          <Link to="/admin/sos" className="btn btn-dark text-start mb-2">
            🚨 SOS Alerts
          </Link>
          <Link to="/admin/users" className="btn btn-dark text-start mb-2">
            👥 Users
          </Link>
          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">
            ⚙️ Settings
          </Link>
          <Link to="/admin/update" className="btn btn-dark text-start mb-2">
            ✏️ Update Information
          </Link>
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

        {/* Disease Data Section */}
        {selectedDisease && (
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="fw-bold text-capitalize">
                📌 {selectedDisease} Data
              </h4>
              <p>
                Showing reports and statistics related to{" "}
                <strong>{selectedDisease}</strong>.
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
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="text-muted">Total Users</h5>
                <p className="fs-3 fw-bold">150</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="text-muted">Active Reports</h5>
                <p className="fs-3 fw-bold text-danger">12</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="text-muted">SOS Alerts</h5>
                <p className="fs-3 fw-bold text-primary">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card shadow-sm">
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






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [showReports, setShowReports] = useState(false);
//   const [selectedDisease, setSelectedDisease] = useState("");

//    const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:4000/api/auth/logout", 
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//       localStorage.removeItem("token");
//       navigate("/");
//     }
//   };

//   return (
//     <div className="animated-bg" style={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2>⚡ Admin Panel</h2>
//         {/* <a href="/admin/dashboard">📊 Dashboard</a> */}
//         <Link to="/admin/dashboard">📊 Dashboard</Link>

//         {/* Reports Dropdown */}
//         <div>
//           <button
//             className="dropdown-btn"
//             onClick={() => setShowReports(!showReports)}
//           >
//             📑 Reports ▾
//           </button>
//           {showReports && (
//             <div className="dropdown-container">
//               <button
//                 className="dropdown-item"
//                 onClick={() => setSelectedDisease("dengue")}
//               >
//                 Dengue
//               </button>
//               <button
//                 className="dropdown-item"
//                 onClick={() => setSelectedDisease("typhoid")}
//               >
//                 Typhoid
//               </button>
//               <button
//                 className="dropdown-item"
//                 onClick={() => setSelectedDisease("cholera")}
//               >
//                 Cholera
//               </button>
//             </div>
//           )}
//         </div>

//         <a href="/admin/sos">🚨 SOS Alerts</a>
//         <a href="/admin/users">👥 Users</a>
//         <a href="/admin/settings">⚙️ Settings</a>
//         <a href="/admin/update">✏️ Update Information</a>
//       </aside>

//       {/* Main Dashboard */}
//       <main className="dashboard-container">
//         {/* 🔹 Top Header with Profile + Logout */}
//         <div className="d-flex justify-content-end mb-4">
//           <button
//             className="btn btn-outline-primary me-2"
//             onClick={() => navigate("/admin/profile")}
//           >
//             👤 Profile
//           </button>
//           <button className="btn btn-outline-danger" onClick={handleLogout}>
//             🔒 Logout
//           </button>
//         </div>

//         {/* Header Section */}
//         <div className="dashboard-header">
//           <h1>Admin Dashboard</h1>
//           <p>
//             Welcome <strong>Admin 🚀</strong> — manage everything at a glance.
//           </p>
//         </div>

//         {/* Disease Data Section */}
//         {selectedDisease && (
//           <div className="card mt-3 p-3 shadow-sm">
//             <h4 className="fw-bold text-capitalize">📌 {selectedDisease} Data</h4>
//             <p>
//               Showing reports and statistics related to{" "}
//               <strong>{selectedDisease}</strong>.
//             </p>
//             {/* TODO: Replace with API fetch */}
//             <ul>
//               <li>Cases reported: 25</li>
//               <li>Active cases: 10</li>
//               <li>Recovered: 12</li>
//               <li>Deaths: 3</li>
//             </ul>
//           </div>
//         )}

//         {/* Cards Section */}
//         <div className="cards mt-4">
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
//         <div className="activity mt-4">
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

