// src/components/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/users">View Users</Link>
      <Link to="/add-user">Add User</Link>
    </div>
  );
}

export default AdminDashboard;
