import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, CartesianGrid
} from "recharts";

export default function UserDashboard() {
  const summary = {
    doctors: 42,
    patients: 2431,
    opdToday: 86,
    ipdAdmitted: 27,
  };

  const areaData = [
    { day: "Mon", patients: 60, revenue: 4000 },
    { day: "Tue", patients: 72, revenue: 5200 },
    { day: "Wed", patients: 68, revenue: 4700 },
    { day: "Thu", patients: 90, revenue: 6200 },
    { day: "Fri", patients: 86, revenue: 6000 },
    { day: "Sat", patients: 120, revenue: 8200 },
    { day: "Sun", patients: 40, revenue: 2800 },
  ];

  const barData = [
    { name: "Cardiology", count: 32 },
    { name: "Orthopedics", count: 22 },
    { name: "Pediatrics", count: 45 },
    { name: "General", count: 60 },
  ];

  return (
    <>
      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="row g-3 mb-4"
      >
        {[
          { label: "Doctors", value: summary.doctors, note: "Active" },
          { label: "Total Patients", value: summary.patients, note: "All time" },
          { label: "OPD Today", value: summary.opdToday, note: "Appointments" },
          { label: "IPD Admitted", value: summary.ipdAdmitted, note: "Beds occupied" },
        ].map((item, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title text-muted small">{item.label}</h6>
                <h3 className="fw-bold mb-0">{item.value}</h3>
                <small className="text-muted">{item.note}</small>
              </div>
            </div>
          </div>
        ))}
      </motion.section>

      {/* Area Chart */}
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="mb-0">Weekly Patients & Revenue</h6>
          <small className="text-muted">Last 7 days</small>
        </div>
        <div className="card-body" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="patients" strokeWidth={2} stroke="#0d6efd" fillOpacity={0.2} fill="#0d6efd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">Department Usage</h6>
        </div>
        <div className="card-body" style={{ height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" barSize={28} fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
