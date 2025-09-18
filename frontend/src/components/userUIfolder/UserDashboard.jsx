import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, CartesianGrid
} from "recharts";
import { User, Activity, Stethoscope, BedDouble } from "lucide-react";

export default function UserDashboard() {
  const summary = [
    { label: "Doctors", value: 42, note: "Active", icon: <Stethoscope className="text-primary" /> },
    { label: "Total Patients", value: 2431, note: "All time", icon: <User className="text-success" /> },
    { label: "OPD Today", value: 86, note: "Appointments", icon: <Activity className="text-info" /> },
    { label: "IPD Admitted", value: 27, note: "Beds occupied", icon: <BedDouble className="text-danger" /> },
  ];

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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="row g-3 mb-4"
      >
        {summary.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.04 }}
            className="col-6 col-lg-3"
          >
            <div className="card shadow-sm border-0 rounded-3 h-100">
              <div className="card-body d-flex flex-column align-items-start gap-2">
                <div className="d-flex align-items-center gap-2">
                  {item.icon}
                  <h6 className="card-title text-muted small mb-0">{item.label}</h6>
                </div>
                <h3 className="fw-bold mb-0">{item.value}</h3>
                <small className="text-muted">{item.note}</small>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Area Chart */}
      <div className="card mb-4 shadow-sm border-0 rounded-3">
        <div className="card-header bg-white border-0 d-flex flex-column">
          <h6 className="mb-0 fw-semibold">Weekly Patients & Revenue</h6>
          <small className="text-muted">Last 7 days trend</small>
        </div>
        <div className="card-body" style={{ height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Area
                type="monotone"
                dataKey="patients"
                strokeWidth={2}
                stroke="#0d6efd"
                fill="url(#colorPatients)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-header bg-white border-0">
          <h6 className="mb-0 fw-semibold">Department Usage</h6>
          <small className="text-muted">Distribution of patients</small>
        </div>
        <div className="card-body" style={{ height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" barSize={28} fill="#198754" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
