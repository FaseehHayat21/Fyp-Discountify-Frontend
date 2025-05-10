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
                          <span className="price-amount">PKR {course.price}</span>
                          <span className="price-original">PKR {Math.round(course.price * 1.5)}</span>
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
                            <span className="current-price">PKR {selectedCourse.price}</span>
                            <span className="original-price">PKR {Math.round(selectedCourse.price * 1.5)}</span>
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