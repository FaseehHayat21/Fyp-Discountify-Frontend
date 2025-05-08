// import React, { useEffect, useState } from 'react';
// import './Notification.css';

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true); // Start loading
//       const vendorId = localStorage.getItem('userid');
//       let url = `http://localhost:1000/api/auth/notifications/${vendorId}`;
//       if (filter === 'read') url += '?isRead=true';
//       if (filter === 'unread') url += '?isRead=false';

//       try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch notifications');
//         const data = await response.json();
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setNotifications([]); // Clear notifications on error
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchNotifications();
//   }, [filter]); // Re-fetch when filter changes

//   const markAsRead = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:1000/api/auth/notifications/${id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isRead: true }),
//       });

//       if (!response.ok) throw new Error('Failed to update notification status');

//       // Update the state to mark the notification as read
//       setNotifications((prev) =>
//         prev.map((notif) => (notif._id === id ? { ...notif, isRead: true } : notif))
//       );
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   return (
//     <div className='notification'>
//       <h1 className='heading-notification'>Vendor Dashboard</h1>
//       <h2 className='heading-notification'>Notifications</h2>

//       {/* Filter Buttons */}
//       <div className='filter-buttons '>
//         <button
//           style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </button>
//         <button
//           style={{ fontWeight: filter === 'read' ? 'bold' : 'normal' }}
//           onClick={() => setFilter('read')}
//         >
//           Read
//         </button>
//         <button
//           style={{ fontWeight: filter === 'unread' ? 'bold' : 'normal' }}
//           onClick={() => setFilter('unread')}
//         >
//           Unread
//         </button>
//       </div>

//       {/* Loading Indicator */}
//       {loading ? (
//         <p>Loading notifications...</p>
//       ) : notifications.length === 0 ? (
//         <p>No notifications yet.</p>
//       ) : (
//         <ul className='notification-list'>
//           {notifications.map((notification) => (
//             <li className='notification-item'
//               key={notification._id}
//               style={{
//                 textDecoration: notification.isRead ? 'line-through' : 'none',
//                 marginBottom: '10px',
//               }}
//             >
//               Student {notification.studentName} availed your deal: {notification.dealTitle}.
//               {!notification.isRead && (
//                 <button
//                   style={{ marginLeft: '10px', cursor: 'pointer' }}
//                   onClick={() => markAsRead(notification._id)}
//                 >
//                   Mark as Read
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Notification;


// import React, { useEffect, useState } from 'react';
// import { FiBell, FiEdit2, FiSave, FiX, FiUpload, FiUser, FiMail, FiBriefcase } from 'react-icons/fi';
// import './Notification.css';

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [vendorProfile, setVendorProfile] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [intro, setIntro] = useState('');
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [previewPhoto, setPreviewPhoto] = useState('');

//   const vendorId = localStorage.getItem('userid');

//   // Fetch notifications
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setLoading(true);
//       let url = `http://localhost:1000/api/auth/notifications/${vendorId}`;
//       if (filter === 'read') url += '?isRead=true';
//       if (filter === 'unread') url += '?isRead=false';

//       try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Failed to fetch notifications');
//         const data = await response.json();
//         setNotifications(data);
        
//         // Calculate unread count
//         const unread = data.filter(n => !n.isRead).length;
//         setUnreadCount(unread);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setNotifications([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [filter, vendorId]);

//   // Fetch vendor profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:1000/api/auth/venndorprofile', {
//           headers: { 'auth-token': token }
//         });
//         const data = await res.json();
//         setVendorProfile(data);
//         setIntro(data.introduction || '');
//         if (data.profilePhoto) {
//           setPreviewPhoto(`http://localhost:1000/${data.profilePhoto}`);
//         }
//       } catch (err) {
//         console.error('Error fetching vendor profile:', err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleProfileUpdate = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('introduction', intro);
//       if (profilePhoto) {
//         formData.append('profilePhoto', profilePhoto);
//       }

//       const res = await fetch('http://localhost:1000/api/auth/vendorprofile', {
//         method: 'PUT',
//         headers: {
//           'auth-token': token
//         },
//         body: formData
//       });

//       if (!res.ok) throw new Error('Failed to update profile');

//       const updated = await res.json();
//       console.log(updated)
//       setVendorProfile(updated);
//       setEditing(false);
//       setProfilePhoto(null);
//       if (updated.profilePhoto) {
//         setPreviewPhoto(`http://localhost:1000/${updated.profilePhoto}`);
//       }
//     } catch (err) {
//       console.error('Update failed:', err);
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePhoto(file);
//       setPreviewPhoto(URL.createObjectURL(file));
//     }
//   };

//   const markAsRead = async (notificationId) => {
//     try {
//           const response = await fetch(`http://localhost:1000/api/auth/notifications/${notificationId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isRead: true }),
//       });
      
//       if (response.ok) {
//         setNotifications(notifications.map(n => 
//           n._id === notificationId ? {...n, isRead: true} : n
//         ));
//         setUnreadCount(unreadCount - 1);
//       }
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   return (
//     <div className='luxury-vendor-dashboard'>
//       {/* Header */}
//       <header className='dashboard-header'>
//         <h1 className='dashboard-title'>Vendor Dashboard</h1>
        
//         <div className='notification-bell-container' onClick={toggleNotifications}>
//           <FiBell className='notification-bell' />
//           {unreadCount > 0 && (
//             <span className='notification-badge'>{unreadCount}</span>
//           )}
//         </div>
//       </header>

//       {/* Profile Section */}
//       <section className='profile-section'>
//         <div className='profile-header'>
//           <h2>Your Profile</h2>
//           {editing ? (
//             <div className='profile-actions'>
//               <button className='save-btn' onClick={handleProfileUpdate}>
//                 <FiSave /> Save
//               </button>
//               <button className='cancel-btn' onClick={() => setEditing(false)}>
//                 <FiX /> Cancel
//               </button>
//             </div>
//           ) : (
//             <button className='edit-btn' onClick={() => setEditing(true)}>
//               <FiEdit2 /> Edit Profile
//             </button>
//           )}
//         </div>

//         {vendorProfile && (
//           <div className='profile-content'>
//             <div className='profile-photo-container'>
//               {previewPhoto ? (
//                 <img src={previewPhoto} alt="Profile" className='profile-photo' />
//               ) : (
//                 <div className='profile-photo-placeholder'>
//                   <FiUser size={48} />
//                 </div>
//               )}
              
//               {editing && (
//                 <label className='photo-upload-btn'>
//                   <FiUpload />
//                   <input
//                     type='file'
//                     accept='image/*'
//                     onChange={handlePhotoChange}
//                     className='hidden'
//                   />
//                 </label>
//               )}
//             </div>

//             <div className='profile-info'>
//               <div className='info-item'>
//                 <FiUser className='info-icon' />
//                 <span className='info-label'>Name:</span>
//                 <span>{vendorProfile.name}</span>
//               </div>
              
//               <div className='info-item'>
//                 <FiMail className='info-icon' />
//                 <span className='info-label'>Email:</span>
//                 <span>{vendorProfile.email}</span>
//               </div>
              
//               <div className='info-item'>
//                 <FiBriefcase className='info-icon' />
//                 <span className='info-label'>Company:</span>
//                 <span>{vendorProfile.companyName}</span>
//               </div>
              
//               <div className='info-item intro-item'>
//                 <span className='info-label'>Introduction:</span>
//                 {editing ? (
//                   <textarea
//                     value={intro}
//                     onChange={(e) => setIntro(e.target.value)}
//                     placeholder='Tell customers about your business...'
//                   />
//                 ) : (
//                   <p>{intro || 'No introduction yet.'}</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* Notifications Section */}
//       <section className='notifications-section'>
//         <div className='section-header'>
//           <h2>Your Notifications</h2>
//           <div className='filter-buttons'>
//             <button 
//               className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
//               onClick={() => setFilter('all')}
//             >
//               All
//             </button>
//             <button 
//               className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
//               onClick={() => setFilter('read')}
//             >
//               Read
//             </button>
//             <button 
//               className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
//               onClick={() => setFilter('unread')}
//             >
//               Unread
//             </button>
//           </div>
//         </div>

//         {/* Notification Bell Dropdown */}
//         {showNotifications && (
//           <div className='notification-dropdown'>
//             <div className='dropdown-header'>
//               <h3>Notifications</h3>
//               <button onClick={toggleNotifications} className='close-dropdown'>
//                 <FiX />
//               </button>
//             </div>
            
//             {loading ? (
//               <div className='loading-spinner'></div>
//             ) : notifications.length === 0 ? (
//               <p className='no-notifications'>No notifications yet.</p>
//             ) : (
//               <ul className='notification-list'>
//                 {notifications.slice(0, 5).map((notification) => (
//                   <li
//                     key={notification._id}
//                     className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
//                     onClick={() => markAsRead(notification._id)}
//                   >
//                     <div className='notification-content'>
//                       <strong>{notification.studentName}</strong> availed your deal: 
//                       <strong> {notification.dealTitle}</strong>
//                     </div>
//                     {!notification.isRead && <div className='unread-dot'></div>}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {/* Full Notifications List */}
//         {loading ? (
//           <div className='loading-spinner'></div>
//         ) : notifications.length === 0 ? (
//           <p className='no-notifications'>No notifications yet.</p>
//         ) : (
//           <ul className='full-notification-list'>
//             {notifications.map((notification) => (
//               <li
//                 key={notification._id}
//                 className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
//               >
//                 <div className='notification-content'>
//                   <strong>{notification.studentName}</strong> availed your deal: 
//                   <strong> {notification.dealTitle}</strong>
//                   <span className='notification-time'>
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </span>
//                 </div>
//                 {!notification.isRead && (
//                   <button 
//                     className='mark-read-btn'
//                     onClick={() => markAsRead(notification._id)}
//                   >
//                     Mark as Read
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }

// export default Notification;





import React, { useEffect, useState } from 'react';
import { FiBell, FiEdit2, FiSave, FiX, FiUpload, FiUser, FiMail, FiBriefcase, FiPhone, FiMapPin } from 'react-icons/fi';
import './Notification.css';

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [vendorProfile, setVendorProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    location: '',
    introduction: ''
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState('');

  const vendorId = localStorage.getItem('userid');

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      let url = `http://localhost:1000/api/auth/notifications/${vendorId}`;
      if (filter === 'read') url += '?isRead=true';
      if (filter === 'unread') url += '?isRead=false';

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(data);
        
        // Calculate unread count
        const unread = data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [filter, vendorId]);

  // Fetch vendor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:1000/api/auth/venndorprofile', {
          headers: { 'auth-token': token }
        });
        const data = await res.json();
        setVendorProfile(data);
        
        // Initialize profile data for editing
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          companyName: data.companyName || '',
          phoneNumber: data.phoneNumber || '',
          location: data.location || '',
          introduction: data.introduction || ''
        });
        
        if (data.profilePhoto) {
          setPreviewPhoto(`http://localhost:1000/${data.profilePhoto}`);
        }
      } catch (err) {
        console.error('Error fetching vendor profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Append all profile data
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('companyName', profileData.companyName);
      formData.append('phoneNumber', profileData.phoneNumber);
      formData.append('location', profileData.location);
      formData.append('introduction', profileData.introduction);
      
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const res = await fetch('http://localhost:1000/api/auth/vendorprofile', {
        method: 'PUT',
        headers: {
          'auth-token': token
        },
        body: formData
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const updated = await res.json();
      
      // Update both vendorProfile and profileData states
      setVendorProfile(prev => ({
        ...prev,
        ...updated,
        name: updated.name || prev.name,
        email: updated.email || prev.email,
        companyName: updated.companyName || prev.companyName,
        phoneNumber: updated.phoneNumber || prev.phoneNumber,
        location: updated.location || prev.location,
        introduction: updated.introduction || prev.introduction
      }));
      
      setProfileData({
        name: updated.name || profileData.name,
        email: updated.email || profileData.email,
        companyName: updated.companyName || profileData.companyName,
        phoneNumber: updated.phoneNumber || profileData.phoneNumber,
        location: updated.location || profileData.location,
        introduction: updated.introduction || profileData.introduction
      });
      
      setEditing(false);
      setProfilePhoto(null);
      if (updated.profilePhoto) {
        setPreviewPhoto(`http://localhost:1000/${updated.profilePhoto}`);
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:1000/api/auth/notifications/${notificationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      
      if (response.ok) {
        setNotifications(notifications.map(n => 
          n._id === notificationId ? {...n, isRead: true} : n
        ));
        setUnreadCount(unreadCount - 1);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className='luxury-vendor-dashboard'>
      {/* Header */}
      <header className='dashboard-header'>
        <h1 className='dashboard-title'>Vendor Dashboard</h1>
        
        <div className='notification-bell-container' onClick={toggleNotifications}>
          <FiBell className='notification-bell' />
          {unreadCount > 0 && (
            <span className='notification-badge'>{unreadCount}</span>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <section className='profile-section'>
        <div className='profile-header'>
          <h2>Your Profile</h2>
          {editing ? (
            <div className='profile-actions'>
              <button className='save-btn' onClick={handleProfileUpdate}>
                <FiSave /> Save
              </button>
              <button className='cancel-btn' onClick={() => setEditing(false)}>
                <FiX /> Cancel
              </button>
            </div>
          ) : (
            <button className='edit-btn' onClick={() => setEditing(true)}>
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>

        {vendorProfile && (
          <div className='profile-content'>
            <div className='profile-photo-container'>
              {previewPhoto ? (
                <img src={previewPhoto} alt="Profile" className='profile-photo' />
              ) : vendorProfile.profilePhoto ? (
                <img src={`http://localhost:1000/${vendorProfile.profilePhoto}`} alt="Profile" className='profile-photo' />
              ) : (
                <div className='profile-photo-placeholder'>
                  <FiUser size={48} />
                </div>
              )}
              
              {editing && (
                <label className='photo-upload-btn'>
                  <FiUpload />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handlePhotoChange}
                    className='hidden'
                  />
                </label>
              )}
            </div>

            <div className='profile-info'>
              <div className='info-item'>
                <FiUser className='info-icon' />
                <span className='info-label'>Name:</span>
                {editing ? (
                  <input
                    type='text'
                    name='name'
                    value={profileData.name}
                    onChange={handleInputChange}
                    className='edit-input'
                  />
                ) : (
                  <span>{vendorProfile.name}</span>
                )}
              </div>
              
              <div className='info-item'>
                <FiMail className='info-icon' />
                <span className='info-label'>Email:</span>
               
                  <span>{vendorProfile.email}</span>
               
              </div>
              
              <div className='info-item'>
                <FiBriefcase className='info-icon' />
                <span className='info-label'>Company:</span>
                {editing ? (
                  <input
                    type='text'
                    name='companyName'
                    value={profileData.companyName}
                    onChange={handleInputChange}
                    className='edit-input'
                  />
                ) : (
                  <span>{vendorProfile.companyName}</span>
                )}
              </div>

              <div className='info-item'>
                <FiPhone className='info-icon' />
                <span className='info-label'>Phone:</span>
                {editing ? (
                  <input
                    type='text'
                    name='phoneNumber'
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className='edit-input'
                  />
                ) : (
                  <span>{vendorProfile.phoneNumber || 'Not provided'}</span>
                )}
              </div>

              <div className='info-item'>
                <FiMapPin className='info-icon' />
                <span className='info-label'>Location:</span>
                {editing ? (
                  <input
                    type='text'
                    name='location'
                    value={profileData.location}
                    onChange={handleInputChange}
                    className='edit-input'
                  />
                ) : (
                  <span>{vendorProfile.location || 'Not provided'}</span>
                )}
              </div>
              
              <div className='info-item intro-item'>
                <span className='info-label'>Introduction:</span>
                {editing ? (
                  <textarea
                    name='introduction'
                    value={profileData.introduction}
                    onChange={handleInputChange}
                    placeholder='Tell customers about your business...'
                    className='edit-textarea'
                  />
                ) : (
                  <p>{vendorProfile.introduction || 'No introduction yet.'}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Notifications Section */}
      <section className='notifications-section'>
        <div className='section-header'>
          <h2>Your Notifications</h2>
          <div className='filter-buttons'>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read
            </button>
            <button 
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Notification Bell Dropdown */}
        {showNotifications && (
          <div className='notification-dropdown'>
            <div className='dropdown-header'>
              <h3>Notifications</h3>
              <button onClick={toggleNotifications} className='close-dropdown'>
                <FiX />
              </button>
            </div>
            
            {loading ? (
              <div className='loading-spinner'></div>
            ) : notifications.length === 0 ? (
              <p className='no-notifications'>No notifications yet.</p>
            ) : (
              <ul className='notification-list'>
                {notifications.slice(0, 5).map((notification) => (
                  <li
                    key={notification._id}
                    className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                    onClick={() => markAsRead(notification._id)}
                  >
                    <div className='notification-content'>
                      <strong>{notification.studentName}</strong> availed your deal: 
                      <strong> {notification.dealTitle}</strong>
                    </div>
                    {!notification.isRead && <div className='unread-dot'></div>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Full Notifications List */}
        {loading ? (
          <div className='loading-spinner'></div>
        ) : notifications.length === 0 ? (
          <p className='no-notifications'>No notifications yet.</p>
        ) : (
          <ul className='full-notification-list'>
            {notifications.map((notification) => (
              <li
                key={notification._id}
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              >
                <div className='notification-content'>
                  <strong>{notification.studentName}</strong> availed your deal: 
                  <strong> {notification.dealTitle}</strong>
                  <span className='notification-time'>
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                {!notification.isRead && (
                  <button 
                    className='mark-read-btn'
                    onClick={() => markAsRead(notification._id)}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Notification;