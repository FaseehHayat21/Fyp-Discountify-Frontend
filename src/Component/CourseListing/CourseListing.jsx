import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseListing = () => {
    const [studentName, setStudentName] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecommendations = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/recommendations',
                { student_name: studentName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('API Response:', response.data); // Logs API response
            // Update recommendations state
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error.response?.data || error.message);
        }
    };

    // Monitor changes to recommendations state
    useEffect(() => {
        console.log('Updated Recommendations state:', recommendations); // Logs when recommendations change
    }, [recommendations]);

    return (
        <div>
            <h1>Course Recommendations</h1>
            <input
                type="text"
                placeholder="Enter Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
            />
            <button onClick={fetchRecommendations}>Get Recommendations</button>

            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((rec, index) => (
                        <li key={rec._id || index}>
                            <strong>{rec.course_title}</strong> - {rec.level} 
                            <span> ({rec.similarity_score ? rec.similarity_score.toFixed(2) : 'N/A'})</span>
                            <br />
                            <a href={rec.url} target="_blank" rel="noopener noreferrer">
                                View Course
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available</p>
            )}
        </div>
    );
};

export default CourseListing;
  