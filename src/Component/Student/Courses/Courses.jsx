// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Payment from "./Payment";

// // const Courses = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [selectedCourse, setSelectedCourse] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [showPayment, setShowPayment] = useState(false);

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   const fetchCourses = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
// //       setCourses(res.data.courses);
// //     } catch (err) {
// //       console.error('Error fetching courses:', err);
// //     }
// //   };

// //   const handleSelectCourse = (course) => {
// //     setSelectedCourse(course);
// //     setMessage('');
// //     setShowPayment(false);
// //   };

// //   const handleBuyCourse = () => {
// //     if (!selectedCourse) return;
    
// //     // If course is free, enroll directly
// //     if (selectedCourse.price === 0) {
// //       enrollInFreeCourse();
// //     } else {
// //       // For paid courses, show payment form immediately
// //       setShowPayment(true);
// //     }
// //   };
  
// //   const enrollInFreeCourse = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.post(
// //         `http://localhost:1000/api/course/enroll/${selectedCourse._id}`,
// //         {},
// //         { headers: { 'auth-token': localStorage.getItem('token') } }
// //       );
      
// //       setMessage('You have successfully enrolled in this free course.');
// //       setSelectedCourse(null);
// //     } catch (err) {
// //       console.error('Enrollment failed:', err.response?.data || err.message);
// //       setMessage(err.response?.data?.error || 'Failed to enroll. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePaymentSuccess = () => {
// //     setShowPayment(false);
// //     setMessage('Payment successful! You are now enrolled in this course.');
// //     setSelectedCourse(null);
// //   };

// //   const handlePaymentCancel = () => {
// //     setShowPayment(false);
// //   };

// //   return (
// //     <div className="student-course-container" style={{ display: 'flex', padding: '20px', gap: '30px' }}>
// //       <div style={{ flex: 1 }}>
// //         <h2 className="font-bold text-xl mb-4">Available Courses</h2>
// //         {courses.map((course) => (
// //           <div
// //             key={course._id}
// //             onClick={() => handleSelectCourse(course)}
// //             className="p-4 mb-4 border rounded-lg bg-white hover:shadow-md cursor-pointer"
// //           >
// //             <h3 className="text-lg font-semibold">{course.title}</h3>
// //             <p className="text-sm text-gray-600">{course.category}</p>
// //             <p className="text-sm font-semibold">{course.price > 0 ? `$${course.price}` : 'Free'}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {selectedCourse && (
// //         <div style={{ flex: 2 }} className="p-6 bg-white border rounded-lg shadow-lg">
// //           {!showPayment ? (
// //             <>
// //               <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
// //               <p className="mb-2 text-gray-700">{selectedCourse.description}</p>
// //               <p><strong>Category:</strong> {selectedCourse.category}</p>
// //               <p><strong>Duration:</strong> {selectedCourse.duration}</p>
// //               <p><strong>Price:</strong> {selectedCourse.price > 0 ? `$${selectedCourse.price}` : 'Free'}</p>

// //               <button
// //                 onClick={handleBuyCourse}
// //                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //                 disabled={loading}
// //               >
// //                 {loading ? 'Processing...' : selectedCourse.price > 0 ? 'Buy Course' : 'Enroll for Free'}
// //               </button>
// //             </>
// //           ) : (
// //             <Payment
// //               courseId={selectedCourse._id}
// //               price={selectedCourse.price}
// //               onSuccess={handlePaymentSuccess}
// //               onCancel={handlePaymentCancel}
// //             />
// //           )}

// //           {message && <div className="mt-4 text-green-600 font-semibold">{message}</div>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Courses;


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import Payment from "./Payment";
// // import './Courses.css';

// // const Courses = () => {
// //   const [courses, setCourses] = useState([]);
// //   const [selectedCourse, setSelectedCourse] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [showPayment, setShowPayment] = useState(false);

// //   useEffect(() => {
// //     fetchCourses();
// //   }, []);

// //   const fetchCourses = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
// //       setCourses(res.data.courses);
// //     } catch (err) {
// //       console.error('Error fetching courses:', err);
// //       setMessage({ text: 'Failed to load courses', type: 'error' });
// //     }
// //   };

