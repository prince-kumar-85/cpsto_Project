import React from "react";
import UserHeader from "./UserHeader";
import UserDashboard from "./UserDashboard";
import UserFooter from "./UserFooter";

export default function HospitalDashboard() {
  return (
    <div className="container py-4">
      <UserHeader />
      <UserDashboard />
      <UserFooter />
    </div>
  );
}
