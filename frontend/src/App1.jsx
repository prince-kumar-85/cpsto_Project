import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AdminProfile from "./components/admin/AdminProfile";

import Settings from "./components/admin/Settings";

import AdminLogin from "./components/admin/AdminLogin";
import AdminSignup from "./components/admin/AdminSignup";
import AdminDashboard from "./components/admin/AdminDashboard";

function App1() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuthenticated(true);
    if (localStorage.getItem("adminToken")) setIsAdminAuthenticated(true);
  }, []);

  return (
    <Routes>
      {/* User routes */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

      {/* Admin routes */}
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />} />
      <Route path="/admin/dashboard" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
      <Route path="/admin/settings" element={<Settings />} />

      <Route path="/admin/profile" element={<AdminProfile />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App1;
