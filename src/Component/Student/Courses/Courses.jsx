import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from "./Payment";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
      setCourses(res.data.courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setMessage('');
    setShowPayment(false);
  };

  const handleBuyCourse = () => {
    if (!selectedCourse) return;
    
    // If course is free, enroll directly
    if (selectedCourse.price === 0) {
      enrollInFreeCourse();
    } else {
      // For paid courses, show payment form immediately
      setShowPayment(true);
    }
  };
  
  const enrollInFreeCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:1000/api/course/enroll/${selectedCourse._id}`,
        {},
        { headers: { 'auth-token': localStorage.getItem('token') } }
      );
      
      setMessage('You have successfully enrolled in this free course.');
      setSelectedCourse(null);
    } catch (err) {
      console.error('Enrollment failed:', err.response?.data || err.message);
      setMessage(err.response?.data?.error || 'Failed to enroll. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setMessage('Payment successful! You are now enrolled in this course.');
    setSelectedCourse(null);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
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
            <p className="text-sm font-semibold">{course.price > 0 ? `$${course.price}` : 'Free'}</p>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div style={{ flex: 2 }} className="p-6 bg-white border rounded-lg shadow-lg">
          {!showPayment ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
              <p className="mb-2 text-gray-700">{selectedCourse.description}</p>
              <p><strong>Category:</strong> {selectedCourse.category}</p>
              <p><strong>Duration:</strong> {selectedCourse.duration}</p>
              <p><strong>Price:</strong> {selectedCourse.price > 0 ? `$${selectedCourse.price}` : 'Free'}</p>

              <button
                onClick={handleBuyCourse}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : selectedCourse.price > 0 ? 'Buy Course' : 'Enroll for Free'}
              </button>
            </>
          ) : (
            <Payment
              courseId={selectedCourse._id}
              price={selectedCourse.price}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          )}

          {message && <div className="mt-4 text-green-600 font-semibold">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default Courses;