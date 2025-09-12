import React, { useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import App1 from "./App1";

// Simple Page Components
const About = () => (
  <div className="container py-5 text-center">
    <h2 className="fw-bold">About Us</h2>
    <p className="text-muted">
      HydroTrim is your hydration and wellness companion.
    </p>
  </div>
);

const Features = () => (
  <div className="container py-5 text-center">
    <h2 className="fw-bold">Features</h2>
    <p className="text-muted">
      Track your water intake, get reminders, and monitor your health progress easily.
    </p>
  </div>
);

const Contact = () => (
  <div className="container py-5 text-center">
    <h2 className="fw-bold">Contact Us</h2>
    <p className="text-muted">📞 +91 9876543210</p>
    <p className="text-muted">📧 support@hydrotrim.com</p>
  </div>
);

export default function App() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Reusable Navbar with active link styling
  const Navbar = () => (
    <nav className="d-flex justify-content-between align-items-center px-5 py-3 bg-white shadow-sm sticky-top">
      <h3 className="fw-bold m-0 text-primary">💠 HydroTrim</h3>
      <ul className="nav d-none d-md-flex">
        <li className="nav-item mx-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link fw-semibold ${
                isActive ? "text-primary border-bottom border-2 border-primary" : "text-dark"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item mx-3">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link fw-semibold ${
                isActive ? "text-primary border-bottom border-2 border-primary" : "text-dark"
              }`
            }
          >
            About Us
          </NavLink>
        </li>
        <li className="nav-item mx-3">
          <NavLink
            to="/features"
            className={({ isActive }) =>
              `nav-link fw-semibold ${
                isActive ? "text-primary border-bottom border-2 border-primary" : "text-dark"
              }`
            }
          >
            Features
          </NavLink>
        </li>
        <li className="nav-item mx-3">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link fw-semibold ${
                isActive ? "text-primary border-bottom border-2 border-primary" : "text-dark"
              }`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="d-flex gap-2">
        <button
          className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow"
          onClick={() => navigate("/signup")}
        >
          Register as User
        </button>
        <button
          className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold shadow"
          onClick={() => navigate("/admin/signup")}
        >
          Register as Admin
        </button>
      </div>
    </nav>
  );

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <section
              className="vh-100 d-flex flex-column"
              style={{
                background: "linear-gradient(135deg, #f4f6ff 0%, #eef1ff 100%)",
                color: "#333",
              }}
            >
              <div className="container flex-grow-1 d-flex align-items-center">
                <div className="row align-items-center w-100">
                  {/* Left Section */}
                  <motion.div
                    className="col-lg-6 mb-5 mb-lg-0"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <span className="badge bg-primary px-3 py-2 mb-3 fs-6">
                      We Provide
                    </span>
                    <h1 className="fw-bold display-5 mb-3">
                      The Best Hydration & Wellness Services
                    </h1>
                    <p className="lead text-muted mb-4">
                      Stay hydrated. Stay healthy. HydroTrim keeps track of your
                      water intake, hydration levels, and wellness progress.
                    </p>

                    {/* Search Bar */}
                    <div className="d-flex bg-white shadow rounded-pill overflow-hidden p-2 w-75">
                      <input
                        type="text"
                        placeholder="What do you want to track?"
                        className="form-control border-0 shadow-none"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <button
                        className="btn btn-primary rounded-pill px-4 fw-bold"
                        onClick={handleSearch}
                      >
                        Search
                      </button>
                    </div>
                  </motion.div>

                  {/* Right Section */}
                  <motion.div
                    className="col-lg-6 d-flex justify-content-center"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <div
                      className="rounded-4 bg-white shadow-lg p-3"
                      style={{ width: "380px", height: "400px" }}
                    >
                      <img
                        src="https://st.depositphotos.com/2702761/3304/i/950/depositphotos_33044395-stock-photo-doctor-smiling.jpg"
                        alt="Doctor / Wellness"
                        className="img-fluid rounded-3"
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        }
      />

      {/* Other Pages */}
      <Route path="/about" element={<><Navbar /><About /></>} />
      <Route path="/features" element={<><Navbar /><Features /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /></>} />

      {/* All other routes handled by App1 */}
      <Route path="/*" element={<App1 />} />
    </Routes>
  );
}
