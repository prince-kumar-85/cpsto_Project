import React, { useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import App1 from "./App1";

export default function App() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Handle Search
  const handleSearch = () => {
    if (query.trim() !== "") {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <section
            className="vh-100 d-flex flex-column"
            style={{
              background: "linear-gradient(135deg, #f4f6ff 0%, #eef1ff 100%)",
              color: "#333",
            }}
          >
            {/* Navbar */}
            <nav className="d-flex justify-content-between align-items-center px-5 py-3 bg-white shadow-sm">
              <h3 className="fw-bold m-0 text-primary">💠 HydroTrim</h3>
              <ul className="nav d-none d-md-flex">
                <li className="nav-item mx-3">
                  <a href="#" className="nav-link text-dark fw-semibold">
                    Home
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a href="#" className="nav-link text-dark fw-semibold">
                    About Us
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a href="#" className="nav-link text-dark fw-semibold">
                    Features
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a href="#" className="nav-link text-dark fw-semibold">
                    Contact
                  </a>
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

            {/* Hero Section */}
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

                  {/* Search Bar / CTA */}
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
        }
      />

      {/* All other routes handled by App1 */}
      <Route path="/*" element={<App1 />} />
    </Routes>
  );
}
