// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [showReports, setShowReports] = useState(false);
//   const [selectedDisease, setSelectedDisease] = useState("");

//   // Disease data states
//   const [choleraData, setCholeraData] = useState([]);
//   const [typhoidData, setTyphoidData] = useState([]);
//   const [dengueData, setDengueData] = useState([]);

//   // Notification states
//   const [emailNotifications, setEmailNotifications] = useState(false);
//   const [smsNotifications, setSmsNotifications] = useState(false);

//   // Language state
//   const [language, setLanguage] = useState("en");

//   const translations = {
//     en: {
//       adminPanel: "⚡ Admin Panel",
//       dashboard: "Dashboard",
//       reports: "Reports",
//       sos: "SOS Alerts",
//       users: "Users",
//       settings: "Settings",
//       update: "Update Information",
//       profile: "Profile",
//       logout: "Logout",
//       welcome: "Welcome",
//       diseaseData: "Data",
//       totalUsers: "Total Users",
//       activeReports: "Active Reports",
//       recentActivity: "Recent Activity",
//       notificationStatus: "Notification Status",
//       email: "Email Notifications",
//       sms: "SMS Notifications",
//       dengue: "Dengue",
//       typhoid: "Typhoid",
//       cholera: "Cholera",
//       casesReported: "Cases reported",
//       activeCases: "Active cases",
//       recovered: "Recovered",
//       deaths: "Deaths",
//       newUsers: "new users registered",
//       newAlerts: "new SOS alerts triggered",
//       newReports: "reports submitted today",
//       enabled: "Enabled ✅",
//       disabled: "Disabled ❌",
//       showingReports: "Showing reports and statistics related to",
//     },
//     hi: {
//       adminPanel: "⚡ व्यवस्थापक पैनल",
//       dashboard: "डैशबोर्ड",
//       reports: "रिपोर्ट्स",
//       sos: "आपातकालीन अलर्ट",
//       users: "उपयोगकर्ता",
//       settings: "सेटिंग्स",
//       update: "जानकारी अपडेट करें",
//       profile: "प्रोफ़ाइल",
//       logout: "लॉगआउट",
//       welcome: "स्वागत है",
//       diseaseData: "डेटा",
//       totalUsers: "कुल उपयोगकर्ता",
//       activeReports: "सक्रिय रिपोर्ट",
//       recentActivity: "हाल की गतिविधि",
//       notificationStatus: "सूचना स्थिति",
//       email: "ईमेल सूचनाएं",
//       sms: "एसएमएस सूचनाएं",
//       dengue: "डेंगू",
//       typhoid: "टाइफॉयड",
//       cholera: "हैजा",
//       casesReported: "कुल मामले",
//       activeCases: "सक्रिय मामले",
//       recovered: "ठीक हुए",
//       deaths: "मृत्यु",
//       newUsers: "नए उपयोगकर्ता पंजीकृत हुए",
//       newAlerts: "नए SOS अलर्ट ट्रिगर किए गए",
//       newReports: "रिपोर्टें आज जमा की गईं",
//       enabled: "सक्रिय ✅",
//       disabled: "निष्क्रिय ❌",
//       showingReports: "संबंधित रिपोर्ट और आँकड़े दिखाए जा रहे हैं",
//     },
//   };

//   // Load preferences
//   useEffect(() => {
//     setEmailNotifications(localStorage.getItem("emailNotifications") === "true");
//     setSmsNotifications(localStorage.getItem("smsNotifications") === "true");
//     setLanguage(localStorage.getItem("language") || "en");

//     if (localStorage.getItem("darkMode") === "true") {
//       document.body.classList.add("bg-dark", "text-light");
//     } else {
//       document.body.classList.remove("bg-dark", "text-light");
//     }
//   }, []);

//   // Fetch disease data based on selection
//   useEffect(() => {
//     if (selectedDisease === "cholera") {
//       axios
//         .get("http://localhost:4000/api/cholera/all")
//         .then((res) => setCholeraData(res.data))
//         .catch((err) => console.error("Error fetching cholera data:", err));
//     } else if (selectedDisease === "typhoid") {
//       axios
//         .get("http://localhost:4000/api/typhoid")
//         .then((res) => setTyphoidData(res.data))
//         .catch((err) => console.error("Error fetching typhoid data:", err));
//     } else if (selectedDisease === "dengue") {
//       axios
//         .get("http://localhost:4000/api/dengue")
//         .then((res) => setDengueData(res.data))
//         .catch((err) => console.error("Error fetching dengue data:", err));
//     }
//   }, [selectedDisease]);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:4000/api/auth/logout",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       localStorage.removeItem("token");
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//       localStorage.removeItem("token");
//       navigate("/");
//     }
//   };

