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
    category: '', 
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
    const [otp, setOtp] = useState(""); // State for OTP input
    const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
    const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status



    const handleOtpVerification = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("OTP Verified Successfully!");
        setOtpVerified(true);
        registerUser(formData); // Call registerUser after OTP verification
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      alert("Error verifying OTP. Please try again.");
    }
  };

  const sendOtp = async () => {
    try {
      const response = await fetch("http://localhost:1000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();

      if (response.ok) {
        alert("OTP sent to your email!");
        setOtpSent(true);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      alert("Error sending OTP. Please try again.");
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match!");
  //     return; // Stop form submission
  //   }
  //   console.log(formData);
  //   // Call the registerUser function from the context
  //   registerUser(formData);
  // };
      const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        console.log(formData);
        sendOtp(); // Send OTP after user submits form
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
        <h2 style={{color: "#340c35"}}>Apply as a {userType}</h2>
          {!otpSent ? (
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
            {userType === 'Vendor' && (
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Eateries">Eateries</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Accommodations">Accommodations</option>
                  <option value="Retail">Retail</option>
                </select>

            )}

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
            ) : (
              // OTP Dialog
              <div className="otp-dialog">
                <h3>Enter OTP</h3>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button onClick={handleOtpVerification}>Verify OTP</button>
              </div>
            )}
      </div>
    </div>
  );
};

export default RegistrationForm;



//////////////////////////////////////////////////////////////////'

// import React, { useContext, useState } from "react";
// import "./RegistrationForm.css";
// import { useNavigate } from "react-router-dom";
// import registerContext from "../../context/Register/RegisterContext";

// const RegistrationForm = () => {
//   const navigate = useNavigate();
//   const context = useContext(registerContext);
//   const { userType, setUserType, registerUser } = context;

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     semester: "",
//     location: "",
//     address: "",
//     city: "",
//     companyName: "",
//     companyAddress: "",
//     category: "",
//   });

//   const [otp, setOtp] = useState(""); // State for OTP input
//   const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
//   const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOtpVerification = async () => {
//     try {
//       const response = await fetch("http://localhost:1000/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email, otp }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         alert("OTP Verified Successfully!");
//         setOtpVerified(true);
//         registerUser(formData); // Call registerUser after OTP verification
//       } else {
//         alert(data.error || "Invalid OTP");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error.message);
//       alert("Error verifying OTP. Please try again.");
//     }
//   };

//   const sendOtp = async () => {
//     try {
//       const response = await fetch("http://localhost:1000/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email }),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         alert("OTP sent to your email!");
//         setOtpSent(true);
//       } else {
//         alert(data.error || "Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error.message);
//       alert("Error sending OTP. Please try again.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     sendOtp(); // Send OTP after user submits form
//   };

//   return (
//     <div className="registration-container">
//       <div className="left-section">
//         <div className="welcome-message">
//           <div className="rocket-icon">🚀</div>
//           <h2>Welcome</h2>
//           <p>The world full of Features</p>
//           <button className="login-button-r" onClick={() => navigate("/login")}>
//             Login
//           </button>
//         </div>
//       </div>
//       <div className="right-section">
//         <div className="user-type-toggle">
//           <button
//             className={userType === "Student" ? "active" : ""}
//             onClick={() => setUserType("Student")}
//           >
//             Student
//           </button>
//           <button
//             className={userType === "Vendor" ? "active" : ""}
//             onClick={() => setUserType("Vendor")}
//           >
//             Vendor
//           </button>
//         </div>
//         <h2 style={{ color: "#340c35" }}>Apply as a {userType}</h2>
//         {!otpSent ? (
//           // Registration Form
//           <form className="registration-form" onSubmit={handleSubmit}>
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name *"
//                 required
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email *"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Your Phone *"
//                 required
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//               />
//               {userType === "Vendor" && (
//                 <select
//                   name="category"
//                   required
//                   value={formData.category}
//                   onChange={handleInputChange}
//                 >
//                   <option value="" disabled>
//                     Select Category
//                   </option>
//                   <option value="Eateries">Eateries</option>
//                   <option value="Healthcare">Healthcare</option>
//                   <option value="Fashion">Fashion</option>
//                   <option value="Accommodations">Accommodations</option>
//                   <option value="Retail">Retail</option>
//                 </select>
//               )}
//             </div>
//             <div className="form-row">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password *"
//                 required
//                 value={formData.password}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password *"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//               />
//             </div>
//             {userType === "Student" && (
//               <div className="form-row">
//                 <input
//                   type="text"
//                   name="semester"
//                   placeholder="Semester *"
//                   required
//                   value={formData.semester}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="location"
//                   placeholder="Location *"
//                   required
//                   value={formData.location}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             )}
//             {userType === "Vendor" && (
//               <div className="form-row">
//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Address *"
//                   required
//                   value={formData.address}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City *"
//                   required
//                   value={formData.city}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             )}
//             <button type="submit" className="register-button">
//               Register
//             </button>
//           </form>
//         ) : (
//           // OTP Dialog
//           <div className="otp-dialog">
//             <h3>Enter OTP</h3>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button onClick={handleOtpVerification}>Verify OTP</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
