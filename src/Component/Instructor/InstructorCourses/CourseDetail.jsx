import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/course/getCourse/:courseId/${courseId}`, {
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

  const downloadMaterial = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  if (loading) return <div className="text-center py-8">Loading course details...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/instructor/courses" 
          className="text-blue-500 hover:text-blue-700"
        >
          &larr; Back to Courses
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-6">
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

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{course.description}</p>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Course Materials</h2>
            
            {course.materials.length === 0 ? (
              <p className="text-gray-500">No materials added yet</p>
            ) : (
              <div className="space-y-4">
                {course.materials.map(material => (
                  <div 
                    key={material._id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => downloadMaterial(material.fileUrl)}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">
                        {material.type.includes('pdf') ? '📄' : 
                         material.type.includes('video') ? '🎬' : 
                         material.type.includes('image') ? '🖼️' : '📂'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-medium">{material.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-gray-500">{material.type}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {material.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <Link
                to={`/instructor/courses/${courseId}/add-materials`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add More Materials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;