import React, { useContext, useState } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import registerContext from "../../context/Register/RegisterContext";

const RegistrationForm = () => {
  
  const navigate = useNavigate();
  const context = useContext(registerContext);
  const { userType, setUserType, registerUser } = context;

  // Form data structure adjusted for Student and Vendor
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    semester: '',
    location: '',
    address: '',
    city: '',
    companyName: '',
    companyAddress: '',
  });

  const loginPage = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop form submission
    }

    // Call the registerUser function from the context
    registerUser(formData);
  };

  return (
    <div className="registration-container">
      <div className="left-section">
        <div className="welcome-message">
          <div className="rocket-icon">🚀</div>
          <h2>Welcome</h2>
          <p>The world full of Features</p>
          <button className="login-button-r" onClick={loginPage}>Login</button>
        </div>
      </div>
      <div className="right-section">
        <div className="user-type-toggle">
          <button
            className={userType === 'Student' ? 'active' : ''}
            onClick={() => setUserType('Student')}>
            Student
          </button>
          <button
            className={userType === 'Vendor' ? 'active' : ''}
            onClick={() => setUserType('Vendor')}>
            Vendor
          </button>
        </div>
        <h2>Apply as a {userType}</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name *"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Your Phone *"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="password"
              name="password"
              placeholder="Password *"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          {userType === 'Student' && (
            <>
              <div className="form-row">
                <input
                  type="text"
                  name="semester"
                  placeholder="Semester *"
                  required
                  value={formData.semester}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location *"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {userType === 'Vendor' && (
            <>
              <div className="form-row">
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name *"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address *"
                  required
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
