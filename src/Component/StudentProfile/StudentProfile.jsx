import React, { useEffect, useState } from 'react';
import './StudentProfile.css'; // Custom CSS for styling

const StudentProfile = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({});
    const [activeTab, setActiveTab] = useState('info');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:1000/api/auth/studentprofile/${localStorage.getItem('userid')}`);
                if (!response.ok) {
                    // Handle different status codes
                    if (response.status === 404) {
                        console.error('Profile not found');
                    } else if (response.status === 500) {       
                        console.error('Server error');
                    } else {
                        console.error(`Unexpected error: ${response.statusText}`);
                    }
                    return;
                }
                const data = await response.json();
                setProfile(data);
                setEditedProfile(data); // Initialize edited profile with the current data
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleEditClick = () => setEditing(true);

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:1000/api/auth/studentprofile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedProfile = await response.json();
            setProfile(updatedProfile);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value,
        });
    };

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="profile-photo">
                    <img
                        src={profile.profilePhoto || '/default-profile.png'}
                        alt="Profile"
                        className="profile-photo-img"
                    />
                </div>
                <div className="profile-info">
                    <h2>{profile.userId.name}</h2>
                    <button onClick={handleEditClick}>Edit Profile</button>
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
                                    value={editedProfile.introduction}
                                    onChange={handleChange}
                                    placeholder="Introduction"
                                />
                                <button onClick={handleSaveClick}>Save</button>
                            </div>
                        ) : (
                            <div className='Personal-Info'>
                                <h3>Persnoal Information</h3>
                                <h5>Email : {profile.userId.email}</h5>
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
                        {/* Display CV content here, possibly allowing download or preview */}
                        <a href={`/path-to-cv/${userId}`} target="_blank" rel="noopener noreferrer">Download CV</a>
                        {/* Or embed a preview here */}
                    </div>
                )}
                {activeTab === 'posts' && (
                    <div className="user-posts">
                        <h3>User Posts</h3>
                        {profile.posts.length > 0 ? (
                            profile.posts.map((post) => (
                                <div key={post._id} className="post">
                                    <h4>{post.title}</h4>
                                    <p>{post.content}</p>
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
