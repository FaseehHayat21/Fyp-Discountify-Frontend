// src/Pages/AdminPage/AdminPage.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./AdminPage.css"
function AdminPage() {
  return (
    <div>
      <h2 className='heading-top-routes'>Admin Dashboard</h2>
      <nav>
      <div className="tab-container">
        <Link to="manage-users" className="tab-button">Manage Users</Link>
        <Link to="layout" className="tab-button">Layout</Link>

      </div>
      </nav>
      <Outlet /> {/* This is where nested routes will render */}
    </div>
  );
}

export default AdminPage;
