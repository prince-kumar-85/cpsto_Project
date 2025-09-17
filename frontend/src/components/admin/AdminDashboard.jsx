
import React, { useState, useEffect } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("");

  // ✅ Notification states
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // ✅ Language state
  const [language, setLanguage] = useState("en");

  // 🌐 Translation Map
  const translations = {
    en: {
      adminPanel: "⚡ Admin Panel",
      dashboard: "Dashboard",
      reports: "Reports",
      sos: "SOS Alerts",
      users: "Users",
      settings: "Settings",
      update: "Update Information",
      profile: "Profile",
      logout: "Logout",
      welcome: "Welcome",
      diseaseData: "Data",
      totalUsers: "Total Users",
      activeReports: "Active Reports",
      recentActivity: "Recent Activity",
      notificationStatus: "Notification Status",
      email: "Email Notifications",
      sms: "SMS Notifications",
      dengue: "Dengue",
      typhoid: "Typhoid",
      cholera: "Cholera",
      casesReported: "Cases reported",
      activeCases: "Active cases",
      recovered: "Recovered",
      deaths: "Deaths",
      newUsers: "new users registered",
      newAlerts: "new SOS alerts triggered",
      newReports: "reports submitted today",
      enabled: "Enabled ✅",
      disabled: "Disabled ❌",
      showingReports: "Showing reports and statistics related to",
    },
    hi: {
      adminPanel: "⚡ व्यवस्थापक पैनल",
      dashboard: "डैशबोर्ड",
      reports: "रिपोर्ट्स",
      sos: "आपातकालीन अलर्ट",
      users: "उपयोगकर्ता",
      settings: "सेटिंग्स",
      update: "जानकारी अपडेट करें",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      welcome: "स्वागत है",
      diseaseData: "डेटा",
      totalUsers: "कुल उपयोगकर्ता",
      activeReports: "सक्रिय रिपोर्ट",
      recentActivity: "हाल की गतिविधि",
      notificationStatus: "सूचना स्थिति",
      email: "ईमेल सूचनाएं",
      sms: "एसएमएस सूचनाएं",
      dengue: "डेंगू",
      typhoid: "टाइफॉयड",
      cholera: "हैजा",
      casesReported: "कुल मामले",
      activeCases: "सक्रिय मामले",
      recovered: "ठीक हुए",
      deaths: "मृत्यु",
      newUsers: "नए उपयोगकर्ता पंजीकृत हुए",
      newAlerts: "नए SOS अलर्ट ट्रिगर किए गए",
      newReports: "रिपोर्टें आज जमा की गईं",
      enabled: "सक्रिय ✅",
      disabled: "निष्क्रिय ❌",
      showingReports: "संबंधित रिपोर्ट और आँकड़े दिखाए जा रहे हैं",
    },
  };

  // ✅ Load preferences on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailNotifications") === "true";
    const storedSms = localStorage.getItem("smsNotifications") === "true";
    setEmailNotifications(storedEmail);
    setSmsNotifications(storedSms);

    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }

    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);

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
    <div
      className={`d-flex min-vh-100 ${
        localStorage.getItem("darkMode") === "true"
          ? "bg-dark text-light"
          : "bg-light"
      }`}
    >
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <div className="p-3 text-center fw-bold fs-3 text-primary">
          💠 HydroTrim
        </div>
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">{translations[language].adminPanel}</h4>
          <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
            📊 {translations[language].dashboard}
          </Link>
          <div className="mb-2">
            <button
              className="btn btn-dark w-100 text-start"
              onClick={() => setShowReports(!showReports)}
            >
              📑 {translations[language].reports} ▾
            </button>
            {showReports && (
              <div className="ms-3 mt-2 d-flex flex-column">
                <button
                  className="btn btn-outline-light text-start mb-1"
                  onClick={() => setSelectedDisease("dengue")}
                >
                  {translations[language].dengue}
                </button>
                <button
                  className="btn btn-outline-light text-start mb-1"
                  onClick={() => setSelectedDisease("typhoid")}
                >
                  {translations[language].typhoid}
                </button>
                <button
                  className="btn btn-outline-light text-start"
                  onClick={() => setSelectedDisease("cholera")}
                >
                  {translations[language].cholera}
                </button>
              </div>
            )}
          </div>
          <Link to="/admin/sos" className="btn btn-dark text-start mb-2">
            🚨 {translations[language].sos}
          </Link>
          <Link to="/admin/users" className="btn btn-dark text-start mb-2">
            👥 {translations[language].users}
          </Link>
          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">
            ⚙️ {translations[language].settings}
          </Link>
          <Link to="/admin/update" className="btn btn-dark text-start mb-2">
            ✏️ {translations[language].update}
          </Link>
        </aside>
      </div>

      {/* Main Dashboard */}
      <main className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>{translations[language].dashboard}</h2>
            <p>
              {translations[language].welcome} <strong>Admin 🚀</strong>
            </p>
          </div>
          <div>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/admin/profile")}
            >
              👤 {translations[language].profile}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              🔒 {translations[language].logout}
            </button>
          </div>
        </div>

        {/* Disease Data */}
        {selectedDisease && (
          <div
            className={`card shadow-sm mb-4 ${
              localStorage.getItem("darkMode") === "true"
                ? "bg-secondary text-light"
                : ""
            }`}
          >
            <div className="card-body">
              <h4 className="fw-bold text-capitalize">
                📌 {translations[language][selectedDisease]}{" "}
                {translations[language].diseaseData}
              </h4>
              <p>
                {translations[language].showingReports}{" "}
                <strong>{translations[language][selectedDisease]}</strong>.
              </p>
              <ul>
                <li>{translations[language].casesReported}: 25</li>
                <li>{translations[language].activeCases}: 10</li>
                <li>{translations[language].recovered}: 12</li>
                <li>{translations[language].deaths}: 3</li>
              </ul>
            </div>
          </div>
        )}

        {/* Cards Section */}
        <div className="row g-4 mb-4">
          {[translations[language].totalUsers, translations[language].activeReports, translations[language].sos].map((title, i) => (
            <div className="col-md-4" key={i}>
              <div
                className={`card text-center shadow-sm ${
                  localStorage.getItem("darkMode") === "true"
                    ? "bg-secondary text-light"
                    : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="text-muted">{title}</h5>
                  <p className="fs-3 fw-bold">
                    {i === 0 ? 150 : i === 1 ? 12 : 3}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div
          className={`card shadow-sm ${
            localStorage.getItem("darkMode") === "true"
              ? "bg-secondary text-light"
              : ""
          }`}
        >
          <div className="card-body">
            <h5 className="mb-3">📌 {translations[language].recentActivity}</h5>
            <ul className="list-unstyled">
              <li>✅ 5 {translations[language].newUsers}</li>
              <li>🚨 2 {translations[language].newAlerts}</li>
              <li>📊 4 {translations[language].newReports}</li>
            </ul>
          </div>
        </div>

        {/* 🔔 Notification Banner (bottom) */}
        <div className="alert alert-info shadow-sm mt-4">
          <h5 className="mb-2">🔔 {translations[language].notificationStatus}</h5>
          <ul className="mb-0">
            <li>
              📧 {translations[language].email}:{" "}
              <strong>
                {emailNotifications
                  ? translations[language].enabled
                  : translations[language].disabled}
              </strong>
            </li>
            <li>
              📱 {translations[language].sms}:{" "}
              <strong>
                {smsNotifications
                  ? translations[language].enabled
                  : translations[language].disabled}
              </strong>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
