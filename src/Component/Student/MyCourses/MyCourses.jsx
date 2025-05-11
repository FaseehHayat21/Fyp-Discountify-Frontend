
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiDownload, FiChevronDown, FiChevronUp,
  FiArrowLeft, FiFile, FiVideo, FiImage,
  FiFileText, FiBook
} from 'react-icons/fi';
import './MyCourses.css';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [expandedMaterial, setExpandedMaterial] = useState(null);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:1000/api/course/enrolled', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setEnrolledCourses(res.data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = async (course) => {
    setSelectedCourse(null);
    try {
      setLoadingMaterials(true);
      const res = await axios.get(`http://localhost:1000/api/course/getCourseM/${course._id}`);
      const materials = res.data.course?.materials || [];
      setSelectedCourse({ ...course, materials });
    } catch (err) {
      console.error('Error loading materials:', err);
    } finally {
      setLoadingMaterials(false);
    }
  };

  const toggleMaterialExpand = (id) => {
    setExpandedMaterial(expandedMaterial === id ? null : id);
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return <FiFile className="mc-file-icon" />;
    const type = fileType.toLowerCase();
    if (type.includes('video')) return <FiVideo className="mc-file-icon" />;
    if (type.includes('image')) return <FiImage className="mc-file-icon" />;
    if (type.includes('pdf')) return <FiFileText className="mc-file-icon" />;
    if (type.includes('ppt') || type.includes('powerpoint')) return <FiFileText className="mc-file-icon" />;
    return <FiFile className="mc-file-icon" />;
  };

  const renderFilePreview = (material) => {
    if (!material.fileUrl) return null;
    const fileType = material.type?.toLowerCase() || '';
    const fileUrl = `http://localhost:1000${material.fileUrl}`;

    if (fileType.includes('video')) {
      return (
        <div className="mc-file-preview mc-video-preview">
          <video controls>
            <source src={fileUrl} type={material.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (fileType.includes('image')) {
      return (
        <div className="mc-file-preview mc-image-preview">
          <img src={fileUrl} alt={material.title} />
        </div>
      );
    }

    if (fileType.includes('pdf')) {
      return (
        <div className="mc-file-preview mc-pdf-preview">
          <iframe
            src={fileUrl}
            title={material.title}
            style={{ width: '100%', height: '500px', border: 'none' }}
          ></iframe>
        </div>
      );
    }

    if (fileType.includes('ppt') || fileType.includes('powerpoint')) {
      return (
        <div className="mc-file-preview mc-generic-preview">
          <p>Presentation preview not supported locally. Please download to view.</p>
          <a href={fileUrl} download className="mc-download-link">
            <FiDownload /> Download
          </a>
        </div>
      );
    }

    return (
      <div className="mc-file-preview mc-generic-preview">
        <p>Preview not available. Please download to view.</p>
        <a href={fileUrl} download className="mc-download-link">
          <FiDownload /> Download
        </a>
      </div>
    );
  };

  return (
    <div className="mc-container">
      {!selectedCourse ? (
        <div className="mc-list-view">
          <h1 className="mc-title">My Learning Journey</h1>

          {loading ? (
            <div className="mc-loading-spinner"></div>
          ) : enrolledCourses.length > 0 ? (
            <div className="mc-course-grid">
              {enrolledCourses.map((course) => (
                <div key={course._id} className="mc-course-card" onClick={() => handleCourseSelect(course)}>
                  <div className="mc-thumbnail">
                    {course.thumbnail ? (
                      <img src={`http://localhost:1000${course.thumbnail}`} alt={course.title} />
                    ) : (
                      <div className="mc-thumbnail-placeholder"><FiBook /></div>
                    )}
                  </div>
                  <div className="mc-course-content">
                    <h3>{course.title}</h3>
                    <p className="mc-course-category">{course.category}</p>
                    <div className="mc-course-meta">
                      <span>{course.materialsCount || 0} Materials</span>
                      <span>{course.duration || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mc-empty-state">
              <FiBook className="mc-empty-icon" />
              <h3>No Enrollments Yet</h3>
              <p>Browse available courses and start learning</p>
              <button className="mc-explore-btn">Explore Courses</button>
            </div>
          )}
        </div>
      ) : (
        <div className="mc-detail-view">
          <button className="mc-back-btn" onClick={() => setSelectedCourse(null)}>
            <FiArrowLeft /> Back to Courses
          </button>

          <div className="mc-course-header">
            <h1>{selectedCourse.title}</h1>
            <p className="mc-course-description">{selectedCourse.description}</p>
            <div className="mc-course-meta">
              <span>{selectedCourse.category}</span>
              <span>{selectedCourse.materials.length} Materials</span>
              <span>{selectedCourse.duration || 'Self-paced'}</span>
            </div>
          </div>

          <div className="mc-materials-section">
            <h2 className="mc-section-title">Learning Materials</h2>
            {loadingMaterials ? (
              <div className="mc-loading-spinner"></div>
            ) : selectedCourse.materials.length > 0 ? (
              <div className="mc-materials-list">
                {selectedCourse.materials.map((material, index) => (
                  <div
                    key={material._id || index}
                    className={`mc-material-card ${expandedMaterial === (material._id || index) ? 'expanded' : ''}`}
                  >
                    <div className="mc-material-header" onClick={() => toggleMaterialExpand(material._id || index)}>
                      {getFileIcon(material.type)}
                      <div className="mc-material-info">
                        <h3>{material.title}</h3>
                        <div className="mc-material-meta">
                          <span>{material.type || 'File'}</span>
                          {material.duration && <span>{material.duration}</span>}
                        </div>
                      </div>
                      <div className="mc-material-actions">
                        {material.fileUrl && (
                          <a
                            href={`http://localhost:1000${material.fileUrl}`}
                            download
                            className="mc-download-btn"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiDownload />
                          </a>
                        )}
                        <button className="mc-expand-btn">
                          {expandedMaterial === (material._id || index) ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </div>
                    </div>

                    {expandedMaterial === (material._id || index) && (
                      <div className="mc-material-content">
                        <p className="mc-material-description">{material.description || 'No description provided.'}</p>
                        {renderFilePreview(material)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mc-empty-materials">
                <FiFile className="mc-empty-icon" />
                <p>No materials available yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
