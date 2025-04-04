// import React, { useContext, useState } from 'react';
// import './RegistrationForm.css';
// import { useNavigate } from 'react-router-dom';
// import registerContext from "../../context/Register/RegisterContext";

// const RegistrationForm = () => {
  
//   const navigate = useNavigate();
//   const context = useContext(registerContext);
//   const { userType, setUserType, registerUser } = context;

//   // Form data structure adjusted for Student and Vendor
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//     semester: '',
//     location: '',
//     address: '',
//     city: '',
//     companyName: '',
//     companyAddress: '',
//     category: '', 
//   });

//   const loginPage = () => {
//     navigate("/login");
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//     const [otp, setOtp] = useState(""); // State for OTP input
//     const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
//     const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

//     const [errors, setErrors] = useState({});
//     const validateForm = () => {
//       let isValid = true;
//       const newErrors = {};
    
//       // General checks
//       if (!formData.name.trim()) {
//         newErrors.name = "Name is required.";
//         isValid = false;
//       }
    
//       if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//         newErrors.email = "Valid email is required.";
//         isValid = false;
//       }
    
//       if (!formData.phoneNumber.trim() || !/^\d{10,15}$/.test(formData.phoneNumber)) {
//         newErrors.phoneNumber = "Valid phone number (10-15 digits) is required.";
//         isValid = false;
//       }
    
//       // Password check: at least one number, one uppercase letter, and 8 characters long
//       const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
//       if (!passwordRegex.test(formData.password)) {
//         newErrors.password = "Password must be at least 8 characters long, contain at least one number and one capital letter.";
//         isValid = false;
//       }
    
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match.";
//         isValid = false;
//       }
    
//       // Student-specific checks
//       if (userType === "Student") {
//         if (!formData.semester.trim()) {
//           newErrors.semester = "Semester is required.";
//           isValid = false;
//         }
    
//         if (!formData.location.trim()) {
//           newErrors.location = "Location is required.";
//           isValid = false;
//         }
//       }
    
//       // Vendor-specific checks
//       if (userType === "Vendor") {
//         if (!formData.category) {
//           newErrors.category = "Category is required.";
//           isValid = false;
//         }
    
//         if (!formData.address.trim()) {
//           newErrors.address = "Address is required.";
//           isValid = false;
//         }
    
//         if (!formData.city.trim()) {
//           newErrors.city = "City is required.";
//           isValid = false;
//         }
    
//         if (!formData.companyName.trim()) {
//           newErrors.companyName = "Company name is required.";
//           isValid = false;
//         }
    
//         if (!formData.companyAddress.trim()) {
//           newErrors.companyAddress = "Company address is required.";
//           isValid = false;
//         }
//       }
    
//       setErrors(newErrors);
//       return isValid;
//     };

