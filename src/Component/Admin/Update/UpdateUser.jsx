// src/components/UserForm.js
import React, { useState } from "react";
import axios from "axios";

function UpdateUser({ authToken }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userType: "student", // Either "student" or "vendor"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/auth/register", user, {
        headers: { "auth-token": authToken },
      });
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>{user._id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        <select value={user.userType} onChange={(e) => setUser({ ...user, userType: e.target.value })}>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit">{user._id ? "Update" : "Add"} User</button>
      </form>
    </div>
  );
}

export default UpdateUser;
