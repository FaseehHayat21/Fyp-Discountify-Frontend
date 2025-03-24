import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InstructorCourseManager = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [materialCategories, setMaterialCategories] = useState({});
  const [isAddingMaterials, setIsAddingMaterials] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCourse(response.data.course);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);

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

  const handleAddMaterials = async (e) => {
    e.preventDefault();
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      
      // Append files and their categories
      files.forEach(file => {
        formData.append('materials', file);
        formData.append(`materialCategories[${file.name}]`, materialCategories[file.name]);
      });

      const response = await axios.post(`/api/courses/${courseId}/materials`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      // Update local course state with new materials
      setCourse({
        ...course,
        materials: [...course.materials, ...response.data.materials]
      });
      
      // Reset form
      setFiles([]);
      setMaterialCategories({});
      setIsAddingMaterials(false);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add materials');
    } finally {
      setUploadProgress(0);
    }
  };

  const downloadMaterial = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('video')) return '🎬';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word')) return '📝';
    if (type.includes('powerpoint')) return '📊';
    return '📂';
  };

  if (loading) return <div className="text-center py-8">Loading course details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {course.category}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              {course.duration}
            </span>
            {course.price > 0 && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                ${course.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
          </div>

          {/* Materials Section */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Materials</h2>
              <button
                onClick={() => setIsAddingMaterials(!isAddingMaterials)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {isAddingMaterials ? 'Cancel' : 'Add Materials'}
              </button>
            </div>

            {/* Add Materials Form */}
            {isAddingMaterials && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <form onSubmit={handleAddMaterials}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Files (Max 10)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Set Material Categories
                      </label>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center">
                            <span className="text-sm text-gray-600 mr-2 w-1/3 truncate">
                              {file.name}
                            </span>
                            <select
                              value={materialCategories[file.name] || 'Lecture'}
                              onChange={(e) => handleCategoryChange(file.name, e.target.value)}
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
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

                  {uploadProgress > 0 && (
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={files.length === 0 || uploadProgress > 0}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-green-300"
                  >
                    {uploadProgress > 0 ? 'Uploading...' : 'Upload Materials'}
                  </button>
                </form>
              </div>
            )}

            {/* Materials List */}
            {course.materials.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <p className="text-gray-500">No materials added yet</p>
                <button
                  onClick={() => setIsAddingMaterials(true)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Materials Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {course.materials.map(material => (
                  <div 
                    key={material._id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div 
                      className="flex items-center flex-1 cursor-pointer"
                      onClick={() => downloadMaterial(material.fileUrl)}
                    >
                      <span className="text-2xl mr-3">
                        {getFileIcon(material.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{material.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">{material.type}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {material.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseManager;