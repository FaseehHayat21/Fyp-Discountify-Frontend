import React, { useContext, useEffect, useState } from 'react';
import './StudentProfile.css'; // Custom CSS for styling
import registerContext from "../../context/Register/RegisterContext";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const StudentProfile = () => {
    const { profile, posts, loading, error, fetchProfile, updateProfile, fetchPosts } = useContext(registerContext);
    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});

    const [activeTab, setActiveTab] = useState('info');

    useEffect(() => {
        fetchProfile();
        fetchPosts();
    }, []);

    const handleEditClick = () => setEditing(true);

    const handleSaveClick = async () => {
        console.log(editedProfile)
        await updateProfile(editedProfile);
        setEditing(false);
        console.log("Updated Profile:", profile);
        setEditedProfile(profile); // Debugging to check if profile is updated correctly
      };
      

    const handleChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            profilePhoto: e.target.files[0],
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="profile-photo">
                    <img
                        src={profile.profilePhoto || '/default-profile.png'}
                        alt="Profile"
                        className="profile-photo-img"
                    />
                    {editing && (
                        <input
                            type="file"
                            name="profilePhoto"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    )}
                </div>
                <div className="profile-info">
                    <h2>{profile.userId.name}</h2>
                    {!editing && <button onClick={handleEditClick}>Edit Profile</button>}
                </div>
            </div>

            <div className="profile-tabs">
                <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>Personal Info</button>
                <button onClick={() => setActiveTab('cv')} className={activeTab === 'cv' ? 'active' : ''}>CV</button>
                <button onClick={() => setActiveTab('posts')} className={activeTab === 'posts' ? 'active' : ''}>Posts</button>
            </div>

            <div className="profile-content">
                {activeTab === 'info' && (
                    <div className="personal-info">
                        {editing ? (
                            <div>
                                <input
                                    type="text"
                                    name="introduction"
                                    value={editedProfile.introduction || profile.introduction}
                                    onChange={handleChange}
                                    placeholder="Introduction"
                                />
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProfile.name || profile.userId.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editedProfile.email || profile.userId.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={editedProfile.phoneNumber || profile.userId.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                                <input
                                    type="text"
                                    name="semester"
                                    value={editedProfile.semester || profile.userId.semester}
                                    onChange={handleChange}
                                    placeholder="Semester"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={editedProfile.location || profile.userId.location}
                                    onChange={handleChange}
                                    placeholder="Location"
                                />
                                <button onClick={handleSaveClick}>Save</button>
                            </div>
                        ) : (
                            <div className='Personal-Info'>
                                <h3>Personal Information</h3>
                                <h5>Email: {profile.userId.email}</h5>
                                <h5>Semester: {profile.userId.semester}</h5>
                                <h5>Phone Number: {profile.userId.phoneNumber}</h5>
                                <h5>Location: {profile.userId.location}</h5>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'cv' && (
                    <div className="cv-info">
                        <h3>CV Document</h3>
                        <a href={`/path-to-cv/${profile.userId._id}`} target="_blank" rel="noopener noreferrer">Download CV</a>
                    </div>
                )}
                {activeTab === 'posts' && (
                    <div className="user-posts">
                        <h3>User Posts</h3>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post._id} className="post">
                                    <div className="post-header">
                                        <img
                                            src={post.user.profilePhoto || '/default-profile.png'}
                                            alt="User Profile"
                                            className="profile-photo"
                                        />
                                        <span className="username">{post.user.name}</span>
                                    </div>
                                    <div className="post-image">
                                        <Carousel
                                            showThumbs={false}
                                            infiniteLoop={true}
                                            autoPlay={true}
                                            emulateTouch={true}
                                        >
                                            {post.images.map((image, idx) => (
                                                <a
                                                    key={idx}
                                                    href={`http://localhost:1000${image}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        className="img-post"
                                                        src={`http://localhost:1000${image}`}
                                                        alt={`Image ${idx + 1}`}
                                                    />
                                                </a>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <h4>{post.title}</h4>
                                    <p>{post.description}</p>
                                    <div className="post-actions">
                                        <button className="like-btn">❤️</button>
                                        <button className="comment-btn">💬</button>
                                        <button className="share-btn">📤</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;
