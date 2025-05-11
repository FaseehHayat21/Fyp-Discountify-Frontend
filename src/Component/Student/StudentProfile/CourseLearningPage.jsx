import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiBook, FiChevronLeft, FiChevronRight, FiCheck, FiPlay, FiDownload } from 'react-icons/fi';
import './CourseLearningPage.css';

const CourseLearningPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:1000/api/courses/${courseId}`, {
                    headers: {
                        'auth-token': token
                    }
                });
                setCourse(response.data.course);
                setActiveLesson(response.data.course.lessons[0]);
                setCompletedLessons(response.data.completedLessons || []);
                setProgress(response.data.progress || 0);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load course');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const markLessonComplete = async (lessonId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:1000/api/courses/${courseId}/complete`, 
                { lessonId }, 
                { headers: { 'auth-token': token } }
            );
            
            if (!completedLessons.includes(lessonId)) {
                setCompletedLessons([...completedLessons, lessonId]);
                const newProgress = ((completedLessons.length + 1) / course.lessons.length) * 100;
                setProgress(Math.round(newProgress));
            }
        } catch (err) {
            console.error('Error marking lesson complete:', err);
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading course...</p>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <h2>Error Loading Course</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/student/courses')} className="back-btn">
                Back to My Courses
            </button>
        </div>
    );

    return (
        <div className="course-learning-container">
            <div className="course-header">
                <button onClick={() => navigate('/student/courses')} className="back-button">
                    <FiChevronLeft /> Back to Courses
                </button>
                <h1>{course.title}</h1>
                <div className="course-progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="progress-text">{progress}% Complete</span>
                </div>
            </div>

            <div className="course-content">
                <div className="lessons-sidebar">
                    <div className="sidebar-header">
                        <h3>Course Content</h3>
                        <span>{completedLessons.length} of {course.lessons.length} lessons completed</span>
                    </div>
                    <div className="lessons-list">
                        {course.lessons.map((lesson, index) => (
                            <div 
                                key={lesson._id}
                                className={`lesson-item ${activeLesson._id === lesson._id ? 'active' : ''}`}
                                onClick={() => setActiveLesson(lesson)}
                            >
                                <div className="lesson-number">{index + 1}</div>
                                <div className="lesson-info">
                                    <h4>{lesson.title}</h4>
                                    <p>{lesson.duration} min</p>
                                </div>
                                {completedLessons.includes(lesson._id) ? (
                                    <div className="lesson-completed">
                                        <FiCheck />
                                    </div>
                                ) : (
                                    <div className="lesson-play">
                                        <FiPlay />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lesson-content">
                    <div className="lesson-video">
                        <iframe
                            src={activeLesson.videoUrl}
                            title={activeLesson.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="lesson-details">
                        <h2>{activeLesson.title}</h2>
                        <p className="lesson-description">{activeLesson.description}</p>
                        
                        {activeLesson.materials && activeLesson.materials.length > 0 && (
                            <div className="lesson-materials">
                                <h3>Lesson Materials</h3>
                                <ul>
                                    {activeLesson.materials.map((material, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={`http://localhost:1000/${material.filePath}`} 
                                                download
                                                className="material-item"
                                            >
                                                <FiDownload /> {material.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <button 
                            onClick={() => markLessonComplete(activeLesson._id)}
                            disabled={completedLessons.includes(activeLesson._id)}
                            className={`complete-btn ${completedLessons.includes(activeLesson._id) ? 'completed' : ''}`}
                        >
                            {completedLessons.includes(activeLesson._id) ? (
                                <>
                                    <FiCheck /> Lesson Completed
                                </>
                            ) : (
                                'Mark as Complete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseLearningPage;