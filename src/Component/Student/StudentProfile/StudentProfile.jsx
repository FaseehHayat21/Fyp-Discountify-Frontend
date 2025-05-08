// import React, { useContext, useEffect, useState } from 'react';
// import './StudentProfile.css'; // Custom CSS for styling
// import registerContext from "../../../context/Register/RegisterContext";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import axios from 'axios';
// const StudentProfile = () => {
//     const { profile, posts, loading, error, fetchProfile, updateProfile, fetchPosts, setPosts } = useContext(registerContext);
//     const [editing, setEditing] = useState(false);
//     const [editedProfile, setEditedProfile] = useState({});
//     const [activeTab, setActiveTab] = useState('info');
//     const [editingPostId, setEditingPostId] = useState(null);

//     useEffect(() => {
//         fetchProfile();
//         fetchPosts();
//     }, []);
//     const [editedPost, setEditedPost] = useState({ title: '', description: '' });

//     // Edit Post Handler
//     const handleEditPost = (post) => {
//         setEditingPostId(post._id);
//         setEditedPost({ title: post.title, description: post.description });
//     };

//     // Save Edited Post
//     const handleSavePost = async (postId) => {
//         try {
//             const token = localStorage.getItem('token'); // Retrieve the token
//             const response = await axios.put(
//                 `http://localhost:1000/api/auth/posts/${postId}`,
//                 editedPost,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'auth-token': token, // Pass the token in headers
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 const updatedPosts = posts.map((post) =>
//                     post._id === postId ? { ...post, ...editedPost } : post
//                 );
//                 setPosts(updatedPosts);
//                 setEditingPostId(null);
//             }
//         } catch (error) {
//             console.error('Error saving post:', error);
//         }
//     };
//     const handleDeletePost = async (postId) => {
//         try {
//             const token = localStorage.getItem('token'); // Retrieve the token
//             const response = await axios.delete(`http://localhost:1000/api/auth/posts/${postId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'auth-token': token, // Pass the token in headers
//                 },
//             });

//             if (response.data.success) {
//                 setPosts(posts.filter((post) => post._id !== postId));
//             }
//         } catch (error) {
//             console.error('Error deleting post:', error);
//         }
//     };





//     const handleEditClick = () => setEditing(true);
//     const handleSaveClick = async () => {
//         const formData = new FormData();

//         // Add all edited profile fields to the FormData object
//         for (const key in editedProfile) {
//             if (editedProfile[key]) {
//                 formData.append(key, editedProfile[key]);
//             }
//         }

//         try {
//             const response = await fetch('http://localhost:1000/api/auth/studentprofile', {
//                 method: 'PUT',
//                 headers: {
//                     'auth-token': localStorage.getItem('token'), // Include token
//                 },
//                 body: formData, // Send FormData
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 console.error('Failed to update profile:', data.error);
//                 return;
//             }

//             console.log('Profile updated successfully:', data);
//             setEditing(false);
//             fetchProfile(); // Refresh the profile data
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     const handleFileChange = (e) => {
//         setEditedProfile((prev) => ({
//             ...prev,
//             profilePhoto: e.target.files[0], // Set the file object
//         }));
//     };

//     const handleChange = (e) => {
//         setEditedProfile((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };



//     const handleAddSkill = () => {
//         if (editedProfile.newSkill) {
//             setEditedProfile({
//                 ...editedProfile,
//                 skills: [...(editedProfile.skills || []), editedProfile.newSkill],
//                 newSkill: "", // Clear the input field
//             });
//         }
//     };

//     const handleRemoveSkill = (index) => {
//         const updatedSkills = [...(editedProfile.skills || [])];
//         updatedSkills.splice(index, 1);
//         setEditedProfile({
//             ...editedProfile,
//             skills: updatedSkills,
//         });
//     };


//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="user-profile">
//             <div className="profile-header">
//                 <div className="profile-photo">
//                     <img
//                         src={`http://localhost:1000/${profile.profilePhoto || '/default-profile.png'}`}
//                         alt="Profile"
//                         className="profile-photo-img"
//                     />
//                     {editing && (
//                         <input
//                             type="file"
//                             name="profilePhoto"
//                             onChange={handleFileChange}
//                             accept="image/*"
//                         />
//                     )}
//                     <h2>{profile.userId.name}</h2>
//                 </div>
//                 <div className="profile-info">
//                     {!editing && <button onClick={handleEditClick}>Edit Profile</button>}
//                 </div>
//             </div>

//             <div className="profile-tabs">
//                 <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>Personal Info</button>
//                 {/* <button onClick={() => setActiveTab('cv')} className={activeTab === 'cv' ? 'active' : ''}>CV</button> */}
//                 <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'active' : ''}>Posts</button>
//             </div>

//             <div className="profile-content">
//                 {activeTab === 'info' && (
//                     <div className="personal-info">
//                         {editing ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     name="introduction"
//                                     value={editedProfile.introduction || profile.introduction}
//                                     onChange={handleChange}
//                                     placeholder="Introduction"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={editedProfile.name ?? profile.userId.name}
//                                     x onChange={handleChange}
//                                     placeholder="Name"
//                                 />

//                                 <input
//                                     type="text"
//                                     name="phoneNumber"
//                                     value={editedProfile.phoneNumber ?? profile.userId.phoneNumber}
//                                     onChange={handleChange}
//                                     placeholder="Phone Number"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="semester"
//                                     value={editedProfile.semester ?? profile.userId.semester}
//                                     onChange={handleChange}
//                                     placeholder="Semester"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     value={editedProfile.location ?? profile.userId.location}
//                                     onChange={handleChange}
//                                     placeholder="Location"
//                                 />
//                                 {/* Skills Section */}
//                                 <div className="skills-section">
//                                     <h4>Skills</h4>
//                                     <div>
//                                         {editedProfile.skills?.map((skill, index) => (
//                                             <span key={index} className="skill">
//                                                 {skill}
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleRemoveSkill(index)}
//                                                 >
//                                                     &times;
//                                                 </button>
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <input
//                                         type="text"
//                                         name="newSkill"
//                                         value={editedProfile.newSkill || ""}
//                                         onChange={handleChange}
//                                         placeholder="Add a new skill"
//                                     />
//                                     <button type="button" onClick={handleAddSkill}>
//                                         Add Skill
//                                     </button>
//                                 </div>
//                                 <button onClick={handleSaveClick}>Save</button>
//                             </div>
//                         ) : (
                         
//                             <div className="profile-infos">
//                                 <h3 className="section-title">Personal Information</h3>
//                                 <div className="profile-section">
//                                     <h4>Introduction</h4>
//                                     <p className="introduction">{profile.introduction || "No introduction provided."}</p>
//                                 </div>
//                                 <div className="profile-details">
//                                     <h5>Email: <span>{profile.userId.email}</span></h5>
//                                     <h5>Semester: <span>{profile.userId.semester}</span></h5>
//                                     <h5>Phone Number: <span>{profile.userId.phoneNumber}</span></h5>
//                                     <h5>Location: <span>{profile.userId.location}</span></h5>
//                                 </div>
//                                 <div className="skills-section">
//                                     <h5>Skills:</h5>
//                                     {profile.skills && profile.skills.length > 0 ? (
//                                         <ul className="skills-list">
//                                             {profile.skills.map((skill, index) => (
//                                                 <li key={index} className="skill-item">{skill}</li>
//                                             ))}
//                                         </ul>
//                                     ) : (
//                                         <p className="no-skills">No skills added yet.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//                 {/* {activeTab === 'cv' && (
//                     <div className="cv-info">
//                         <h3>CV Document</h3>
//                         <a href={`/path-to-cv/${profile.userId._id}`} target="_blank" rel="noopener noreferrer">Download CV</a>
//                     </div>
//                 )} */}
//                 {/* {activeTab === 'posts' && (
//                     <div className="user-posts">
//                         {posts.length > 0 ? (
//                             posts.map((post) => (
//                                 <div key={post._id} className="post">
//                                     <div className="post-header">
//                                         <img
//                                             src={`http://localhost:1000/${profile.profilePhoto || '/default-profile.png'}`}
//                                             alt="User Profile"
//                                             className="profile-photo-post"
//                                         />
//                                         <span className="username">{profile.userId.name}</span>
//                                     </div>
//                                     <div className="post-image">
//                                         <Carousel
//                                             showThumbs={false}
//                                             infiniteLoop={true}
//                                             autoPlay={true}
//                                             emulateTouch={true}
//                                         >
//                                             {post.images.map((image, idx) => (
//                                                 <a
//                                                     key={idx}
//                                                     href={`http://localhost:1000${image}`}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                 >
//                                                     <img
//                                                         className="img-post"
//                                                         src={`http://localhost:1000${image}`}
//                                                         alt={`Image ${idx + 1}`}
//                                                     />
//                                                 </a>
//                                             ))}
//                                         </Carousel>
//                                     </div>
//                                     <h4>{post.title}</h4>
//                                     <p>{post.description}</p>
//                                     <div className="post-actions">
//                                         <div>
//                                         <button className="like-btn">{post.likes.length}</button>
//                                         </div>
//                                         <div>
//                                         {post.comments.map((comment) => (
//                                             <div key={comment._id} className="comment">
//                                             <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
//                                             </div>
//                                         ))}
//                                         </div>
                                     
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No posts yet.</p>
//                         )}
//                     </div>
//                 )} */}
//                 {activeTab === 'posts' && (
//                     <div className="user-posts">
//                         {posts.length > 0 ? (
//                             posts.map((post) => (
//                                 <div key={post._id} className="post">
//                                     <div className="post-header">
//                                         <img
//                                             src={`http://localhost:1000/${profile.profilePhoto || '/default-profile.png'}`}
//                                             alt="User Profile"
//                                             className="profile-photo-post"
//                                         />
//                                         <span className="username">{profile.userId.name}</span>
//                                     </div>
//                                     <div className="post-image">
//                                         <Carousel
//                                             showThumbs={false}
//                                             infiniteLoop={true}
//                                             autoPlay={true}
//                                             emulateTouch={true}
//                                         >
//                                             {post.images.map((image, idx) => (
//                                                 <a
//                                                     key={idx}
//                                                     href={`http://localhost:1000${image}`}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                 >
//                                                     <img
//                                                         className="img-post"
//                                                         src={`http://localhost:1000${image}`}
//                                                         alt={`Image ${idx + 1}`}
//                                                     />
//                                                 </a>
//                                             ))}
//                                         </Carousel>
//                                     </div>
//                                     {editingPostId === post._id ? (
//                                         <div className="edit-post">
//                                             <input
//                                                 type="text"
//                                                 value={editedPost.title}
//                                                 onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
//                                                 placeholder="Post Title"
//                                             />
//                                             <textarea
//                                                 value={editedPost.description}
//                                                 onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
//                                                 placeholder="Post Description"
//                                             />
//                                             <button onClick={() => handleSavePost(post._id)}>Save</button>
//                                             <button onClick={() => setEditingPostId(null)}>Cancel</button>
//                                         </div>
//                                     ) : (
//                                         <>
//                                             <h4>{post.title}</h4>
//                                             <p>{post.description}</p>
//                                             <div className="post-actions">
//                                                 <button onClick={() => handleEditPost(post)}>Edit</button>
//                                                 <button onClick={() => handleDeletePost(post._id)}>Delete</button>
//                                             </div>
//                                         </>
//                                     )}
//                                     <h5 className="likess">
//                                         👍 Like ({post.likes.length})
//                                     </h5>
//                                     <div className="post-comments">
//                                         {post.comments.map((comment) => (
//                                             <div key={comment._id} className="comment">
//                                                 <strong>{comment.user?.name || 'Anonymous'}:</strong> {comment.text}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No posts yet.</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StudentProfile;
import React, { useContext, useEffect, useState } from 'react';
import './Student.css';
import registerContext from "../../../context/Register/RegisterContext";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { FiEdit, FiSave, FiTrash2, FiX, FiPlus, FiUser, FiPhone, FiMapPin, FiMail, FiAward } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

const StudentProfile = () => {
    const { profile, posts, loading, error, fetchProfile, updateProfile, fetchPosts, setPosts } = useContext(registerContext);
    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [activeTab, setActiveTab] = useState('info');
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPost, setEditedPost] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);

    const handleEditPost = (post) => {
        setEditingPostId(post._id);
        setEditedPost({ title: post.title, description: post.description });
    };

    const handleSavePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:1000/api/auth/posts/${postId}`,
                editedPost,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                }
            );

            if (response.data.success) {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? { ...post, ...editedPost } : post
                );
                setPosts(updatedPosts);
                setEditingPostId(null);
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:1000/api/auth/posts/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });

            if (response.data.success) {
                setPosts(posts.filter((post) => post._id !== postId));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEditClick = () => {
        setEditedProfile({
            ...profile,
            userId: { ...profile.userId },
            newSkill: ""
        });
        setEditing(true);
    };

    const handleSaveClick = async () => {
        const formData = new FormData();

        for (const key in editedProfile) {
            if (editedProfile[key] && key !== 'newSkill') {
                formData.append(key, editedProfile[key]);
            }
        }

        try {
            const response = await fetch('http://localhost:1000/api/auth/studentprofile', {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to update profile:', data.error);
                return;
            }

            setEditing(false);
            fetchProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleFileChange = (e) => {
        setEditedProfile((prev) => ({
            ...prev,
            profilePhoto: e.target.files[0],
        }));
    };

    const handleChange = (e) => {
        setEditedProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddSkill = () => {
        if (editedProfile.newSkill) {
            setEditedProfile({
                ...editedProfile,
                skills: [...(editedProfile.skills || []), editedProfile.newSkill],
                newSkill: "",
            });
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...(editedProfile.skills || [])];
        updatedSkills.splice(index, 1);
        setEditedProfile({
            ...editedProfile,
            skills: updatedSkills,
        });
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your profile...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <h2>Error Loading Profile</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
                Try Again
            </button>
        </div>
    );

    return (
        <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header">
                <div className="profile-photo-container">
                    <div className="photo-wrapper">
                        <img
                            src={`http://localhost:1000/${profile.profilePhoto || '/default-profile.png'}`}
                            alt="Profile"
                            className="profile-photo"
                        />
                        {editing && (
                            <label className="photo-upload-btn">
                                <input
                                    type="file"
                                    name="profilePhoto"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <span>Change Photo</span>
                            </label>
                        )}
                    </div>
                    <h2 className="profile-name">{profile.userId.name}</h2>
                    <p className="profile-title">Student • Semester {profile.userId.semester}</p>
                </div>

                <div className="profile-actions">
                    {!editing ? (
                        <button onClick={handleEditClick} className="edit-profile-btn">
                            <FiEdit className="btn-icon" /> Edit Profile
                        </button>
                    ) : (
                        <div className="edit-actions">
                            <button onClick={handleSaveClick} className="save-profile-btn">
                                <FiSave className="btn-icon" /> Save Changes
                            </button>
                            <button onClick={() => setEditing(false)} className="cancel-btn">
                                <FiX className="btn-icon" /> Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="profile-main">
                {/* Navigation Tabs */}
                <div className="profile-nav">
                    <button 
                        onClick={() => setActiveTab('info')} 
                        className={`nav-btn ${activeTab === 'info' ? 'active' : ''}`}
                    >
                        Personal Information
                    </button>
                    <button 
                        onClick={() => setActiveTab('posts')} 
                        className={`nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
                    >
                        My Posts
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'info' && (
                        <div className="info-tab">
                            {editing ? (
                                <div className="edit-form">
                                    <div className="form-section">
                                        <h3 className="section-title">Basic Information</h3>
                                        <div className="form-group">
                                            <label>Introduction</label>
                                            <textarea
                                                name="introduction"
                                                value={editedProfile.introduction || profile.introduction || ""}
                                                onChange={handleChange}
                                                placeholder="Tell us about yourself..."
                                                rows="4"
                                            />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedProfile.name ?? profile.userId.name}
                                                    onChange={handleChange}
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    value={profile.userId.email}
                                                    disabled
                                                    className="disabled-input"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={editedProfile.phoneNumber ?? profile.userId.phoneNumber}
                                                    onChange={handleChange}
                                                    placeholder="Phone number"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Semester</label>
                                                <input
                                                    type="text"
                                                    name="semester"
                                                    value={editedProfile.semester ?? profile.userId.semester}
                                                    onChange={handleChange}
                                                    placeholder="Current semester"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={editedProfile.location ?? profile.userId.location}
                                                onChange={handleChange}
                                                placeholder="Your location"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <h3 className="section-title">Skills & Expertise</h3>
                                        <div className="skills-edit">
                                            <div className="current-skills">
                                                {editedProfile.skills?.map((skill, index) => (
                                                    <span key={index} className="skill-tag">
                                                        {skill}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkill(index)}
                                                            className="remove-skill"
                                                        >
                                                            <FiX />
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="add-skill">
                                                <input
                                                    type="text"
                                                    name="newSkill"
                                                    value={editedProfile.newSkill || ""}
                                                    onChange={handleChange}
                                                    placeholder="Add a new skill"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={handleAddSkill}
                                                    className="add-skill-btn"
                                                >
                                                    <FiPlus /> Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="profile-details">
                                    <div className="detail-section">
                                        <h3 className="section-title">About Me</h3>
                                        <p className="introduction">
                                            {profile.introduction || "No introduction provided yet."}
                                        </p>
                                    </div>

                                    <div className="detail-section">
                                        <h3 className="section-title">Personal Details</h3>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <div className="detail-icon">
                                                    <FiUser />
                                                </div>
                                                <div>
                                                    <h4>Full Name</h4>
                                                    <p>{profile.userId.name}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon">
                                                    <FiMail />
                                                </div>
                                                <div>
                                                    <h4>Email</h4>
                                                    <p>{profile.userId.email}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon">
                                                    <FiPhone />
                                                </div>
                                                <div>
                                                    <h4>Phone</h4>
                                                    <p>{profile.userId.phoneNumber || "Not provided"}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon">
                                                    <FaGraduationCap />
                                                </div>
                                                <div>
                                                    <h4>Semester</h4>
                                                    <p>{profile.userId.semester}</p>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <div className="detail-icon">
                                                    <FiMapPin />
                                                </div>
                                                <div>
                                                    <h4>Location</h4>
                                                    <p>{profile.userId.location || "Not provided"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h3 className="section-title">Skills & Expertise</h3>
                                        {profile.skills && profile.skills.length > 0 ? (
                                            <div className="skills-container">
                                                {profile.skills.map((skill, index) => (
                                                    <span key={index} className="skill-badge">
                                                        <FiAward className="skill-icon" /> {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-skills">No skills added yet.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'posts' && (
                        <div className="posts-tab">
                            <div className="posts-header">
                                <h3>My Posts</h3>
                                <p className="posts-count">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
                            </div>

                            {posts.length > 0 ? (
                                <div className="posts-grid">
                                    {posts.map((post) => (
                                        <div key={post._id} className="post-card">
                                            <div className="post-header">
                                                <div className="post-author">
                                                    <img
                                                        src={`http://localhost:1000/${profile.profilePhoto || '/default-profile.png'}`}
                                                        alt="User"
                                                        className="author-photo"
                                                    />
                                                    <span className="author-name">{profile.userId.name}</span>
                                                </div>
                                                <div className="post-actions">
                                                    {editingPostId === post._id ? (
                                                        <>
                                                            <button 
                                                                onClick={() => handleSavePost(post._id)}
                                                                className="action-btn save-btn"
                                                            >
                                                                <FiSave /> Save
                                                            </button>
                                                            <button 
                                                                onClick={() => setEditingPostId(null)}
                                                                className="action-btn cancel-btn"
                                                            >
                                                                <FiX /> Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button 
                                                                onClick={() => handleEditPost(post)}
                                                                className="action-btn edit-btn"
                                                            >
                                                                <FiEdit /> Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeletePost(post._id)}
                                                                className="action-btn delete-btn"
                                                            >
                                                                <FiTrash2 /> Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {editingPostId === post._id ? (
                                                <div className="post-edit-form">
                                                    <input
                                                        type="text"
                                                        value={editedPost.title}
                                                        onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                                                        placeholder="Post Title"
                                                        className="post-title-input"
                                                    />
                                                    <textarea
                                                        value={editedPost.description}
                                                        onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
                                                        placeholder="Post Description"
                                                        className="post-desc-input"
                                                        rows="4"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="post-images">
                                                        <Carousel
                                                            showThumbs={false}
                                                            infiniteLoop={true}
                                                            autoPlay={true}
                                                            emulateTouch={true}
                                                            showStatus={false}
                                                        >
                                                            {post.images.map((image, idx) => (
                                                                <div key={idx} className="post-image-container">
                                                                    <img
                                                                        src={`http://localhost:1000${image}`}
                                                                        alt={`Post ${idx + 1}`}
                                                                        className="post-image"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </Carousel>
                                                    </div>
                                                    <div className="post-content">
                                                        <h4 className="post-title">{post.title}</h4>
                                                        <p className="post-text">{post.description}</p>
                                                    </div>
                                                </>
                                            )}

                                            <div className="post-footer">
                                                <div className="post-stats">
                                                    <span className="likes-count">
                                                        👍 {post.likes.length} Likes
                                                    </span>
                                                    <span className="comments-count">
                                                        💬 {post.comments.length} Comments
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-posts">
                                    <h4>You haven't created any posts yet</h4>
                                    <p>Share your thoughts, projects, or questions with the community!</p>
                                    <button className="create-post-btn">
                                        Create Your First Post
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;