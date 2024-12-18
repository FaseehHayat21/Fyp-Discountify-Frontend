import React, { useState, useEffect } from 'react';
import './StudentProfiles.css';

const StudentProfiles = () => {
    const [students, setStudents] = useState([]); // Store the list of students
    const [filteredStudents, setFilteredStudents] = useState([]); // Filtered list based on search
    const [searchQuery, setSearchQuery] = useState(''); // Search input value

    useEffect(() => {
        // Fetch students when component mounts
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:1000/api/auth/studentprofiles'); // Replace with your API endpoint
                const data = await response.json(); // Parse JSON response
                setStudents(data); // Set students data
                setFilteredStudents(data); // Initialize the filtered list
            } catch (error) {
                console.error('Error fetching student profiles:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter students based on search query
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query)
        );
        setFilteredStudents(filtered);
    };

    const handleChatRequest = async (receiverId) => {
        try {
            const senderId = "CURRENT_USER_ID"; // Replace with actual logged-in user ID
            const response = await fetch('http://localhost:1000/api/chat-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senderId, receiverId }),
            });
            if (response.ok) {
                alert('Chat request sent successfully!');
            } else {
                alert('Failed to send chat request.');
            }
        } catch (error) {
            console.error('Error sending chat request:', error);
            alert('Failed to send chat request.');
        }
    };

    return (
        <div className="student-profiles-container">
            <h2>Student Profiles</h2>
            <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
            />
            <div className="student-profiles-list">
                {filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <div key={student.id} className="student-card">
                            {/* Left Side - Profile Photo */}
                            <div className="student-photo">
                                <img
                                    src={student.profilePhoto || 'https://via.placeholder.com/100'}
                                    alt={`${student.name}'s profile`}
                                />
                            </div>

                            {/* Middle - Profile Details */}
                            <div className="student-details">
                                <h3>{student.name}</h3>
                                <p><strong>Semester:</strong> {student.semester}</p>
                                <p><strong>Location:</strong> {student.location}</p>
                                <p>{student.introduction || 'No introduction provided.'}</p>
                                <p><strong>Skills:</strong> {student.skills && student.skills.length > 0 ? student.skills.join(', ') : 'No skills listed.'}</p>
                            </div>

                            {/* Right Side - Request Button */}
                            <div className="student-chat-button">
                                <button onClick={() => handleChatRequest(student.id)}>Request Chat</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No students found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentProfiles;
