
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  // States
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("en");

  // 🎨 Dark mode toggle
  const handleToggleDarkMode = () => {
    const newMode = !(localStorage.getItem("darkMode") === "true");
    localStorage.setItem("darkMode", newMode);

    if (newMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }

    setDarkMode(newMode);
    alert(`🌗 Dark mode ${newMode ? "enabled" : "disabled"} globally`);
  };

  // 🔔 Notification Handler
  const handleNotificationChange = (type) => {
    if (type === "email") {
      const newValue = !emailNotifications;
      setEmailNotifications(newValue);
      localStorage.setItem("emailNotifications", newValue);
      alert(`📧 Email notifications ${newValue ? "enabled" : "disabled"}`);
    } else if (type === "sms") {
      const newValue = !smsNotifications;
      setSmsNotifications(newValue);
      localStorage.setItem("smsNotifications", newValue);
      alert(`📱 SMS notifications ${newValue ? "enabled" : "disabled"}`);
    }
  };

  // 🌍 Language handler
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("language", newLang); // ✅ save to localStorage
    alert(`🌍 Language set to ${newLang === "en" ? "English" : "हिन्दी"}`);
  };

  // 🎨 Load preferences on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailNotifications") === "true";
    const storedSms = localStorage.getItem("smsNotifications") === "true";
    const storedLang = localStorage.getItem("language") || "en";

    setEmailNotifications(storedEmail);
    setSmsNotifications(storedSms);
    setLanguage(storedLang);

    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    }
  }, [darkMode]);

  // 🚀 Watch for changes (simulate backend call)
  useEffect(() => {
    if (emailNotifications) {
      console.log("✅ Email notifications enabled");
    }
    if (smsNotifications) {
      console.log("✅ SMS notifications enabled");
    }
  }, [emailNotifications, smsNotifications]);

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      {/* Top Logo Section */}
      <div className="d-flex align-items-center p-3 border-bottom mb-4">
        <div className="fw-bold fs-3 text-primary">💠 HydroTrim</div>
      </div>

      <div className="container py-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>⚙️ Settings</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/dashboard")}
          >
            🏠 Back to Dashboard
          </button>
        </div>

        {/* Global Appearance Card */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🎨 Appearance (Global)</h5>
            <p className="card-text">
              Change the look and feel of your dashboard for all pages.
            </p>
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
              onClick={handleToggleDarkMode}
            >
              {darkMode ? "🌞 Disable Dark Mode" : "🌙 Enable Dark Mode"}
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🔔 Notification Preferences</h5>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={emailNotifications}
                onChange={() => handleNotificationChange("email")}
                id="emailNotifications"
              />
              <label className="form-check-label" htmlFor="emailNotifications">
                📧 Email Notifications
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={smsNotifications}
                onChange={() => handleNotificationChange("sms")}
                id="smsNotifications"
              />
              <label className="form-check-label" htmlFor="smsNotifications">
                📱 SMS Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">🌍 Language & Region</h5>
            <p className="card-text mb-2">Select your preferred language:</p>
            <select
              className="form-select w-50"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
