import React, { useState } from "react";
import registerContext from "./RegisterContext.jsx";
import { useNavigate } from 'react-router-dom';
const RegistrationState = (props) => {
  const [userType, setUserType] = useState('Student');
  const navigate = useNavigate(); 

  const registerUser = async (formData) => {
    let url;
    if (userType === 'Vendor') {
      url = 'http://localhost:1000/api/auth/vendorregister';
    } else {
      url = 'http://localhost:1000/api/auth/studentregister';
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      if (userType === 'Vendor') {
        navigate('/vendor/login');
      } else {
        navigate('/student/login');
      }
      

    } catch (error) {
      console.error('Error:', error);
    }

    
  };

  return (
    <registerContext.Provider value={{ userType, setUserType, registerUser }}>
      {props.children}
    </registerContext.Provider>
  );
};

export default RegistrationState;
