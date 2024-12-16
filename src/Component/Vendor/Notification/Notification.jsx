import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true); // Start loading
      const vendorId = localStorage.getItem('userid');
      let url = `http://localhost:1000/api/auth/notifications/${vendorId}`;
      if (filter === 'read') url += '?isRead=true';
      if (filter === 'unread') url += '?isRead=false';

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]); // Clear notifications on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNotifications();
  }, [filter]); // Re-fetch when filter changes

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:1000/api/auth/notifications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) throw new Error('Failed to update notification status');

      // Update the state to mark the notification as read
      setNotifications((prev) =>
        prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className='notification'>
      <h1 className='heading-notification'>Vendor Dashboard</h1>
      <h2 className='heading-notification'>Notifications</h2>

      {/* Filter Buttons */}
      <div className='filter-buttons '>
        <button
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={{ fontWeight: filter === 'read' ? 'bold' : 'normal' }}
          onClick={() => setFilter('read')}
        >
          Read
        </button>
        <button
          style={{ fontWeight: filter === 'unread' ? 'bold' : 'normal' }}
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className='notification-list'>
          {notifications.map((notification) => (
            <li className='notification-item'
              key={notification._id}
              style={{
                textDecoration: notification.isRead ? 'line-through' : 'none',
                marginBottom: '10px',
              }}
            >
              Student {notification.studentName} availed your deal: {notification.dealTitle}.
              {!notification.isRead && (
                <button
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
