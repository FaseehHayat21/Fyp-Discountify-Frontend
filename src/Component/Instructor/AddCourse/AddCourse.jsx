import React, { useState } from 'react';
import axios from 'axios';

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
    
    // Initialize categories for new files
    const newCategories = {...materialCategories};
    newFiles.forEach(file => {
      if (!newCategories[file.name]) {
        newCategories[file.name] = 'Lecture'; // Default category
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
      
      // Append course data
      Object.entries(courseData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Append files and their categories
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
      // Reset form or redirect
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Course Title*</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Category*</label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Description*</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Duration*</label>
            <input
              type="text"
              name="duration"
              value={courseData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Course Materials (Max 10 files)</label>
          <input
            type="file"
            name="materials"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4"
          />
        </div>

        {files.length > 0 && (
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Material Categories</h3>
            {files.map((file, index) => (
              <div key={index} className="mb-2">
                <span className="mr-2">{file.name}</span>
                <select
                  value={materialCategories[file.name] || 'Lecture'}
                  onChange={(e) => handleCategoryChange(file.name, e.target.value)}
                  className="p-1 border rounded"
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
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;