// //   const handleSelectCourse = (course) => {
// //     setSelectedCourse(course);
// //     setMessage('');
// //     setShowPayment(false);
// //   };

// //   const handleBuyCourse = () => {
// //     if (!selectedCourse) return;
    
// //     if (selectedCourse.price === 0) {
// //       enrollInFreeCourse();
// //     } else {
// //       setShowPayment(true);
// //     }
// //   };
  
// //   const enrollInFreeCourse = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.post(
// //         `http://localhost:1000/api/course/enroll/${selectedCourse._id}`,
// //         {},
// //         { headers: { 'auth-token': localStorage.getItem('token') } }
// //       );
      
// //       setMessage({ text: 'You have successfully enrolled in this free course!', type: 'success' });
// //       setSelectedCourse(null);
// //     } catch (err) {
// //       console.error('Enrollment failed:', err);
// //       setMessage({ 
// //         text: err.response?.data?.error || 'Failed to enroll. Please try again.', 
// //         type: 'error' 
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handlePaymentSuccess = () => {
// //     setShowPayment(false);
// //     setMessage({ text: 'Payment successful! You are now enrolled in this course.', type: 'success' });
// //     setSelectedCourse(null);
// //   };

// //   const handlePaymentCancel = () => {
// //     setShowPayment(false);
// //   };

// //   return (
// //     <div className="luxury-courses">
// //       <div className="luxury-course-selection">
// //         <h2 className="luxury-selection-header">Available Courses</h2>
// //         {courses.map((course) => (
// //           <div
// //             key={course._id}
// //             onClick={() => handleSelectCourse(course)}
// //             className={`luxury-course-card ${selectedCourse?._id === course._id ? 'luxury-course-card--selected' : ''}`}
// //           >
// //             <h3 className="luxury-course-title">{course.title}</h3>
// //             <p className="luxury-course-category">{course.category}</p>
// //             <p className={`luxury-course-price ${course.price > 0 ? 'luxury-course-price--paid' : 'luxury-course-price--free'}`}>
// //               {course.price > 0 ? `$${course.price}` : 'Free'}
// //             </p>
// //           </div>
// //         ))}
// //       </div>

// //       {selectedCourse && (
// //         <div className="luxury-course-detail">
// //           {!showPayment ? (
// //             <>
// //               <h2 className="luxury-detail-title">{selectedCourse.title}</h2>
// //               <p className="luxury-detail-description">{selectedCourse.description}</p>
              
// //               <div className="luxury-detail-meta">
// //                 <span className="luxury-detail-label">Category:</span>
// //                 {selectedCourse.category}
// //               </div>
              
// //               <div className="luxury-detail-meta">
// //                 <span className="luxury-detail-label">Duration:</span>
// //                 {selectedCourse.duration}
// //               </div>
              
// //               <div className="luxury-detail-meta">
// //                 <span className="luxury-detail-label">Price:</span>
// //                 {selectedCourse.price > 0 ? `$${selectedCourse.price}` : 'Free'}
// //               </div>

// //               <button
// //                 onClick={handleBuyCourse}
// //                 className="luxury-enroll-button"
// //                 disabled={loading}
// //               >
// //                 {loading ? (
// //                   <>
// //                     <span className="luxury-spinner"></span>
// //                     Processing...
// //                   </>
// //                 ) : selectedCourse.price > 0 ? 'Enroll Now' : 'Get Free Access'}
// //               </button>
// //             </>
// //           ) : (
// //             <Payment
// //               courseId={selectedCourse._id}
// //               price={selectedCourse.price}
// //               onSuccess={handlePaymentSuccess}
// //               onCancel={handlePaymentCancel}
// //             />
// //           )}

// //           {message && (
// //             <div className={`luxury-message luxury-message--${message.type}`}>
// //               {message.text}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Courses;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Payment from "./Payment";
// import './Courses.css';

// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [showPayment, setShowPayment] = useState(false);
//   const [loadingMaterials, setLoadingMaterials] = useState(false);
  
//   // Search and filter states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [currentMaxPrice, setCurrentMaxPrice] = useState(1000);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     filterCourses();
//   }, [courses, searchTerm, minPrice, maxPrice]);

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
//       setCourses(res.data.courses || []);
//       setFilteredCourses(res.data.courses || []);
      
//       // Set max price based on actual course prices
//       if (res.data.courses?.length > 0) {
//         const prices = res.data.courses.map(c => c.price || 0);
//         const calculatedMax = Math.max(...prices);
//         setCurrentMaxPrice(calculatedMax > 0 ? calculatedMax : 1000);
//         setMaxPrice(calculatedMax > 0 ? calculatedMax : 1000);
//       }
//     } catch (err) {
//       console.error('Error fetching courses:', err);
//       setMessage({ text: 'Failed to load courses', type: 'error' });
//     }
//   };

//   const fetchCourseMaterials = async (courseId) => {
//     try {
//       setLoadingMaterials(true);
//       const res = await axios.get(`http://localhost:1000/api/course/getCourseM/${courseId}`);
//       return res.data.course?.materials || [];
//     } catch (err) {
//       console.error('Error fetching materials:', err);
//       return [];
//     } finally {
//       setLoadingMaterials(false);
//     }
//   };

//   const handleSelectCourse = async (course) => {
//     setSelectedCourse(course);
//     setMessage({ text: '', type: '' });
//     setShowPayment(false);
    
//     // Fetch materials when course is selected
//     const materials = await fetchCourseMaterials(course._id);
//     setSelectedCourse(prev => ({
//       ...prev,
//       materials: materials
//     }));
//   };

//   const handleBuyCourse = () => {
//     if (!selectedCourse) return;
    
//     if (selectedCourse.price === 0 || selectedCourse.price === '0') {
//       enrollInFreeCourse();
//     } else {
//       setShowPayment(true);
//     }
//   };
  
//   const enrollInFreeCourse = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `http://localhost:1000/api/course/enroll/${selectedCourse._id}`,
//         {},
//         { headers: { 'auth-token': localStorage.getItem('token') } }
//       );
      
//       setMessage({ text: 'You have successfully enrolled in this free course!', type: 'success' });
//       setSelectedCourse(null);
//     } catch (err) {
//       console.error('Enrollment failed:', err);
//       setMessage({ 
//         text: err.response?.data?.error || 'Failed to enroll. Please try again.', 
//         type: 'error' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePaymentSuccess = () => {
//     setShowPayment(false);
//     setMessage({ text: 'Payment successful! You are now enrolled in this course.', type: 'success' });
//     setSelectedCourse(null);
//   };

//   const handlePaymentCancel = () => {
//     setShowPayment(false);
//   };

//   const handlePriceChange = (e) => {
//     const value = Number(e.target.value) || 0;
//     if (e.target.name === 'min') {
//       setMinPrice(Math.min(value, maxPrice));
//     } else {
//       setMaxPrice(Math.max(value, minPrice));
//     }
//   };

//   const filterCourses = () => {
//     let results = [...courses];
    
//     // Apply name search filter
//     if (searchTerm) {
//       results = results.filter(course => 
//         course.title?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply price range filter
//     results = results.filter(course => {
//       const price = Number(course.price) || 0;
//       return price >= minPrice && price <= maxPrice;
//     });
    
//     setFilteredCourses(results);
//   };

//   const getFileIcon = (fileType) => {
//     if (!fileType) return '📄';
//     const type = fileType.toLowerCase();
//     if (type.includes('pdf')) return '📄';
//     if (type.includes('video')) return '🎬';
//     if (type.includes('image')) return '🖼️';
//     if (type.includes('word')) return '📝';
//     if (type.includes('zip')) return '🗄️';
//     return '📂';
//   };

//   const getFileType = (fileType) => {
//     if (!fileType) return 'File';
//     const parts = fileType.split('/');
//     return parts[parts.length - 1] || 'File';
//   };

//   return (
//     <div className="student-course-container">
//       <div className="student-course-selection">
//         <h2 className="student-course-selection-header">Available Courses</h2>
        
//         {/* Search and Filter Section */}
//         <div className="student-course-search-filter">
//           <div className="student-course-search-row">
//             <input
//               type="text"
//               placeholder="Search by course name..."
//               className="student-course-search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="student-course-search-row">
//             <div className="student-course-price-range">
//               <input
//                 type="number"
//                 name="min"
//                 className="student-course-price-input"
//                 value={minPrice}
//                 onChange={handlePriceChange}
//                 min="0"
//                 max={maxPrice}
//               />
//               <input
//                 type="range"
//                 className="student-course-range-slider"
//                 min="0"
//                 max={currentMaxPrice}
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(Number(e.target.value))}
//               />
//               <input
//                 type="number"
//                 name="max"
//                 className="student-course-price-input"
//                 value={maxPrice}
//                 onChange={handlePriceChange}
//                 min={minPrice}
//                 max={currentMaxPrice}
//               />
//               <div className="student-course-range-values">
//                 Price Range: ${minPrice} - ${maxPrice}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Course List */}
//         {filteredCourses.length > 0 ? (
//           filteredCourses.map((course) => (
//             <div
//               key={course._id}
//               onClick={() => handleSelectCourse(course)}
//               className={`student-course-card ${selectedCourse?._id === course._id ? 'student-course-card--selected' : ''}`}
//             >
//               <h3 className="student-course-card-title">{course.title || 'Untitled Course'}</h3>
//               <p className="student-course-card-category">{course.category || 'Uncategorized'}</p>
//               <p className={`student-course-card-price ${course.price > 0 ? 'student-course-card-price--paid' : 'student-course-card-price--free'}`}>
//                 {course.price > 0 ? `$${course.price}` : 'Free'}
//               </p>
//             </div>
//           ))
//         ) : (
//           <div className="student-course-message student-course-message--info">
//             No courses match your search criteria
//           </div>
//         )}
//       </div>

