import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
      console.log(res.data)
      setCourses(res.data.courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setMessage('');
  };

  const handleBuyCourse = async () => {
    if (!selectedCourse) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:1000/api/course/enroll/${selectedCourse._id}`,
        {},
        {
          headers: { 'auth-token': localStorage.getItem('token') }
        }
      );
      setMessage('You have successfully enrolled in this course.');
      setSelectedCourse(null);
      // Optionally trigger instructor notification on the backend
    }catch (err) {
        console.error('Enrollment failed:', err.response?.data || err.message);
        setMessage(err.response?.data?.error || 'Failed to enroll. Please try again.');
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-course-container" style={{ display: 'flex', padding: '20px', gap: '30px' }}>
      <div style={{ flex: 1 }}>
        <h2 className="font-bold text-xl mb-4">Available Courses</h2>
        {courses.map((course) => (
          <div
            key={course._id}
            onClick={() => handleSelectCourse(course)}
            className="p-4 mb-4 border rounded-lg bg-white hover:shadow-md cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.category}</p>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div style={{ flex: 2 }} className="p-6 bg-white border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
          <p className="mb-2 text-gray-700">{selectedCourse.description}</p>
          <p><strong>Category:</strong> {selectedCourse.category}</p>
          <p><strong>Duration:</strong> {selectedCourse.duration}</p>
          <p><strong>Price:</strong> ${selectedCourse.price}</p>

          <button
            onClick={handleBuyCourse}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy Course'}
          </button>

          {message && <div className="mt-4 text-green-600 font-semibold">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default Courses;
