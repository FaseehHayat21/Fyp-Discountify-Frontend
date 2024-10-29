// src/components/AdminLogin.js
import React, { useState } from "react";
import axios from "axios";

import { useNavigate, Link } from 'react-router-dom';
function AdminLogin({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1000/api/admin/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    });
    const json = await response.json();

    console.log("API Response:", json);  // Log the entire response

    if (json.success === true) {
        const token = json.authToken;  // Use correct capitalization
        console.log("Token to be saved:", token);  // Log the token before saving

        if (token) {
            localStorage.setItem('token', token);  // Attempt to save
            localStorage.setItem('usertype', json.userType);  // Attempt to save
            console.log("Token saved to localStorage:", localStorage.getItem('token'));  // Verify save
            console.log("Token saved to localStorage:", localStorage.getItem('usertype'));  // Verify save
            navigate("/admin"); 
        } else {
            console.error("Token is undefined, cannot save to localStorage");
        }
        
         // Only navigate if token save is successful
    } else {
        alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
