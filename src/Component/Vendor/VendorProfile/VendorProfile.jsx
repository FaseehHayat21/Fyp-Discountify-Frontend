import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const vendorId = localStorage.getItem('userid');
const socket = io('http://localhost:1000', { query: { vendorId } });

function VendorProfile() {
  const [vendor, setVendor] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    city: '',
    companyName: '',
    companyAddress: '',
    category: '',
    introduction: '',
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('deal-availed', (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('deal-availed');
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/vendors/${vendorId}`);
        setVendor(res.data.vendor);
        setProfile(res.data.profile);
        setForm({
          name: res.data.vendor.name,
          email: res.data.vendor.email,
          phoneNumber: res.data.vendor.phoneNumber,
          city: res.data.vendor.city,
          companyName: res.data.vendor.companyName,
          companyAddress: res.data.vendor.companyAddress,
          category: res.data.vendor.category,
          introduction: res.data.profile?.introduction || '',
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:1000/api/vendors/${vendorId}`, form);
      setVendor(res.data.vendor);
      setProfile(res.data.profile);
      setEditing(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Vendor Dashboard</h1>

      <h2>Profile</h2>
      {vendor ? (
        editing ? (
          <>
            <input name="name" value={form.name} onChange={handleChange} />
            <input name="email" value={form.email} onChange={handleChange} />
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            <input name="city" value={form.city} onChange={handleChange} />
            <input name="companyName" value={form.companyName} onChange={handleChange} />
            <input name="companyAddress" value={form.companyAddress} onChange={handleChange} />
            <input name="category" value={form.category} onChange={handleChange} />
            <textarea name="introduction" value={form.introduction} onChange={handleChange} />
            <button onClick={handleUpdate}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {vendor.name}</p>
            <p><strong>Email:</strong> {vendor.email}</p>
            <p><strong>Phone:</strong> {vendor.phoneNumber}</p>
            <p><strong>City:</strong> {vendor.city}</p>
            <p><strong>Company:</strong> {vendor.companyName}</p>
            <p><strong>Address:</strong> {vendor.companyAddress}</p>
            <p><strong>Category:</strong> {vendor.category}</p>
            <p><strong>Intro:</strong> {profile?.introduction}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )
      ) : (
        <p>Loading profile...</p>
      )}

      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              Student {notification.studentName} availed your deal: {notification.dealTitle}.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VendorProfile;
