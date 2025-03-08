// src/pages/AddCourse.js
import React, { useState } from "react";
import axios from "axios";
import "./AddCourse.css"
const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    instructorId: "", // This should be fetched from the logged-in instructor's profile
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/courses", formData);
      alert("Course created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating course", error);
      alert("Failed to create course");
    }
  };

  return (
    <div className="add-course">
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default AddCourse;