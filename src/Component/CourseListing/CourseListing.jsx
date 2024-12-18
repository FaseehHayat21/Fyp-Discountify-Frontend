// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./CourseListing.css"
// const CourseListing = () => {
//     const [studentName, setStudentName] = useState('');
//     const [recommendations, setRecommendations] = useState([]);

//     const fetchRecommendations = async () => {
//         try {
//             const responses = await fetch('http://localhost:1000/api/auth/studentprofile', {
//                 method: 'GET',
//                 headers: {
//                     'auth-token': localStorage.getItem('token'), // Include token
//                 },
                
                
//             });
            
//             if (!data.skills || data.skills.length === 0) {
//                 alert("Please add skills to your profile to receive course recommendations.");
//                 return; // Stop the function execution if no skills
//             }
//             const data = await responses.json();
//             const response = await axios.post(
//                 'http://localhost:5000/api/recommendations',
//                 { student_name: data.name },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             const studentName = data.name;
//             const course = await fetch(`http://localhost:1000/api/auth/recommendations/${studentName}`, {
//                 method: 'GET',
//                 headers: {
//                     'auth-token': localStorage.getItem('token'), // Include token
//                 },

//             });
//             const datas = await course.json();
//             console.log('API Response:', datas); // Logs API response
//             // Update recommendations state
//             setRecommendations(datas);
//         } catch (error) {
//             console.error('Error fetching recommendations:', error.response?.data || error.message);
//         }
//     };

//     // Monitor changes to recommendations state
//     useEffect(() => {
//         console.log('Updated Recommendations state:', recommendations); // Logs when recommendations change
//     }, [recommendations]);

     
//     return (<>
//     <h1 className='heading-top-routes'>Course Recommendations</h1>
    
//         <div className="course-recommendations-container">
//     <button
//         onClick={fetchRecommendations}
//         className="get-recommendations-button"
//     >
//         Get Recommendations
//     </button>

//     {recommendations.length > 0 ? (
//         <ul className="recommendations-list">
//             {recommendations.map((rec, index) => (
//                 <li key={rec._id || index}>
//                     <strong>{rec.course_title}</strong> - {rec.level} 
//                     <span> ({rec.similarity_score ? rec.similarity_score.toFixed(2) : 'N/A'})</span>
//                     <br />
//                     <a href={rec.url} target="_blank" rel="noopener noreferrer" className="course-link">
//                         View Course
//                     </a>
//                 </li>
//             ))}
//         </ul>
//     ) : (
//         <p className="no-recommendations-message">No recommendations available</p>
//     )}
// </div></>

//     );
// };

// export default CourseListing;
  


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CourseListing.css";

const CourseListing = () => {
    const [studentName, setStudentName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);  // State to track loading status

    const fetchRecommendations = async () => {
        setLoading(true);  // Set loading to true when the fetch starts

        try {
            const response = await fetch('http://localhost:1000/api/auth/studentprofile', {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'), // Include token
                },
            });

            const data = await response.json();
            const studentName = data.name;

            // Check if student has skills
            if (!data.skills || data.skills.length === 0) {
                alert("Please add skills to your profile to receive course recommendations.");
                setLoading(false);  // Set loading to false when stopping
                return; // Stop the function execution if no skills
            }

            const recommendationResponse = await axios.post(
                'http://localhost:5000/api/recommendations',
                { student_name: studentName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const courseResponse = await fetch(`http://localhost:1000/api/auth/recommendations/${studentName}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('token'), // Include token
                },
            });
            const courseData = await courseResponse.json();
            console.log('API Response:', courseData); // Logs API response

            // Update recommendations state
            setRecommendations(courseData);
        } catch (error) {
            alert(error)
            console.error('Error fetching recommendations:', error.response?.data || error.message);
        } finally {
            setLoading(false);  // Set loading to false when the fetch ends (either success or error)
        }
    };

    // Monitor changes to recommendations state
    useEffect(() => {
        console.log('Updated Recommendations state:', recommendations); // Logs when recommendations change
    }, [recommendations]);

    return (
        <>
            <h1 className='heading-top-routes'>Course Recommendations</h1>
            <div className="course-recommendations-container">
                <button onClick={fetchRecommendations} className="get-recommendations-button">
                    Get Recommendations
                </button>

                {loading && (
                    <div className="loader">Loading...</div>  // Display loader when loading is true
                )}

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
            </div>
        </>
    );
};

export default CourseListing;