//       {selectedCourse && (
//         <div className="student-course-detail">
//           {!showPayment ? (
//             <>
//               <h2 className="student-course-detail-title">{selectedCourse.title}</h2>
//               <p className="student-course-detail-description">{selectedCourse.description || 'No description available'}</p>
              
//               <div className="student-course-detail-meta">
//                 <span className="student-course-detail-label">Category:</span>
//                 {selectedCourse.category || 'Not specified'}
//               </div>
              
//               <div className="student-course-detail-meta">
//                 <span className="student-course-detail-label">Duration:</span>
//                 {selectedCourse.duration || '0'} hours
//               </div>
              
//               <div className="student-course-detail-meta">
//                 <span className="student-course-detail-label">Price:</span>
//                 {selectedCourse.price > 0 ? `$${selectedCourse.price}` : 'Free'}
//               </div>

//               <button
//                 onClick={handleBuyCourse}
//                 className="student-course-enroll-button"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="student-course-spinner"></span>
//                     Processing...
//                   </>
//                 ) : selectedCourse.price > 0 ? 'Enroll Now' : 'Get Free Access'}
//               </button>

//               {/* Course Materials Section */}
//               <div className="student-course-materials-section">
//                 <div className="student-course-section-header">
//                   <h3 className="student-course-section-title">
//                     <span className="student-course-section-icon">📚</span>
//                     Course Materials
//                   </h3>
//                 </div>

