import React, { useState } from "react";
import "./navbar.css"; // custom CSS

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">💧 HydroTrim</div>

      {/* Nav links */}
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      {/* Buttons */}
      <div className="nav-buttons">
        <a href="#" className="btn user-btn">Register as User</a>
        <a href="#" className="btn admin-btn">Register as Admin</a>
      </div>
    </nav>
  );
}