//   const renderTable = (data, title) => (
//     <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
//       <div className="card-body">
//         <h4 className="fw-bold">{title} Data</h4>
//         {data.length === 0 ? (
//           <p>No records found.</p>
//         ) : (
//           <table className="table table-bordered mt-3">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>State/UT</th>
//                 <th>2021</th>
//                 <th>2022</th>
//                 <th>2023</th>
//                 <th>2024</th>
//                 <th>2025 (Prov.)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row) => (
//                 <tr key={row._id}>
//                   <td>{row.s__no}</td>
//                   <td>{row.state_u_t_}</td>
//                   <td>{row._2021}</td>
//                   <td>{row._2022}</td>
//                   <td>{row._2023}</td>
//                   <td>{row._2024}</td>
//                   <td>{row._2025__prov__}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
//       {/* Sidebar */}
//       <div style={{ width: "250px" }} className="d-flex flex-column">
//         <div className="p-3 text-center fw-bold fs-3 text-primary">💠 HydroTrim</div>
//         <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
//           <h4 className="mb-4">{translations[language].adminPanel}</h4>
//           <Link to="/admin/dashboard" className="btn btn-dark text-start mb-2">
//             📊 {translations[language].dashboard}
//           </Link>

//           <div className="mb-2">
//             <button
//               className="btn btn-dark w-100 text-start"
//               onClick={() => setShowReports(!showReports)}
//             >
//               📑 {translations[language].reports} ▾
//             </button>
//             {showReports && (
//               <div className="ms-3 mt-2 d-flex flex-column">
//                 <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("dengue")}>
//                   {translations[language].dengue}
//                 </button>
//                 <button className="btn btn-outline-light text-start mb-1" onClick={() => setSelectedDisease("typhoid")}>
//                   {translations[language].typhoid}
//                 </button>
//                 <button className="btn btn-outline-light text-start" onClick={() => setSelectedDisease("cholera")}>
//                   {translations[language].cholera}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* <Link to="/admin/sos" className="btn btn-dark text-start mb-2">🚨 {translations[language].sos}</Link> */}
//           <Link to="/admin/settings" className="btn btn-dark text-start mb-2">⚙️ {translations[language].settings}</Link>
//           {/* <Link to="/admin/update" className="btn btn-dark text-start mb-2">✏️ {translations[language].update}</Link> */}
//         </aside>
//       </div>

//       {/* Main */}
//       <main className="flex-grow-1 p-4">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div>
//             <h2>{translations[language].dashboard}</h2>
//             <p>{translations[language].welcome} <strong>Admin 🚀</strong></p>
//           </div>
//           <div>
//             <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/profile")}>
//               👤 {translations[language].profile}
//             </button>
//             <button className="btn btn-outline-danger" onClick={handleLogout}>
//               🔒 {translations[language].logout}
//             </button>
//           </div>
//         </div>

//         {selectedDisease === "cholera" && renderTable(choleraData, "📌 Cholera")}
//         {selectedDisease === "typhoid" && renderTable(typhoidData, "🧫 Typhoid")}
//         {selectedDisease === "dengue" && renderTable(dengueData, "🦠 Dengue")}

//         {!selectedDisease && (
//           <>
//             <div className="row g-4 mb-4">
//               {[translations[language].totalUsers, translations[language].activeReports, translations[language].sos].map((title, i) => (
//                 <div className="col-md-4" key={i}>
//                   <div className={`card text-center shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
//                     <div className="card-body">
//                       <h5 className="text-muted">{title}</h5>
//                       <p className="fs-3 fw-bold">{i === 0 ? 150 : i === 1 ? 12 : 3}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// }