//     const handleOtpVerification = async () => {
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
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (formData.password !== formData.confirmPassword) {
//   //     alert("Passwords do not match!");
//   //     return; // Stop form submission
//   //   }
//   //   console.log(formData);
//   //   // Call the registerUser function from the context
//   //   registerUser(formData);
//   // };
//       const handleSubmit = (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//           console.log("Form submitted successfully", formData);
//         } else {
//           console.log("Form validation failed");
//         }
//         if (formData.password !== formData.confirmPassword) {
//           alert("Passwords do not match!");
//           return;
//         }
//         console.log(formData);
//         sendOtp(); // Send OTP after user submits form
//       };
//   return (
//     <div className="registration-container">
//       <div className="left-section">
//         <div className="welcome-message">
//           <div className="rocket-icon">🚀</div>
//           <h2>Welcome</h2>
//           <p>The world full of Features</p>
//           <button className="login-button-r" onClick={loginPage}>Login</button>
//         </div>
//       </div>
//       <div className="right-section">
//         <div className="user-type-toggle">
//           <button
//             className={userType === 'Student' ? 'active' : ''}
//             onClick={() => setUserType('Student')}>
//             Student
//           </button>
//           <button
//             className={userType === 'Vendor' ? 'active' : ''}
//             onClick={() => setUserType('Vendor')}>
//             Vendor
//           </button>
//         </div>
//         <h2 style={{color: "#340c35"}}>Apply as a {userType}</h2>
//           {!otpSent ? (
//         <form className="registration-form" onSubmit={handleSubmit}>
//           <div className="form-row">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name *"
//               required
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email *"
//               required
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-row">
//             <input
//               type="text"
//               name="phoneNumber"
//               placeholder="Your Phone *"
//               required
//               value={formData.phoneNumber}
//               onChange={handleInputChange}
//             />
//             {userType === 'Vendor' && (
//                 <select
//                   name="category"
//                   required
//                   value={formData.category}
//                   onChange={handleInputChange}
//                 >
//                   <option value="" disabled>Select Category</option>
//                   <option value="Eateries">Eateries</option>
//                   <option value="Healthcare">Healthcare</option>
//                   <option value="Fashion">Fashion</option>
//                   <option value="Accommodations">Accommodations</option>
//                   <option value="Retail">Retail</option>
//                 </select>

//             )}

//           </div>
//           <div className="form-row">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password *"
//               required
//               value={formData.password}
//               onChange={handleInputChange}
//               title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
//               />
            
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password *"
//               required
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
//             />
//           </div>

//           {userType === 'Student' && (
//             <>
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
//             </>
//           )}

//           {userType === 'Vendor' && (
//             <>
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
//               <div className="form-row">
//                 <input
//                   type="text"
//                   name="companyName"
//                   placeholder="Company Name *"
//                   required
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                 />
//                 <input
//                   type="text"
//                   name="companyAddress"
//                   placeholder="Company Address *"
//                   required
//                   value={formData.companyAddress}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </>
//           )}

//           <button type="submit" className="register-button">
//             Register
//           </button>
//         </form>
//             ) : (
//               // OTP Dialog
//               <div className="otp-dialog">
//                 <h3>Enter OTP</h3>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//                 <button onClick={handleOtpVerification}>Verify OTP</button>
//               </div>
//             )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

// import React, { useContext, useState } from 'react';
// import './RegistrationForm.css';
// import { useNavigate } from 'react-router-dom';
// import registerContext from "../../context/Register/RegisterContext";
// // import InputMask from 'react-input-mask';

// const RegistrationForm = () => {
//   const navigate = useNavigate();
//   const context = useContext(registerContext);
//   const { userType, setUserType, registerUser } = context;

//   // Form data structure adjusted for Student and Vendor
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     confirmPassword: '',
//     semester: '',
//     location: '',
//     city: '',
//     companyName: '',
//     companyAddress: '',
//     category: '', 
//   });

//   const [otp, setOtp] = useState(""); // State for OTP input
//   const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
//   const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

//   const [errors, setErrors] = useState({});
  
//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     // General checks
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required.";
//       isValid = false;
//     }
   
    

//     if (!formData.phoneNumber.trim() || !/^03\d{9}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Valid Pakistani phone number (starting with 03 and followed by 9 digits) is required.";
//       isValid = false;
//     }
    

//     // Password check: at least one number, one uppercase letter, and 8 characters long
//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordRegex.test(formData.password)) {
//       newErrors.password = "Password must be at least 8 characters long, contain at least one number and one capital letter.";
//       isValid = false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       isValid = false;
//     }

//     // Student-specific checks
//     if (userType === "Student") {
//       if (!formData.semester.trim()) {
//         newErrors.semester = "Semester is required.";
//         isValid = false;
//       }

//       if (!formData.location.trim()) {
//         newErrors.location = "Location is required.";
//         isValid = false;
//       }
//       if (
//         !formData.email.trim() ||
//         !/^\S+@students\.au\.edu\.pk$/.test(formData.email)
//       ) {
//         newErrors.email = "Email must be a valid @students.au.edu.pk address.";
//         isValid = false;
//       }
//     }

//     // Vendor-specific checks
//     if (userType === "Vendor") {
//       if (!formData.category) {
//         newErrors.category = "Category is required.";
//         isValid = false;
//       }

//       // if (!formData.address.trim()) {
//       //   newErrors.address = "Address is required.";
//       //   isValid = false;
//       // }

//       if (!formData.city.trim()) {
//         newErrors.city = "City is required.";
//         isValid = false;
//       }

//       if (!formData.companyName.trim()) {
//         newErrors.companyName = "Company name is required.";
//         isValid = false;
//       }

//       if (!formData.companyAddress.trim()) {
//         newErrors.companyAddress = "Company address is required.";
//         isValid = false;
//       }
//     }

//     setErrors(newErrors);
//     return isValid;
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
//         registerUser(formData); // 
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
//     if (validateForm()) {
//       console.log("Form submitted successfully", formData);
//       sendOtp(); // Send OTP after user submits form
//     } else {
//       console.log("Form validation failed");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="registration-container">
//       <div className="left-section">
//         <div className="welcome-message">
//           <div className="rocket-icon">🚀</div>
//           <h2>Welcome</h2>
//           <p>The world full of Features</p>
//           <button className="login-button-r" onClick={() => navigate("/login")}>Login</button>
//         </div>
//       </div>
//       <div className="right-section">
//         <div className="user-type-toggle">
//           <button
//             className={userType === 'Student' ? 'active' : ''}
//             onClick={() => setUserType('Student')}>
//             Student
//           </button>
//           <button
//             className={userType === 'Vendor' ? 'active' : ''}
//             onClick={() => setUserType('Vendor')}>
//             Vendor
//           </button>
//         </div>
//         <h2 style={{color: "#340c35"}}>Apply as a {userType}</h2>

//         {!otpSent ? (
//           <form className="registration-form" onSubmit={handleSubmit}>
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name *"
//                 required
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={errors.name ? 'error' : ''}
//               />
//               {errors.name && <span className="error-message">{errors.name}</span>}

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email *"
//                 required
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={errors.email ? 'error' : ''}
//               />
//               {errors.email && <span className="error-message">{errors.email}</span>}
//             </div>

//             <div className="form-row">
//               <input
//                 type="text"
//                 name="phoneNumber"
//                 placeholder="Your Phone *"
//                 required
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 className={errors.phoneNumber ? 'error' : ''}
//               />
//               {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}

//               {userType === 'Vendor' && (
//                 <select
//                   name="category"
//                   required
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className={errors.category ? 'error' : ''}
//                 >
//                   <option value="" disabled>Select Category</option>
//                   <option value="Eateries">Eateries</option>
//                   <option value="Healthcare">Healthcare</option>
//                   <option value="Fashion">Fashion</option>
//                   <option value="Accommodations">Accommodations</option>
//                   <option value="Retail">Retail</option>
//                 </select>
//               )}
//               {errors.category && <span className="error-message">{errors.category}</span>}
//             </div>

//             <div className="form-row">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password *"
//                 required
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className={errors.password ? 'error' : ''}
//               />
//               {errors.password && <span className="error-message">{errors.password}</span>}

//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password *"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className={errors.confirmPassword ? 'error' : ''}
//               />
//               {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//             </div>

//             {userType === 'Student' && (
//               <>
//                 <div className="form-row">
//                  <input
//                   type="number"
//                   name="semester"
//                   placeholder="Semester (1-8) *"
//                   required
//                   value={formData.semester}
//                   min="1"
//                   max="8"
//                   onChange={handleInputChange}
//                   className={errors.semester ? 'error' : ''}
//                 />

//                   {errors.semester && <span className="error-message">{errors.semester}</span>}

//                   <input
//                     type="text"
//                     name="location"
//                     placeholder="Location *"
//                     required
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     className={errors.location ? 'error' : ''}
//                   />
//                   {errors.location && <span className="error-message">{errors.location}</span>}
//                 </div>
//               </>
//             )}

//             {userType === 'Vendor' && (
//               <>
//                 <div className="form-row">
//                   <input
//                     type="text"
//                     name="companyName"
//                     placeholder="Company Name *"
//                     required
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     className={errors.companyName ? 'error' : ''}
//                   />
//                   {errors.companyName && <span className="error-message">{errors.companyName}</span>}

//                   <input
//                     type="text"
//                     name="companyAddress"
//                     placeholder="Company Address *"
//                     required
//                     value={formData.companyAddress}
//                     onChange={handleInputChange}
//                     className={errors.companyAddress ? 'error' : ''}
//                   />
//                   {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
//                 </div>

//                 <div className="form-row">
//                   <input
//                     type="text"
//                     name="city"
//                     placeholder="City *"
//                     required
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     className={errors.city ? 'error' : ''}
//                   />
//                   {errors.city && <span className="error-message">{errors.city}</span>}
//                 </div>
//               </>
//             )}

//             <div className="form-row">
//               <button type="submit" className="submit-btn">
//                 Send OTP
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="otp-section">
//             <h2>Enter OTP</h2>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//             />
//             <button onClick={handleOtpVerification} disabled={otpVerified}>
//               Verify OTP
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useContext, useState } from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';
import registerContext from "../../context/Register/RegisterContext";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const context = useContext(registerContext);
  const { userType, setUserType, registerUser } = context;

  // Form data structure adjusted for Student, Vendor, and Instructor
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    semester: '',
    location: '',
    city: '',
    companyName: '',
    companyAddress: '',
    category: '',
    department: '', // New field for Instructor
    designation: '', // New field for Instructor
  });

  const [otp, setOtp] = useState(""); // State for OTP input
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // General checks
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.phoneNumber.trim() || !/^03\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid Pakistani phone number (starting with 03 and followed by 9 digits) is required.";
      isValid = false;
    }

    // Password check: at least one number, one uppercase letter, and 8 characters long
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, contain at least one number and one capital letter.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    // Student-specific checks
    if (userType === "Student") {
      if (!formData.semester.trim()) {
        newErrors.semester = "Semester is required.";
        isValid = false;
      }

      if (!formData.location.trim()) {
        newErrors.location = "Location is required.";
        isValid = false;
      }

      if (!formData.email.trim() || !/^\S+@students\.au\.edu\.pk$/.test(formData.email)) {
        newErrors.email = "Email must be a valid @students.au.edu.pk address.";
        isValid = false;
      }
    }

    // Vendor-specific checks
    if (userType === "Vendor") {
      if (!formData.category) {
        newErrors.category = "Category is required.";
        isValid = false;
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required.";
        isValid = false;
      }

      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required.";
        isValid = false;
      }

      if (!formData.companyAddress.trim()) {
        newErrors.companyAddress = "Company address is required.";
        isValid = false;
      }
    }

    // Instructor-specific checks
    if (userType === "Instructor") {
      if (!formData.department.trim()) {
        newErrors.department = "Department is required.";
        isValid = false;
      }

      if (!formData.designation.trim()) {
        newErrors.designation = "Designation is required.";
        isValid = false;
      }

      if (!formData.email.trim() || !/^\S+@au\.edu\.pk$/.test(formData.email)) {
        newErrors.email = "Email must be a valid @au.edu.pk address.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

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
        registerUser(formData); // Register user after OTP verification
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      sendOtp(); // Send OTP after user submits form
    } else {
      console.log("Form validation failed");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="registration-container">
      <div className="left-section">
        <div className="welcome-message">
          <div className="rocket-icon">🚀</div>
          <h2>Welcome</h2>
          <p>The world full of Features</p>
          <button className="login-button-r" onClick={() => navigate("/login")}>Login</button>
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
          <button
            className={userType === 'Instructor' ? 'active' : ''}
            onClick={() => setUserType('Instructor')}>
            Instructor
          </button>
        </div>
        <h2 style={{ color: "#340c35" }}>Apply as a {userType}</h2>

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
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Your Phone *"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}

              {userType === 'Vendor' && (
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Eateries">Eateries</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Accommodations">Accommodations</option>
                  <option value="Retail">Retail</option>
                </select>
              )}
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-row">
              <input
                type="password"
                name="password"
                placeholder="Password *"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {userType === 'Student' && (
              <>
                <div className="form-row">
                  <input
                    type="number"
                    name="semester"
                    placeholder="Semester (1-8) *"
                    required
                    value={formData.semester}
                    min="1"
                    max="8"
                    onChange={handleInputChange}
                    className={errors.semester ? 'error' : ''}
                  />
                  {errors.semester && <span className="error-message">{errors.semester}</span>}

                  <input
                    type="text"
                    name="location"
                    placeholder="Location *"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? 'error' : ''}
                  />
                  {errors.location && <span className="error-message">{errors.location}</span>}
                </div>
              </>
            )}

            {userType === 'Vendor' && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name *"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={errors.companyName ? 'error' : ''}
                  />
                  {errors.companyName && <span className="error-message">{errors.companyName}</span>}

                  <input
                    type="text"
                    name="companyAddress"
                    placeholder="Company Address *"
                    required
                    value={formData.companyAddress}
                    onChange={handleInputChange}
                    className={errors.companyAddress ? 'error' : ''}
                  />
                  {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
                </div>

                <div className="form-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City *"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
              </>
            )}

            {userType === 'Instructor' && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    name="department"
                    placeholder="Department *"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className={errors.department ? 'error' : ''}
                  />
                  {errors.department && <span className="error-message">{errors.department}</span>}

                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation *"
                    required
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={errors.designation ? 'error' : ''}
                  />
                  {errors.designation && <span className="error-message">{errors.designation}</span>}
                </div>
              </>
            )}

            <div className="form-row">
              <button type="submit" className="submit-btn">
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <div className="otp-section">
            <h2>Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOtpVerification} disabled={otpVerified}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;