//                 {loadingMaterials ? (
//                   <div className="student-course-loading-materials">
//                     <span className="student-course-spinner"></span>
//                     Loading materials...
//                   </div>
//                 ) : (
//                   <div className="student-course-materials-grid">
//                     {selectedCourse.materials?.length > 0 ? (
//                       selectedCourse.materials.map(mat => (
//                         <div key={mat._id || Math.random()} className="student-course-material-card">
//                           <div className="student-course-material-icon">
//                             {getFileIcon(mat?.type)}
//                           </div>
//                           <div className="student-course-material-info">
//                             <h4 className="student-course-material-title">{mat?.title || 'Untitled'}</h4>
//                             <div className="student-course-material-meta">
//                               <span className="student-course-material-type">
//                                 {getFileType(mat?.type)}
//                               </span>
//                               <span className="student-course-material-size">
//                                 {mat.size ? `(${Math.round(mat.size / 1024)} KB)` : ''}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="student-course-material-actions">
//                             {mat?.fileUrl && (
//                               <a 
//                                 href={`http://localhost:1000${mat.fileUrl}`} 
//                                 target="_blank" 
//                                 rel="noreferrer"
//                                 className="student-course-download-btn"
//                               >
//                                 Download
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="student-course-empty-materials">
//                         <div className="student-course-empty-icon">📭</div>
//                         <p>No materials available for this course</p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <Payment
//               courseId={selectedCourse._id}
//               price={selectedCourse.price}
//               onSuccess={handlePaymentSuccess}
//               onCancel={handlePaymentCancel}
//             />
//           )}

