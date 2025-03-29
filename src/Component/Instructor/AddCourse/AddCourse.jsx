// import React, { useState } from 'react';
// import axios from 'axios';
// import "./AddCourse.css"
// const AddCourse = () => {
//   const [courseData, setCourseData] = useState({
//     title: '',
//     description: '',
//     category: '',
//     duration: '',
//     price: ''
//   });
//   const [files, setFiles] = useState([]);
//   const [materialCategories, setMaterialCategories] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCourseData({ ...courseData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setFiles(newFiles);
    
//     // Initialize categories for new files
//     const newCategories = {...materialCategories};
//     newFiles.forEach(file => {
//       if (!newCategories[file.name]) {
//         newCategories[file.name] = 'Lecture'; // Default category
//       }
//     });
//     setMaterialCategories(newCategories);
//   };

//   const handleCategoryChange = (fileName, category) => {
//     setMaterialCategories({
//       ...materialCategories,
//       [fileName]: category
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();
      
//       // Append course data
//       Object.entries(courseData).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
      
//       // Append files and their categories
//       files.forEach(file => {
//         formData.append('materials', file);
//         formData.append(`materialCategories[${file.name}]`, materialCategories[file.name]);
//       });

//       const response = await axios.post('http://localhost:1000/api/course/create', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'auth-token': localStorage.getItem('token')
//         }
//       });

//       alert('Course created successfully!');
//       // Reset form or redirect
//       setCourseData({
//         title: '',
//         description: '',
//         category: '',
//         duration: '',
//         price: ''
//       });
//       setFiles([]);
//       setMaterialCategories({});

//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to create course');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-course-container">
//     <h1 className="add-course-title">Create New Course</h1>
  
//     {error && <div className="add-course-error">{error}</div>}
  
//     <form onSubmit={handleSubmit} className="add-course-form">
//       <div className="add-course-grid">
//         <div>
//           <label className="add-course-label">Course Title*</label>
//           <input
//             type="text"
//             name="title"
//             value={courseData.title}
//             onChange={handleInputChange}
//             className="add-course-input"
//             required
//           />
//         </div>
//         <div>
//           <label className="add-course-label">Category*</label>
//           <input
//             type="text"
//             name="category"
//             value={courseData.category}
//             onChange={handleInputChange}
//             className="add-course-input"
//             required
//           />
//         </div>
//       </div>
  
//       <div>
//         <label className="add-course-label">Description*</label>
//         <textarea
//           name="description"
//           value={courseData.description}
//           onChange={handleInputChange}
//           className="add-course-textarea"
//           rows="4"
//           required
//         />
//       </div>
  
//       <div className="add-course-grid">
//         <div>
//           <label className="add-course-label">Duration*</label>
//           <input
//             type="text"
//             name="duration"
//             value={courseData.duration}
//             onChange={handleInputChange}
//             className="add-course-input"
//             required
//           />
//         </div>
//         <div>
//           <label className="add-course-label">Price (USD)</label>
//           <input
//             type="number"
//             name="price"
//             value={courseData.price}
//             onChange={handleInputChange}
//             className="add-course-input"
//             step="0.01"
//             min="0"
//           />
//         </div>
//       </div>
  
//       <div>
//         <label className="add-course-label">Course Materials (Max 10 files)</label>
//         <input
//           type="file"
//           name="materials"
//           onChange={handleFileChange}
//           className="add-course-input"
//           multiple
//           accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4"
//         />
//       </div>
  
//       {files.length > 0 && (
//         <div className="add-course-materials">
//           <h3>Material Categories</h3>
//           {files.map((file, index) => (
//             <div key={index} className="add-course-material-item">
//               <span className="add-course-material-filename">{file.name}</span>
//               <select
//                 value={materialCategories[file.name] || 'Lecture'}
//                 onChange={(e) => handleCategoryChange(file.name, e.target.value)}
//                 className="add-course-select"
//               >
//                 <option value="Lecture">Lecture</option>
//                 <option value="Assignment">Assignment</option>
//                 <option value="Reading">Reading</option>
//                 <option value="Video">Video</option>
//                 <option value="Quiz">Quiz</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           ))}
//         </div>
//       )}
  
