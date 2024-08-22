import React, { useState } from 'react';
import './RegistrationForm.css';

import { useNavigate } from 'react-router-dom';
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Employee');
  const loginPage = ()=>{
    navigate("/login");
  }
  
  return (
    <div className="registration-container">
      <div className="left-section">
        <div className="welcome-message">
          <div className="rocket-icon">🚀</div>
          <h2>Welcome</h2>
          <p>You are 30 seconds away from earning your own money!</p>
          <button className="login-button-r" onClick={loginPage}>Login</button>
        </div>
      </div>
      <div className="right-section">
        <div className="user-type-toggle">
          <button
            className={userType === 'Student' ? 'active' : ''}
            onClick={() => setUserType('Student')}
          >
            Student
          </button>
          <button
            className={userType === 'Vendor' ? 'active' : ''}
            onClick={() => setUserType('Vendor')}
          >
            Vendor
          </button>
        </div>
        <h2>Apply as a {userType}</h2>
        <form className="registration-form">
          <div className="form-row">
            <input type="text" placeholder="First Name *" required />
            <input type="email" placeholder="Your Email *" required />
           
          </div>
          <div className="form-row">
            <input type="text" placeholder="Your Phone *" required />
          </div>
          <div className="form-row">
            <input type="password" placeholder="Password *" required />
            <input type="location" placeholder="Address *" required />
           
          </div>
          <div className="form-row">
            <input type="password" placeholder="Confirm Password *" required />
            <input type="city" placeholder="City *" required />
          </div>
          

          {userType === 'Student' && (
            <>
              <div className="form-row">
                <input type="text" placeholder="Student ID *" required />
                <input type="text" placeholder="Course *" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="University *" required />
              </div>
            </>
          )}

          {userType === 'Vendor' && (
            <>
              <div className="form-row">
                <input type="text" placeholder="Company Name *" required />
                <input type="text" placeholder="Company Address *" required />
              </div>
              <div className="form-row">
                <input type="text" placeholder="VAT Number" />
                <input type="text" placeholder="Business License Number" />
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
