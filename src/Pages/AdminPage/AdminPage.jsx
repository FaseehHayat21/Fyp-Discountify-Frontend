// src/Pages/AdminPage/AdminPage.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="manage-users">Manage Users</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* This is where nested routes will render */}
    </div>
  );
}

export default AdminPage;
