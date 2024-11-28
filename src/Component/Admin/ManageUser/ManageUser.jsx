// src/Component/Admin/ManageUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ManageUser.css"
function ManageUsers({ authToken }) {
  const [students, setStudents] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("students"); // 'students' or 'vendors'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/admin/users', {
          headers: { 'auth-token': localStorage.getItem('token') }
        });
        setStudents(response.data.students || []);
        setVendors(response.data.vendors || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id, userType) => {
    try {
      await axios.delete(`http://localhost:1000/api/admin/user/${id}?userType=${userType}`, {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      if (userType === "student") {
        setStudents(students.filter((user) => user._id !== id));
      } else {
        setVendors(vendors.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h3 className='Manage-User-Heading'>Manage Users</h3>

      {/* Tabs for switching between Students and Vendors */}
      <div className="tabs">
        <div
          className={`tab ${activeTab === "students" ? "active" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </div>
        <div
          className={`tab ${activeTab === "vendors" ? "active" : ""}`}
          onClick={() => setActiveTab("vendors")}
        >
          Vendors
        </div>
       </div>

      {/* Conditionally render users based on the active tab */}
      {activeTab === "students" && (
    <div className="user-list">
      <h4>Student Users</h4>
      {students.map((user) => (
        <div className="user-card" key={user._id}>
          <div className="user-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUser(user._id, "student")}>Delete</button>
        </div>
      ))}
    </div>
  )}

  {activeTab === "vendors" && (
    <div className="user-list">
      <h4>Vendor Users</h4>
      {vendors.map((user) => (
        <div className="user-card" key={user._id}>
          <div className="user-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
          <button onClick={() => deleteUser(user._id, "vendor")}>Delete</button>
        </div>
      ))}
    </div>
  )}
</div>
  );
}

export default ManageUsers;
