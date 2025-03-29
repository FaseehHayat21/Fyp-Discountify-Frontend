

import React, { useEffect, useState } from 'react';
import './InstructorCourses.css';
import axios from 'axios';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [newMaterials, setNewMaterials] = useState([]);

  const fetchCourses = async () => {
    const res = await axios.get('http://localhost:1000/api/course/getAllCourse/instructor', {
      headers: { 'auth-token': localStorage.getItem('token') }
    });
    setCourses(res.data.courses);
  };

  const fetchCourseDetail = async (id) => {
    const res = await axios.get(`http://localhost:1000/api/course/getCourse/${id}`, {
      headers: { 'auth-token': localStorage.getItem('token') }
    });
    setSelectedCourse(res.data.course);
    setForm(res.data.course);
    setEditing(false);
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:1000/api/course/editCourse/${selectedCourse._id}`, form, {
      headers: { 'auth-token': localStorage.getItem('token') }
    });
    alert('Course updated');
    fetchCourses();
    fetchCourseDetail(selectedCourse._id);
  };

  const handleMaterialUpload = async () => {
    const formData = new FormData();
    newMaterials.forEach(file => formData.append('materials', file));

    await axios.post(`http://localhost:1000/api/course/${selectedCourse._id}/materials`, formData, {
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
    alert('Materials added');
    fetchCourseDetail(selectedCourse._id);
  };

  const handleDeleteCourse = async () => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`http://localhost:1000/api/course/delete/${selectedCourse._id}`, {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      alert('Course deleted');
      setSelectedCourse(null);
      fetchCourses();
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="instructor-container">
      <div className="course-list">
        <h2>Your Courses</h2>
        {courses.map(course => (
          <div
            key={course._id}
            className={`course-item ${selectedCourse?._id === course._id ? 'selected' : ''}`}
            onClick={() => fetchCourseDetail(course._id)}
          >
            {course.title}
          </div>
        ))}
      </div>
      {selectedCourse && (
  <div className="luxury-course-detail">
    <div className="luxury-course-card">
      <div className="luxury-course-header">
        <div className="luxury-course-badge">{selectedCourse.category}</div>
        <h2 className="luxury-course-title">
          <span className="luxury-course-icon">🎓</span>
          {selectedCourse.title}
        </h2>
        <div className="luxury-course-meta">
          <span className="luxury-meta-item">
            ⏱️ {selectedCourse.duration} hours
          </span>
          <span className="luxury-meta-item">
            💰 Rs. {selectedCourse.price}
          </span>
        </div>
      </div>

      <div className="luxury-course-content">
        {editing ? (
          <div className="luxury-edit-section">
            <div className="luxury-form-group">
              <label className="luxury-label">Course Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="luxury-input"
              />
            </div>
            
            <div className="luxury-form-group">
              <label className="luxury-label">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="luxury-textarea"
                rows="5"
              />
            </div>
            
            <div className="luxury-form-grid">
              <div className="luxury-form-group">
                <label className="luxury-label">Price (Rs.)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="luxury-input"
                />
              </div>
              
              <div className="luxury-form-group">
                <label className="luxury-label">Duration (hours)</label>
                <input
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="luxury-input"
                />
              </div>
            </div>
            
            <div className="luxury-form-group">
              <label className="luxury-label">Category</label>
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="luxury-input"
              />
            </div>
          </div>
        ) : (
          <div className="luxury-course-description">
            <p className="luxury-description-text">{selectedCourse.description}</p>
            
            <div className="luxury-highlights">
              <div className="luxury-highlight-item">
                <span className="luxury-highlight-icon">📚</span>
                <span>Comprehensive Curriculum</span>
              </div>
              <div className="luxury-highlight-item">
                <span className="luxury-highlight-icon">🎯</span>
                <span>Practical Exercises</span>
              </div>
              <div className="luxury-highlight-item">
                <span className="luxury-highlight-icon">🏆</span>
                <span>Certificate of Completion</span>
              </div>
            </div>
          </div>
        )}

        <div className="luxury-action-buttons">
          {editing ? (
            <button 
              onClick={handleUpdate}
              className="luxury-save-btn"
            >
              Save Changes
            </button>
          ) : (
            <>
              <button 
                onClick={() => setEditing(true)}
                className="luxury-edit-btn"
              >
                Edit Course
              </button>
              <button 
                onClick={handleDeleteCourse}
                className="luxury-delete-btn"
              >
                Delete Course
              </button>
            </>
          )}
        </div>
      </div>

      <div className="luxury-materials-section">
        <div className="luxury-section-header">
          <h3 className="luxury-section-title">
            <span className="luxury-section-icon">📂</span>
            Course Materials
          </h3>
          <div className="luxury-upload-area">
            <input 
              type="file" 
              multiple 
              onChange={(e) => setNewMaterials([...e.target.files])}
              id="material-upload"
              className="luxury-file-input"
            />
            <label htmlFor="material-upload" className="luxury-upload-btn">
              + Add Materials
            </label>
            {newMaterials.length > 0 && (
              <button 
                onClick={handleMaterialUpload}
                className="luxury-upload-confirm"
              >
                Upload {newMaterials.length} Files
              </button>
            )}
          </div>
        </div>

        <div className="luxury-materials-grid">
          {selectedCourse.materials?.length > 0 ? (
            selectedCourse.materials.map(mat => (
              <div key={mat._id} className="luxury-material-card">
                <div className="luxury-material-icon">
                  {mat.type.includes('pdf') ? '📄' : 
                   mat.type.includes('video') ? '🎬' : 
                   mat.type.includes('image') ? '🖼️' : '📂'}
                </div>
                <div className="luxury-material-info">
                  <h4 className="luxury-material-title">{mat.title}</h4>
                  <div className="luxury-material-meta">
                    <span className="luxury-material-type">{mat.type.split('/')[1]}</span>
                    {/* <span className="luxury-material-category">{mat.category}</span> */}
                  </div>
                </div>
                <div className="luxury-material-actions">
                  <a 
                    href={`http://localhost:1000${mat.fileUrl}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="luxury-download-btn"
                  >
                    Download
                  </a>
                  <button
                    onClick={async () => {
                      if (window.confirm('Delete this material?')) {
                        try {
                          await axios.delete(`http://localhost:1000/api/course/material/${mat._id}`, {
                            headers: {
                              'auth-token': localStorage.getItem('token')
                            }
                          });
                          alert('Material deleted');
                          fetchCourseDetail(selectedCourse._id);
                        } catch (err) {
                          alert('Failed to delete material');
                        }
                      }
                    }}
                    className="luxury-delete-material-btn"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="luxury-empty-materials">
              <div className="luxury-empty-icon">📭</div>
              <p>No materials added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
      {/* {selectedCourse && (
        // <div className="course-detail">
        //   <h2>Course Detail</h2>
        //   {editing ? (
        //     <div>
        //       <input
        //         value={form.title}
        //         onChange={(e) => setForm({ ...form, title: e.target.value })}
        //       />
        //       <textarea
        //         value={form.description}
        //         onChange={(e) => setForm({ ...form, description: e.target.value })}
        //       />
        //       <button onClick={handleUpdate}>Save</button>
        //     </div>
        //   ) : (
        //     <div>
        //       <h3>{selectedCourse.title}</h3>
        //       <p>{selectedCourse.description}</p>
        //       <p><strong>Price:</strong> {selectedCourse.price}</p>
        //       <p><strong>Duration:</strong> {selectedCourse.duration}</p>
        //       <p><strong>Category:</strong> {selectedCourse.category}</p>
        //       <button onClick={() => setEditing(true)}>Edit</button>
        //       <button onClick={handleDeleteCourse} className="delete-btn">Delete</button>
        //     </div>
        //   )}

        //   <div className="materials-section">
        //     <h4>Materials</h4>
        //     <ul>
        //       {selectedCourse.materials?.map(mat => (
        //         <li key={mat._id}>
        //           <a
        //             href={`http://localhost:1000${mat.fileUrl}`}
        //             target="_blank"
        //             rel="noreferrer"
        //           >
        //             {mat.title}
        //           </a>
        //           <button
        //             className="delete-material-btn"
        //             onClick={async () => {
        //               if (window.confirm('Delete this material?')) {
        //                 try {
        //                   await axios.delete(`http://localhost:1000/api/course/material/${mat._id}`, {
        //                     headers: {
        //                       'auth-token': localStorage.getItem('token')
        //                     }
        //                   });
        //                   alert('Material deleted');
        //                   fetchCourseDetail(selectedCourse._id);
        //                 } catch (err) {
        //                   alert('Failed to delete material');
        //                   console.error(err);
        //                 }
        //               }
        //             }}
        //           >
        //             🗑️
        //           </button>
        //         </li>
        //       ))}
        //     </ul>

        //     <input type="file" multiple onChange={(e) => setNewMaterials([...e.target.files])} />
        //     <button onClick={handleMaterialUpload}>Add Materials</button>
        //   </div>
        // </div>
        <div className="course-detail">
          <div className="course-card">
            <div className="course-header">
              <h2>📘 {selectedCourse.title}</h2>
              <div className="action-buttons">
                {!editing ? (
                  <>
                    <button onClick={() => setEditing(true)} className="edit-btn">Edit</button>
                    <button onClick={handleDeleteCourse} className="delete-btn">Delete</button>
                  </>
                ) : (
                  <button onClick={handleUpdate} className="save-btn">Save Changes</button>
                )}
              </div>
            </div>

            {editing ? (
              <div className="edit-section">
                <label>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <label>Price</label>
                <input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <label>Duration</label>
                <input
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
                <label>Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
            ) : (
              <div className="course-info">
                <p><strong>Description:</strong> {selectedCourse.description}</p>
                <p><strong>Price:</strong> Rs. {selectedCourse.price}</p>
                <p><strong>Duration:</strong> {selectedCourse.duration} hours</p>
                <p><strong>Category:</strong> {selectedCourse.category}</p>
              </div>
            )}

            <div className="materials-section">
              <h4>📂 Course Materials</h4>
              <ul>
                {selectedCourse.materials?.map(mat => (
                  <li key={mat._id}>
                    <a href={`http://localhost:1000${mat.fileUrl}`} target="_blank" rel="noreferrer">
                      {mat.title}
                    </a>
                    <button
                      className="delete-material-btn"
                      onClick={async () => {
                        if (window.confirm('Delete this material?')) {
                          try {
                            await axios.delete(`http://localhost:1000/api/course/material/${mat._id}`, {
                              headers: {
                                'auth-token': localStorage.getItem('token')
                              }
                            });
                            alert('Material deleted');
                            fetchCourseDetail(selectedCourse._id);
                          } catch (err) {
                            alert('Failed to delete material');
                          }
                        }
                      }}
                    >🗑️</button>
                  </li>
                ))}
              </ul>
              <input type="file" multiple onChange={(e) => setNewMaterials([...e.target.files])} />
              <button onClick={handleMaterialUpload} className="upload-btn">Add Materials</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default InstructorCourses;