import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showReports, setShowReports] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("");
  const [activePage, setActivePage] = useState("dashboard"); // NEW STATE
  const [selectedReportState, setSelectedReportState] = useState("ALL");

  // Disease data states
  const [choleraData, setCholeraData] = useState([]);
  const [typhoidData, setTyphoidData] = useState([]);
  const [dengueData, setDengueData] = useState([]);

  // Language state
  const [language, setLanguage] = useState("en");

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

      // New pages
      speciality: "Speciality",
      about: "About Us",
      international: "International Parties",
      blogs: "Blogs",
      news: "News",
      contact: "Contact Us",
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

      // New pages
      speciality: "विशेषता",
      about: "हमारे बारे में",
      international: "अंतरराष्ट्रीय साझेदार",
      blogs: "ब्लॉग्स",
      news: "समाचार",
      contact: "संपर्क करें",
    },
  };

  // Load preferences
  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "en");

    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, []);

  // Persist activePage and restore on mount to keep the same view after refresh
  useEffect(() => {
    const stored = localStorage.getItem("adminActivePage");
    if (stored) {
      setActivePage(stored);
      if (stored === "report-dengue") setSelectedDisease("dengue");
      if (stored === "report-typhoid") setSelectedDisease("typhoid");
      if (stored === "report-cholera") setSelectedDisease("cholera");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminActivePage", activePage);
  }, [activePage]);

  // Fetch disease data
  useEffect(() => {
    if (selectedDisease === "cholera") {
      axios
        .get("http://localhost:4000/api/cholera/all")
        .then((res) => setCholeraData(res.data))
        .catch((err) => console.error("Error fetching cholera data:", err));
    } else if (selectedDisease === "typhoid") {
      axios
        .get("http://localhost:4000/api/typhoid")
        .then((res) => setTyphoidData(res.data))
        .catch((err) => console.error("Error fetching typhoid data:", err));
    } else if (selectedDisease === "dengue") {
      axios
        .get("http://localhost:4000/api/dengue")
        .then((res) => setDengueData(res.data))
        .catch((err) => console.error("Error fetching dengue data:", err));
    }
  }, [selectedDisease]);

  // Ensure all datasets are available when viewing reports (for cross-disease charts)
  useEffect(() => {
    if (showReports) {
      if (!choleraData.length) {
        axios
          .get("http://localhost:4000/api/cholera/all")
          .then((res) => setCholeraData(res.data))
          .catch((err) => console.error("Error fetching cholera data:", err));
      }
      if (!typhoidData.length) {
        axios
          .get("http://localhost:4000/api/typhoid")
          .then((res) => setTyphoidData(res.data))
          .catch((err) => console.error("Error fetching typhoid data:", err));
      }
      if (!dengueData.length) {
        axios
          .get("http://localhost:4000/api/dengue")
          .then((res) => setDengueData(res.data))
          .catch((err) => console.error("Error fetching dengue data:", err));
      }
    }
  }, [showReports, choleraData.length, typhoidData.length, dengueData.length]);

  // Fetch all datasets on mount to ensure dashboard charts have data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (!choleraData.length) {
          const res = await axios.get("http://localhost:4000/api/cholera/all");
          setCholeraData(res.data);
        }
        if (!typhoidData.length) {
          const res = await axios.get("http://localhost:4000/api/typhoid");
          setTyphoidData(res.data);
        }
        if (!dengueData.length) {
          const res = await axios.get("http://localhost:4000/api/dengue");
          setDengueData(res.data);
        }
      } catch (err) {
        console.error("Error preloading datasets:", err);
      }
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute aggregates for charts
  const yearKeys = useMemo(() => ["_2021", "_2022", "_2023", "_2024", "_2025__prov__"], []);
  const yearLabels = useMemo(() => ["2021", "2022", "2023", "2024", "2025 (Prov.)"], []);

  const sumByKey = (arr, key) => {
    return arr.reduce((acc, row) => acc + (Number(row?.[key]) || 0), 0);
  };

  const latestKey = yearKeys[yearKeys.length - 1];

  // Deprecated bar chart data (replaced by pie chart)

  const lineData = useMemo(() => (
    yearKeys.map((k, idx) => ({
      year: yearLabels[idx],
      Cholera: sumByKey(choleraData, k),
      Dengue: sumByKey(dengueData, k),
      Typhoid: sumByKey(typhoidData, k),
    }))
  ), [dengueData, choleraData, typhoidData, yearKeys, yearLabels]);

  const pieData = useMemo(() => (
    [
      { name: "Cholera", value: sumByKey(choleraData, latestKey) },
      { name: "Dengue", value: sumByKey(dengueData, latestKey) },
      { name: "Typhoid", value: sumByKey(typhoidData, latestKey) },
    ]
  ), [choleraData, dengueData, typhoidData, latestKey]);

  const PIE_COLORS = ["#1f77b4", "#ff7300", "#2ca02c"]; // Cholera blue, Dengue orange, Typhoid green

  // Utilities for state-wise charting in report pages
  const getStateOptions = (data) => {
    const set = new Set();
    data.forEach((r) => {
      if (r?.state_u_t_) set.add(r.state_u_t_);
    });
    return Array.from(set).sort();
  };

  const buildYearSeries = (data, stateName) => {
    if (stateName === "ALL") {
      return yearKeys.map((k, idx) => ({ year: yearLabels[idx], Cases: sumByKey(data, k) }));
    }
    const row = data.find((r) => (r?.state_u_t_ || "").toLowerCase() === stateName.toLowerCase());
    return yearKeys.map((k, idx) => ({ year: yearLabels[idx], Cases: Number(row?.[k]) || 0 }));
  };

  // Reset state filter when changing page/disease
  useEffect(() => {
    setSelectedReportState("ALL");
  }, [activePage, selectedDisease]);

  // Logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      navigate("/");
    }
  };

  // Table renderer
  const renderTable = (data, title) => (
    <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
      <div className="card-body">
        <h4 className="fw-bold">{title} Data</h4>
        {data.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>State/UT</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
                <th>2024</th>
                <th>2025 (Prov.)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id}>
                  <td>{row.s__no}</td>
                  <td>{row.state_u_t_}</td>
                  <td>{row._2021}</td>
                  <td>{row._2022}</td>
                  <td>{row._2023}</td>
                  <td>{row._2024}</td>
                  <td>{row._2025__prov__}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  // Content for new pages
  const renderPageContent = () => {
    switch (activePage) {
      case "speciality":
        return (
          <div>
            <h2>🌐 {translations[language].speciality}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p className="mb-0">
                  Our platform specializes in real-time monitoring and analysis of water-borne diseases to support effective decision-making and public awareness. By combining health data, environmental insights, and advanced analytics, it provides a comprehensive view of outbreak trends and affected regions. Administrators can track cases, manage reports, and generate actionable insights with ease. The system’s intuitive design ensures quick access to crucial information, while data visualization tools help identify emerging patterns. This focused approach enables timely interventions, resource allocation, and prevention strategies—making our solution a reliable hub for managing water-borne disease surveillance efficiently and intelligently.
                </p>
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div>
            <h2>ℹ️ {translations[language].about}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p className="mb-0">
                  An innovative, affordable digital platform designed to fight water-borne diseases. HydroTrim is an innovative, affordable digital platform designed to fight water-borne diseases in rural and semi-urban communities. Our mission is to equip health workers with simple yet powerful mobile and web applications, timely detection, and immediate intervention. With the support of smart analytics, HydroTrim not only tracks and flags potential outbreaks, but also delivers instant alerts and intuitive hotspot visualizations, empowering communities and authorities to respond faster and smarter. Our ultimate goal is clear: reduce the spread of water-borne diseases, save lives, and build resilient, healthier communities through real-time, technology-driven health monitoring.
                </p>
              </div>
            </div>
          </div>
        );
      case "international":
        return (
          <div>
            <h2>🌍 {translations[language].international}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p className="mb-0">
                  We collaborate with international organizations, research institutions, and health agencies to strengthen global efforts in combating water-borne diseases. Through these partnerships, we exchange data, expertise, and innovative solutions that help improve disease detection, prevention, and control worldwide. Our platform supports cross-border data sharing and comparative analysis, enabling a unified response to emerging health threats. By aligning with global standards set by the WHO and other international bodies, we ensure accuracy, transparency, and reliability in every report. These collaborations promote collective learning, faster response mechanisms, and a shared commitment to safeguarding public health across nations.
                </p>
              </div>
            </div>
          </div>
        );
      case "blogs":
        return (
          <div>
            <h2>📰 {translations[language].blogs}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p>
                  Our blog section serves as an informative hub where experts, health professionals, and community members share insights on water-borne diseases, sanitation, and preventive healthcare. Each article is designed to raise awareness, highlight real-life case studies, and showcase the latest advancements in water safety and disease management. Readers can explore topics such as early detection, sustainable clean-water initiatives, and success stories from affected regions. The goal is to educate and inspire collective action toward healthier communities. Through our blogs, we bridge the gap between science and society, empowering individuals to make informed choices for a safer tomorrow.
                </p>
                <h6 className="mt-3">Explore trusted blogs and resources</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><a href="https://www.who.int/health-topics/water-sanitation-and-hygiene" target="_blank" rel="noreferrer">WHO: Water, Sanitation and Hygiene (WASH)</a></li>
                  <li className="list-group-item"><a href="https://www.cdc.gov/healthywater/diseases/index.html" target="_blank" rel="noreferrer">CDC: Waterborne Diseases</a></li>
                  <li className="list-group-item"><a href="https://www.unicef.org/wash" target="_blank" rel="noreferrer">UNICEF WASH</a></li>
                  <li className="list-group-item"><a href="https://washmatters.wateraid.org/blog" target="_blank" rel="noreferrer">WaterAid Blog</a></li>
                  <li className="list-group-item"><a href="https://www.nature.com/subjects/waterborne-diseases" target="_blank" rel="noreferrer">Nature: Waterborne Diseases</a></li>
                  <li className="list-group-item"><a href="https://globalhealthnow.org/" target="_blank" rel="noreferrer">Global Health Now</a></li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "news":
        return (
          <div>
            <h2>🗞️ {translations[language].news}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p>
                  Stay updated with the latest developments, alerts, and research in the field of water-borne diseases through our news section. We bring you verified updates from trusted global health organizations, government reports, and ongoing environmental studies. From outbreak notifications and preventive guidelines to technological innovations in water purification, our news hub ensures you’re always informed. We also highlight local and international initiatives working to improve access to clean water and sanitation. Whether it’s a new vaccine breakthrough or a public health campaign, our goal is to deliver timely, accurate, and impactful news that supports awareness and action worldwide.
                </p>
                <h6 className="mt-3">Latest news and official updates</h6>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><a href="https://www.who.int/emergencies" target="_blank" rel="noreferrer">WHO: Health Emergencies</a></li>
                  <li className="list-group-item"><a href="https://www.cdc.gov/media/index.html" target="_blank" rel="noreferrer">CDC: Newsroom</a></li>
                  <li className="list-group-item"><a href="https://www.epa.gov/ground-water-and-drinking-water" target="_blank" rel="noreferrer">US EPA: Drinking Water</a></li>
                  <li className="list-group-item"><a href="https://www.unicef.org/press-releases" target="_blank" rel="noreferrer">UNICEF: Press Releases</a></li>
                  <li className="list-group-item"><a href="https://reliefweb.int/" target="_blank" rel="noreferrer">ReliefWeb: Humanitarian News</a></li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div>
            <h2>📞 {translations[language].contact}</h2>
            <div className={`card shadow-sm mt-3 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <p className="mb-2">For inquiries or feedback, please contact us at:</p>
                <p className="mb-3"><strong>support@hydrotrim.org</strong></p>
                <div className="d-flex flex-wrap gap-2">
                  <a href="mailto:support@hydrotrim.org" className="btn btn-primary">Email Us</a>
                </div>
              </div>
            </div>
          </div>
        );
      case "report-dengue": {
        const stateOptions = getStateOptions(dengueData);
        const singleBarData = buildYearSeries(dengueData, selectedReportState);
        return (
          <>
            <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Dengue Cases Over Time</h5>
                <div className="mb-3 d-flex align-items-center gap-2">
                  <label className="form-label mb-0">View:</label>
                  <select className="form-select w-auto" value={selectedReportState} onChange={(e) => setSelectedReportState(e.target.value)}>
                    <option value="ALL">All India</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={singleBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Cases" fill="#ff7300" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {renderTable(dengueData, "🦠 Dengue")}
          </>
        );
      }
      case "report-typhoid": {
        const stateOptions = getStateOptions(typhoidData);
        const singleBarData = buildYearSeries(typhoidData, selectedReportState);
        return (
          <>
            <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Typhoid Cases Over Time</h5>
                <div className="mb-3 d-flex align-items-center gap-2">
                  <label className="form-label mb-0">View:</label>
                  <select className="form-select w-auto" value={selectedReportState} onChange={(e) => setSelectedReportState(e.target.value)}>
                    <option value="ALL">All India</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={singleBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Cases" fill="#2ca02c" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {renderTable(typhoidData, "🧫 Typhoid")}
          </>
        );
      }
      case "report-cholera": {
        const stateOptions = getStateOptions(choleraData);
        const singleBarData = buildYearSeries(choleraData, selectedReportState);
        return (
          <>
            <div className={`card shadow-sm mb-4 ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
              <div className="card-body">
                <h5 className="fw-bold mb-3">Cholera Cases Over Time</h5>
                <div className="mb-3 d-flex align-items-center gap-2">
                  <label className="form-label mb-0">View:</label>
                  <select className="form-select w-auto" value={selectedReportState} onChange={(e) => setSelectedReportState(e.target.value)}>
                    <option value="ALL">All India</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={singleBarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Cases" fill="#1f77b4" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {renderTable(choleraData, "📌 Cholera")}
          </>
        );
      }
      default:
        return (
          <>
            {/* Default Dashboard */}
            <div className="row g-4 mb-4">
              {[translations[language].totalUsers, translations[language].activeReports, translations[language].sos].map((title, i) => (
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

            {/* Charts Section */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-lg-6">
                <div className={`card shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Water-Borne Disease Trends (2021–2025)</h5>
                    <div style={{ width: "100%", height: 280 }}>
                      <ResponsiveContainer>
                        <LineChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="Cholera" stroke="#1f77b4" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="Dengue" stroke="#ff7300" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="Typhoid" stroke="#2ca02c" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6">
                <div className={`card shadow-sm ${localStorage.getItem("darkMode") === "true" ? "bg-secondary text-light" : ""}`}>
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Active Case Distribution (2025)</h5>
                    <div style={{ width: "100%", height: 280 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Tooltip />
                          <Legend />
                          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} label>
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed tables removed from main dashboard per specialization */}
          </>
        );
    }
  };

  return (
    <div className={`d-flex min-vh-100 ${localStorage.getItem("darkMode") === "true" ? "bg-dark text-light" : "bg-light"}`}>
      {/* Sidebar */}
      <div style={{ width: "250px" }} className="d-flex flex-column">
        <div className="p-3 text-center fw-bold fs-3 text-primary">💠 HydroTrim</div>
        <aside className="bg-dark text-white p-3 flex-grow-1 d-flex flex-column">
          <h4 className="mb-4">{translations[language].adminPanel}</h4>
          <button className="btn btn-dark text-start mb-2" onClick={() => { setActivePage("dashboard"); setSelectedDisease(""); }}>
            📊 {translations[language].dashboard}
          </button>

          <div className="mb-2">
            <button
              className="btn btn-dark w-100 text-start"
              onClick={() => setShowReports(!showReports)}
            >
              📑 {translations[language].reports} ▾
            </button>
            {showReports && (
              <div className="ms-3 mt-2 d-flex flex-column">
                <button className="btn btn-outline-light text-start mb-1" onClick={() => { setSelectedDisease("dengue"); setActivePage("report-dengue"); }}>
                  {translations[language].dengue}
                </button>
                <button className="btn btn-outline-light text-start mb-1" onClick={() => { setSelectedDisease("typhoid"); setActivePage("report-typhoid"); }}>
                  {translations[language].typhoid}
                </button>
                <button className="btn btn-outline-light text-start" onClick={() => { setSelectedDisease("cholera"); setActivePage("report-cholera"); }}>
                  {translations[language].cholera}
                </button>
              </div>
            )}
          </div>

          {/* New navigation items */}
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("speciality")}>
            🧩 {translations[language].speciality}
          </button>
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("about")}>
            ℹ️ {translations[language].about}
          </button>
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("international")}>
            🌍 {translations[language].international}
          </button>
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("blogs")}>
            📰 {translations[language].blogs}
          </button>
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("news")}>
            🗞️ {translations[language].news}
          </button>
          <button className="btn btn-dark text-start mb-2" onClick={() => setActivePage("contact")}>
            📞 {translations[language].contact}
          </button>

          <Link to="/admin/settings" className="btn btn-dark text-start mb-2">
            ⚙️ {translations[language].settings}
          </Link>
        </aside>
      </div>

      {/* Main content */}
      <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>{translations[language][activePage] || translations[language].dashboard}</h2>
            <p>{translations[language].welcome} <strong>Admin 🚀</strong></p>
          </div>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={() => navigate("/admin/profile")}>
              👤 {translations[language].profile}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              🔒 {translations[language].logout}
            </button>
          </div>
        </div>

        {renderPageContent()}
      </main>
    </div>
  );
}