//       <button
//         type="submit"
//         disabled={loading}
//         className="add-course-submit-btn"
//       >
//         {loading ? 'Creating...' : 'Create Course'}
//       </button>
//     </form>
//   </div>
//   );
// };

// export default AddCourse;


import React, { useState } from 'react';
import axios from 'axios';
import "./AddCourse.css";

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    price: ''
  });
  const [files, setFiles] = useState([]);
  const [materialCategories, setMaterialCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
    
    const newCategories = {...materialCategories};
    newFiles.forEach(file => {
      if (!newCategories[file.name]) {
        newCategories[file.name] = 'Lecture';
      }
    });
    setMaterialCategories(newCategories);
  };

  const handleCategoryChange = (fileName, category) => {
    setMaterialCategories({
      ...materialCategories,
      [fileName]: category
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      files.forEach(file => {
        formData.append('materials', file);
        formData.append(`materialCategories[${file.name}]`, materialCategories[file.name]);
      });

      const response = await axios.post('http://localhost:1000/api/course/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token')
        }
      });

      alert('Course created successfully!');
      setCourseData({
        title: '',
        description: '',
        category: '',
        duration: '',
        price: ''
      });
      setFiles([]);
      setMaterialCategories({});

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="luxury-course-container">
      <div className="luxury-header">
        <h1 className="luxury-title">Create New Course</h1>
        <div className="luxury-divider"></div>
      </div>
  
      {error && <div className="luxury-error-alert">{error}</div>}
  
      <form onSubmit={handleSubmit} className="luxury-form">
        <div className="luxury-form-grid">
          <div className="luxury-input-group">
            <label className="luxury-label">Course Title*</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="luxury-input"
              required
              placeholder="Enter course title"
            />
          </div>
          
          <div className="luxury-input-group">
            <label className="luxury-label">Category*</label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              className="luxury-input"
              required
              placeholder="e.g., Programming, Design"
            />
          </div>
        </div>
  
        <div className="luxury-input-group">
          <label className="luxury-label">Description*</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="luxury-textarea"
            rows="5"
            required
            placeholder="Describe your course in detail..."
          />
        </div>
  
        <div className="luxury-form-grid">
          <div className="luxury-input-group">
            <label className="luxury-label">Duration*</label>
            <input
              type="text"
              name="duration"
              value={courseData.duration}
              onChange={handleInputChange}
              className="luxury-input"
              required
              placeholder="e.g., 4 weeks, 30 hours"
            />
          </div>
          
          <div className="luxury-input-group">
            <label className="luxury-label">Price (Pkr)</label>
            <div className="luxury-price-input">
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                className="luxury-input"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
  
        <div className="luxury-input-group">
          <label className="luxury-label">Course Materials</label>
          <div className="luxury-file-upload">
            <label className="luxury-file-label">
              <input
                type="file"
                name="materials"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4"
              />
              <span className="luxury-file-button">Choose Files</span>
              <span className="luxury-file-text">
                {files.length > 0 ? `${files.length} files selected` : 'Max 10 files (PDF, DOC, PPT, Images, Videos)'}
              </span>
            </label>
          </div>
        </div>
  
        {files.length > 0 && (
          <div className="luxury-materials-section">
            <h3 className="luxury-materials-title">Material Categories</h3>
            <div className="luxury-materials-list">
              {files.map((file, index) => (
                <div key={index} className="luxury-material-item">
                  <div className="luxury-material-info">
                    <span className="luxury-material-icon">
                      {file.type.includes('pdf') ? '📄' : 
                       file.type.includes('video') ? '🎬' : 
                       file.type.includes('image') ? '🖼️' : '📂'}
                    </span>
                    <span className="luxury-material-name">{file.name}</span>
                  </div>
                  <select
                    value={materialCategories[file.name] || 'Lecture'}
                    onChange={(e) => handleCategoryChange(file.name, e.target.value)}
                    className="luxury-select"
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Reading">Reading</option>
                    <option value="Video">Video</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
  
        <button
          type="submit"
          disabled={loading}
          className="luxury-submit-button"
        >
          {loading ? (
            <>
              <span className="luxury-spinner"></span>
              Creating...
            </>
          ) : (
            'Create Premium Course'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;