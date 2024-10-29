// src/Component/Admin/ManageUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h3>Manage Users</h3>

      {/* Tabs for switching between Students and Vendors */}
      <div style={{ display: 'flex', cursor: 'pointer', marginBottom: '20px' }}>
        <div
          onClick={() => setActiveTab("students")}
          style={{
            padding: '10px 20px',
            borderBottom: activeTab === "students" ? '2px solid blue' : 'none'
          }}
        >
          Students
        </div>
        <div
          onClick={() => setActiveTab("vendors")}
          style={{
            padding: '10px 20px',
            borderBottom: activeTab === "vendors" ? '2px solid blue' : 'none'
          }}
        >
          Vendors
        </div>
      </div>

      {/* Conditionally render users based on the active tab */}
      {activeTab === "students" && (
        <div>
          <h4>Student Users</h4>
          {students.map((user) => (
            <div key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => deleteUser(user._id, "student")}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "vendors" && (
        <div>
          <h4>Vendor Users</h4>
          {vendors.map((user) => (
            <div key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => deleteUser(user._id, "vendor")}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageUsers;
