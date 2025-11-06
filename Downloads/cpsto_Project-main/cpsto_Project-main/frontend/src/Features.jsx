import React from "react";
import './app.css'; // use your existing styling

export default function Features() {
  return (
    <div className="features-container">
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

      <div className="feature-item">
        <h2>💧 Water Intake Tracking</h2>
        <p>Log daily water consumption and monitor hydration levels.</p>
      </div>

      <div className="feature-item">
        <h2>⏰ Reminders & Alerts</h2>
        <p>Get timely notifications to stay hydrated and maintain wellness.</p>
      </div>

      <div className="feature-item">
        <h2>📊 Health Monitoring</h2>
        <p>Track wellness progress, identify patterns, and improve overall community health.</p>
      </div>

      <div className="feature-item">
        <h2>📝 Case Reporting</h2>
        <p>Health workers can report water-borne disease cases via mobile or web apps, even offline.</p>
      </div>

      <div className="feature-item">
        <h2>🌐 Multilingual Support</h2>
        <p>Supports multiple languages to reach diverse rural and semi-urban communities.</p>
      </div>
    </div>
  );
}
