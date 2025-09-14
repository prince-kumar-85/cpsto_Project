import React, { useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import App1 from "./App1";
import './App.css';


// Simple Page Components
const About = () => (
  <div className="container py-5 text-center">
    {/* <h2 className="fw-bold">About Us</h2> */}
    <p className="text-muted">
 <div className="about-us-wrapper">
      <div className="main-header">
        <h1>About HydroTrim</h1>
        <p className="subtitle">
          An innovative, affordable digital platform designed to fight
          water-borne diseases.
        </p>
      </div>

      <div className="about-section">
        <p>
          <strong>HydroTrim</strong> is an innovative, affordable digital platform designed to fight
          water-borne diseases in rural and semi-urban communities. Our mission is to equip health
          workers with simple yet powerful mobile and web applications, timely detection, and immediate intervention.
        </p>
        <p>
          With the support of smart analytics, HydroTrim not only tracks and flags potential outbreaks,
          but also delivers instant alerts and intuitive hotspot visualizations, empowering
          communities and authorities to respond faster and smarter.
        </p>
        <p>
          Our ultimate goal is clear: reduce the spread of water-borne diseases, save lives,
          and build resilient, healthier communities through real-time, technology-driven health monitoring.
        </p>
      </div>

      <div className="about-section">
        <h2>Why HydroTrim?</h2>
        <p>
          Water-borne diseases remain one of the most persistent threats to vulnerable populations.
          Traditional systems often fail due to delayed reporting, poor connectivity, and limited resources.
        </p>
        <p>
          HydroTrim bridges this gap by combining <strong>technology, data, and local knowledge</strong>
          into one accessible platform. By making disease tracking more efficient, we turn prevention
          into a powerful tool for healthier living.
        </p>
        <p>
          Because we believe: <em>prevention is better than cure, and informed communities are stronger communities.</em>
        </p>
      </div>

      <div className="about-section">
        <h2>Our Approach</h2>
        <p>
          HydroTrim places communities at the heart of the solution. Health workers and volunteers
          can quickly log cases, monitor trends, and share insights, enabling faster interventions
          and coordinated action.
        </p>
        <p>
          Automated analytics detect hidden patterns in data, flagging potential outbreaks before
          they escalate, while instant notifications ensure communities and authorities are kept
          in the loop at all times.
        </p>
        <p>
          {/* Built for low-resource settings, HydroTrim is lightweight, works on low-end devices,
          and remains functional even without internet connectivity. */}
        </p>
      </div>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          To create a future where water-borne diseases are no longer a threat to vulnerable communities.
          HydroTrim envisions healthier populations, stronger health systems, and resilient communities
          empowered by technology, data, and collaboration.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Impact</h2>
        <p>
          HydroTrim is already transforming community health by enabling rapid case reporting,
          delivering actionable insights, empowering local health workers, and strengthening the
          entire disease surveillance ecosystem. The result: quicker responses, fewer outbreaks,
          and healthier lives.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Team</h2>
        <p>
          Our dedicated team is made up of public health professionals, software developers,
          and community engagement specialists. Together with local health authorities, we
          design practical, scalable, and impactful solutions that bring real change.
        </p>
      </div>

      <div className="about-section">
        <h2>Partnerships & Support</h2>
        <p>
          HydroTrim collaborates with NGOs, government bodies, and healthcare organizations
          to expand its reach and maximize impact. Through these partnerships, health workers
          gain access to resources, training, and real-time support when it matters most.
        </p>
      </div>

      <div className="about-section">
        <h2>Future Plans</h2>
        <p>
          Looking forward, HydroTrim aims to expand its footprint to more rural and semi-urban
          communities, introduce advanced <strong>predictive outbreak modeling</strong>, support
          multiple languages for inclusivity, and integrate a broader range of community health
          services into the platform.
        </p>
      </div>
    </div>

      {/* ...other about-section blocks... */}
    {/* </div> */}

    </p>
  </div>
);

const Features = () => (
  <div className="container py-5 text-center">
    {/* <h2 className="fw-bold">Features</h2> */}
    <p className="text-muted">
          <div className="features-container">
      {/* <h1>HydroTrim Features</h1> */}

      <div className="feature-section">
        <h1>HydroTrim Features</h1>

      <div className="feature-item">
        <h2>🌍 Community Awareness</h2>
        <p>Receive insights on water-borne disease risks and contribute to local health awareness campaigns.</p>
      </div>

      <div className="feature-item">
        <h2>📈 Hotspot Visualization</h2>
        <p>Visual dashboards show potential disease hotspots for faster and smarter intervention.</p>
      </div>

      <div className="feature-item">
        <h2>🚨 SOS System</h2>
        <p>Quickly alert local health authorities in case of sudden outbreaks or emergencies.</p>
      </div>

      {/* <div className="feature-item">
        <h2>💧 Water Intake Tracking</h2>
        <p>Log daily water consumption and monitor hydration levels.</p>
      </div> */}
{/* 
      <div className="feature-item">
        <h2>⏰ Reminders & Alerts</h2>
        <p>Get timely notifications to stay hydrated and maintain wellness.</p>
      </div> */}

      <div className="feature-item">
        <h2>📊 Health Monitoring</h2>
        <p>Track wellness progress, identify patterns, and improve overall community health.</p>
      </div>

      <div className="feature-item">
        <h2>📝 Case Reporting</h2>
        <p>Health workers can report water-borne disease cases via website.</p>
      </div>

      {/* <div className="feature-item">
        <h2>🌐 Multilingual Support</h2>
        <p>Supports multiple languages to reach diverse rural and semi-urban communities.</p>
      </div> */}
    </div>
    </div>
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
