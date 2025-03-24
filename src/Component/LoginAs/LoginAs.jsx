import React from 'react';
import "./LoginAs.css";
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaStore, FaChalkboardTeacher } from 'react-icons/fa'; // Icons for each role

export default function LoginAs() {
  return (
    <div className='login-as-container gradient-canvas'>
      <h1 className='login-as-title'>Welcome! <br /> Please Choose Your Role</h1>
      <div className='login-as-cards'>
        <div className='login-as-card student'>
          <Link className='link-loginas' to="/student/Login">
            <div className="card-icon">
              <FaUserGraduate size={50} />
            </div>
            <h3>Login as a Student</h3>
            <p>Access your student dashboard and manage your courses.</p>
          </Link>
        </div>
        <div className='login-as-card vendor'>
          <Link className='link-loginas' to="/vendor/Login">
            <div className="card-icon">
              <FaStore size={50} />
            </div>
            <h3>Login as a Vendor</h3>
            <p>Manage your products and services with ease.</p>
          </Link>
        </div>
        <div className='login-as-card instructor'>
          <Link className='link-loginas' to="/instructor/Login">
            <div className="card-icon">
              <FaChalkboardTeacher size={50} />
            </div>
            <h3>Login as an Instructor</h3>
            <p>Create and manage your courses and interact with students.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}