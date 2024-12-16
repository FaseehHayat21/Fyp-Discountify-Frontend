import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CourseListing.css"
const CourseListing = () => {
    const [studentName, setStudentName] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    const fetchRecommendations = async () => {
        try {
            const responses = await fetch('http://localhost:1000/api/auth/studentprofile', {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'), // Include token
                },

            });

            const data = await responses.json();
            const response = await axios.post(
                'http://localhost:5000/api/recommendations',
                { student_name: data.name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const studentName = data.name;
            const course = await fetch(`http://localhost:1000/api/auth/recommendations/${studentName}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'), // Include token
                },

            });
            const datas = await course.json();
            console.log('API Response:', datas); // Logs API response
            // Update recommendations state
            setRecommendations(datas);
        } catch (error) {
            console.error('Error fetching recommendations:', error.response?.data || error.message);
        }
    };

    // Monitor changes to recommendations state
    useEffect(() => {
        console.log('Updated Recommendations state:', recommendations); // Logs when recommendations change
    }, [recommendations]);

     
    return (<>
    <h1 className='heading-top-routes'>Course Recommendations</h1>
    
        <div className="course-recommendations-container">
    <button
        onClick={fetchRecommendations}
        className="get-recommendations-button"
    >
        Get Recommendations
    </button>

    {recommendations.length > 0 ? (
        <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
                <li key={rec._id || index}>
                    <strong>{rec.course_title}</strong> - {rec.level} 
                    <span> ({rec.similarity_score ? rec.similarity_score.toFixed(2) : 'N/A'})</span>
                    <br />
                    <a href={rec.url} target="_blank" rel="noopener noreferrer" className="course-link">
                        View Course
                    </a>
                </li>
            ))}
        </ul>
    ) : (
        <p className="no-recommendations-message">No recommendations available</p>
    )}
</div></>

        // <div>
        //     <h1>Course Recommendations</h1>
        //     <input
        //         type="text"
        //         placeholder="Enter Student Name"
        //         value={studentName}
        //         onChange={(e) => setStudentName(e.target.value)}
        //     />
        //     <button onClick={fetchRecommendations}>Get Recommendations</button>

        //     {recommendations.length > 0 ? (
        //         <ul>
        //             {recommendations.map((rec, index) => (
        //                 <li key={rec._id || index}>
        //                     <strong>{rec.course_title}</strong> - {rec.level} 
        //                     <span> ({rec.similarity_score ? rec.similarity_score.toFixed(2) : 'N/A'})</span>
        //                     <br />
        //                     <a href={rec.url} target="_blank" rel="noopener noreferrer">
        //                         View Course
        //                     </a>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p>No recommendations available</p>
        //     )}
        // </div>
    );
};

export default CourseListing;
  