// import React from 'react';
// import "./LoginAs.css";
// import { Link } from 'react-router-dom';
// import { FaUserGraduate, FaStore, FaChalkboardTeacher } from 'react-icons/fa'; // Icons for each role

// export default function LoginAs() {
//   return (
//     <div className='login-as-container gradient-canvas'>
//       <h1 className='login-as-title'>Welcome! <br /> Please Choose Your Role</h1>
//       <div className='login-as-cards'>
//         <div className='login-as-card student'>
//           <Link className='link-loginas' to="/student/Login">
//             <div className="card-icon">
//               <FaUserGraduate size={50} />
//             </div>
//             <h3>Login as a Student</h3>
//             <p>Access your student dashboard and manage your courses.</p>
//           </Link>
//         </div>
//         <div className='login-as-card vendor'>
//           <Link className='link-loginas' to="/vendor/Login">
//             <div className="card-icon">
//               <FaStore size={50} />
//             </div>
//             <h3>Login as a Vendor</h3>
//             <p>Manage your products and services with ease.</p>
//           </Link>
//         </div>
//         <div className='login-as-card instructor'>
//           <Link className='link-loginas' to="/instructor/Login">
//             <div className="card-icon">
//               <FaChalkboardTeacher size={50} />
//             </div>
//             <h3>Login as an Instructor</h3>
//             <p>Create and manage your courses and interact with students.</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaStore, FaChalkboardTeacher } from 'react-icons/fa';
import './LoginAs.css';

export default function LoginAs() {
  return (
    <div className='levish-portal'>
      <div className="particle-background">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.1
          }} />
        ))}
      </div>

      <div className="levish-content">
        <h1 className='levish-title'>
          <span className="title-gradient">Welcome to</span>
          <span className="title-main">DISCOUNTIFY :
A Student Facilitation Portal</span>
        </h1>
        
        <p className="levish-subtitle">Select your portal to access premium educational resources</p>
        
        <div className='levish-cards'>
          <div className='levish-card student'>
            <Link className='levish-link' to="/student/Login">
              <div className="card-icon">
                <FaUserGraduate size={60} />
                <div className="icon-halo"></div>
              </div>
              <h3>Student Portal</h3>
              <p>Access your personalized learning dashboard and course materials</p>
              <div className="card-glow"></div>
            </Link>
          </div>
          
          <div className='levish-card vendor'>
            <Link className='levish-link' to="/vendor/Login">
              <div className="card-icon">
                <FaStore size={60} />
                <div className="icon-halo"></div>
              </div>
              <h3>Vendor Portal</h3>
              <p>Manage your educational products and services with our premium tools</p>
              <div className="card-glow"></div>
            </Link>
          </div>
          
          <div className='levish-card instructor'>
            <Link className='levish-link' to="/instructor/Login">
              <div className="card-icon">
                <FaChalkboardTeacher size={60} />
                <div className="icon-halo"></div>
              </div>
              <h3>Instructor Portal</h3>
              <p>Create and manage courses with our professional teaching suite</p>
              <div className="card-glow"></div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="levish-footer">
        <p>DISCOUNTIFY : A Student Facilitation Portal © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}