//           {message.text && (
//             <div className={`student-course-message student-course-message--${message.type}`}>
//               {message.text}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Courses;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from "./Payment";
import { FiSearch, FiFilter, FiDownload, FiClock, FiDollarSign, FiBook, FiCheckCircle } from 'react-icons/fi';
import { FaGraduationCap, FaStar, FaRegStar } from 'react-icons/fa';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPayment, setShowPayment] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedMaterial, setExpandedMaterial] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, minPrice, maxPrice, activeTab]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:1000/api/course/getAllCourse');
      const coursesWithRatings = (res.data.courses || []).map(course => ({
        ...course,
        rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5 for demo
        students: Math.floor(Math.random() * 500) + 100 // Random student count for demo
      }));
      setCourses(coursesWithRatings);
      setFilteredCourses(coursesWithRatings);
      
      if (coursesWithRatings.length > 0) {
        const prices = coursesWithRatings.map(c => c.price || 0);
        const calculatedMax = Math.max(...prices);
        setCurrentMaxPrice(calculatedMax > 0 ? calculatedMax : 1000);
        setMaxPrice(calculatedMax > 0 ? calculatedMax : 1000);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setMessage({ text: 'Failed to load courses', type: 'error' });
    }
  };

  const fetchCourseMaterials = async (courseId) => {
    try {
      setLoadingMaterials(true);
      const res = await axios.get(`http://localhost:1000/api/course/getCourseM/${courseId}`);
      return res.data.course?.materials || [];
    } catch (err) {
      console.error('Error fetching materials:', err);
      return [];
    } finally {
      setLoadingMaterials(false);
    }
  };

  const handleSelectCourse = async (course) => {
    setSelectedCourse(course);
    setMessage({ text: '', type: '' });
    setShowPayment(false);
    
    const materials = await fetchCourseMaterials(course._id);
    setSelectedCourse(prev => ({
      ...prev,
      materials: materials
    }));
  };

  const handleBuyCourse = () => {
    if (!selectedCourse) return;
    
    if (selectedCourse.price === 0 || selectedCourse.price === '0') {
      enrollInFreeCourse();
    } else {
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
      
      setMessage({ text: 'You have successfully enrolled in this free course!', type: 'success' });
      setSelectedCourse(null);
    } catch (err) {
      console.error('Enrollment failed:', err);
      setMessage({ 
        text: err.response?.data?.error || 'Failed to enroll. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setMessage({ text: 'Payment successful! You are now enrolled in this course.', type: 'success' });
    setSelectedCourse(null);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value) || 0;
    if (e.target.name === 'min') {
      setMinPrice(Math.min(value, maxPrice));
    } else {
      setMaxPrice(Math.max(value, minPrice));
    }
  };

  const filterCourses = () => {
    let results = [...courses];
    
    // Apply name search filter
    if (searchTerm) {
      results = results.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    results = results.filter(course => {
      const price = Number(course.price) || 0;
      return price >= minPrice && price <= maxPrice;
    });
    
    // Apply category filter
    if (activeTab !== 'all') {
      results = results.filter(course => course.category === activeTab);
    }
    
    setFilteredCourses(results);
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return '📄';
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return '📄';
    if (type.includes('video')) return '🎬';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    if (type.includes('zip')) return '🗄️';
    return '📂';
  };

  const getFileType = (fileType) => {
    if (!fileType) return 'File';
    const parts = fileType.split('/');
    return parts[parts.length - 1] || 'File';
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <FaStar key={i} className="star-filled" /> : 
        <FaRegStar key={i} className="star-empty" />
      );
    }
    return stars;
  };

  const toggleMaterialExpand = (id) => {
    setExpandedMaterial(expandedMaterial === id ? null : id);
  };

  return (
    <div className="course-app-container">
      <div className="course-header">
        <h1 className="course-main-title">Explore Our Courses</h1>
        <p className="course-subtitle">Enhance your skills with our curated selection of professional courses</p>
      </div>

      <div className="course-content-container">
        <div className="course-selection-panel">
          <div className="course-search-container">
            <div className="course-search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search courses..."
                className="course-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter />
              </button>
            </div>

            {showFilters && (
              <div className="course-filter-panel">
                <div className="price-filter">
                  <h4 className="filter-title">Price Range</h4>
                  <div className="price-inputs">
                    <div className="price-input-group">
                      <label>Min</label>
                      <input
                        type="number"
                        name="min"
                        className="price-input"
                        value={minPrice}
                        onChange={handlePriceChange}
                        min="0"
                        max={maxPrice}
                      />
                    </div>
                    <div className="price-input-group">
                      <label>Max</label>
                      <input
                        type="number"
                        name="max"
                        className="price-input"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        min={minPrice}
                        max={currentMaxPrice}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    className="price-range-slider"
                    min="0"
                    max={currentMaxPrice}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>

                <div className="category-filter">
                  <h4 className="filter-title">Categories</h4>
                  <div className="category-tabs">
                    <button 
                      className={`category-tab ${activeTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`category-tab ${activeTab === 'programming' ? 'active' : ''}`}
                      onClick={() => setActiveTab('programming')}
                    >
                      Programming
                    </button>
                    <button 
                      className={`category-tab ${activeTab === 'design' ? 'active' : ''}`}
                      onClick={() => setActiveTab('design')}
                    >
                      Design
                    </button>
                    <button 
                      className={`category-tab ${activeTab === 'business' ? 'active' : ''}`}
                      onClick={() => setActiveTab('business')}
                    >
                      Business
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="course-list">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => handleSelectCourse(course)}
                  className={`course-card ${selectedCourse?._id === course._id ? 'selected' : ''}`}
                >
                  <div className="course-card-header">
                    <div className="course-category-badge">{course.category || 'General'}</div>
                    {course.price === 0 && <div className="course-free-badge">FREE</div>}
                  </div>
                  <h3 className="course-card-title">{course.title || 'Untitled Course'}</h3>
                  <div className="course-card-meta">
                    <div className="course-rating">
                      {renderStars(course.rating)}
                      <span>({course.rating.toFixed(1)})</span>
                    </div>
                    <div className="course-students">
                      <FaGraduationCap />
                      <span>{course.students}+ students</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <div className="course-price">
                      {course.price > 0 ? (
                        <>
                          <span className="price-amount">${course.price}</span>
                          <span className="price-original">${Math.round(course.price * 1.5)}</span>
                        </>
                      ) : (
                        <span className="price-free">Free Forever</span>
                      )}
                    </div>
                    <div className="course-duration">
                      <FiClock />
                      <span>{course.duration || 0}h</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-courses-message">
                <div className="no-courses-icon">🧐</div>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {selectedCourse && (
          <div className="course-detail-panel">
            {!showPayment ? (
              <>
                <div className="course-detail-header">
                  <div className="course-detail-breadcrumbs">
                    <span>Courses</span>
                    <span>›</span>
                    <span>{selectedCourse.category || 'General'}</span>
                    <span>›</span>
                    <span>{selectedCourse.title}</span>
                  </div>
                  <h2 className="course-detail-title">{selectedCourse.title}</h2>
                  <div className="course-detail-subheader">
                    <div className="course-detail-rating">
                      {renderStars(selectedCourse.rating)}
                      <span>{selectedCourse.rating.toFixed(1)} ({selectedCourse.students} students)</span>
                    </div>
                    <div className="course-detail-meta">
                      <span><FiClock /> {selectedCourse.duration || 0} hours</span>
                      <span><FiBook /> {selectedCourse.materials?.length || 0} resources</span>
                    </div>
                  </div>
                </div>

                <div className="course-detail-content">
                  <div className="course-detail-overview">
                    <h3 className="section-title">Course Overview</h3>
                    <p className="course-description">
                      {selectedCourse.description || 'No description available for this course.'}
                    </p>
                    
                    <div className="course-highlights">
                      <h3 className="section-title">What You'll Learn</h3>
                      <ul className="highlight-list">
                        <li><FiCheckCircle /> Master key concepts in {selectedCourse.category || 'this field'}</li>
                        <li><FiCheckCircle /> Build practical, real-world projects</li>
                        <li><FiCheckCircle /> Learn from industry experts</li>
                        <li><FiCheckCircle /> Get certified upon completion</li>
                      </ul>
                    </div>
                  </div>

                  <div className="course-detail-sidebar">
                    <div className="course-purchase-card">
                      <div className="course-price-display">
                        {selectedCourse.price > 0 ? (
                          <>
                            <span className="current-price">${selectedCourse.price}</span>
                            <span className="original-price">${Math.round(selectedCourse.price * 1.5)}</span>
                            <span className="discount-badge">Save {Math.round((1 - selectedCourse.price/(selectedCourse.price * 1.5)) * 100)}%</span>
                          </>
                        ) : (
                          <span className="free-price">Free</span>
                        )}
                      </div>
                      <button
                        onClick={handleBuyCourse}
                        className="enroll-button"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="button-spinner"></span>
                            Processing...
                          </>
                        ) : selectedCourse.price > 0 ? (
                          'Enroll Now'
                        ) : (
                          'Get Free Access'
                        )}
                      </button>
                      <div className="purchase-guarantee">
                        <div className="guarantee-badge">✓</div>
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course-materials-section">
                  <h3 className="section-title">
                    <span className="section-icon">📚</span>
                    Course Materials
                  </h3>
                  
                  {loadingMaterials ? (
                    <div className="materials-loading">
                      <div className="loading-spinner"></div>
                      <p>Loading course materials...</p>
                    </div>
                  ) : (
                    <div className="materials-container">
                      {selectedCourse.materials?.length > 0 ? (
                        selectedCourse.materials.map((mat, index) => (
                          <div 
                            key={mat._id || index} 
                            className={`material-item ${expandedMaterial === (mat._id || index) ? 'expanded' : ''}`}
                          >
                            <div 
                              className="material-header"
                              onClick={() => toggleMaterialExpand(mat._id || index)}
                            >
                              <div className="material-icon">{getFileIcon(mat?.type)}</div>
                              <div className="material-info">
                                <h4 className="material-title">{mat?.title || 'Untitled Resource'}</h4>
                                <div className="material-meta">
                                  <span className="material-type">{getFileType(mat?.type)}</span>
                                  {mat.size && (
                                    <span className="material-size">{Math.round(mat.size / 1024)} KB</span>
                                  )}
                                </div>
                              </div>
                              <div className="material-actions">
                                {mat?.fileUrl && (
                                  <a 
                                    href={`http://localhost:1000${mat.fileUrl}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="download-button"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <FiDownload />
                                  </a>
                                )}
                              </div>
                            </div>
                            {expandedMaterial === (mat._id || index) && (
                              <div className="material-description">
                                {mat.description || 'No description available for this resource.'}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="no-materials">
                          <div className="no-materials-icon">📭</div>
                          <p>No materials available for this course yet</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Payment
                courseId={selectedCourse._id}
                price={selectedCourse.price}
                onSuccess={handlePaymentSuccess}
                onCancel={handlePaymentCancel}
              />
            )}

            {message.text && (
              <div className={`notification ${message.type}`}>
                {message.text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;