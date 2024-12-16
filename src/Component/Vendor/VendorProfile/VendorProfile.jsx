import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const vendorId = localStorage.getItem('userid'); // Replace with actual vendor ID
const socket = io('http://localhost:1000', { query: { vendorId } });

function VendorProfile() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('deal-availed', (data) => {
      setNotifications((prev) => [...prev, data]);
      console.log('Notification received:', data); // Debugging
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('deal-availed');
    };
  }, []);

  return (
    <div>
      <h1>Vendor Dashboard</h1>
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
