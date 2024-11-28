import React, { useState } from "react";
import registerContext from "./RegisterContext.jsx";
import { useNavigate } from 'react-router-dom';
const RegistrationState = (props) => {
  const [userType, setUserType] = useState('Student');
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  //Register 
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
    //Register Student Post
  const addPost = async (formData) => {
    try {
        const response = await fetch('http://localhost:1000/api/auth/create', {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body: formData
        });

        const data = await response.json();
        if (response.ok && data.success) {
            setPosts([...posts, data.post]);
        } else {
            console.error('Failed to add post:', data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
};
const addDeal = async (formData) => {
  try {
      const response = await fetch('http://localhost:1000/api/auth/vendor/addDeal', {
          method: 'POST',
          headers: {
              'auth-token': localStorage.getItem('token') // Don't include 'Content-Type'
          },
          body: formData
      });

      const data = await response.json();
      if (response.ok && data.success) {
          setPosts([...posts, data.post]); // Assuming you're setting the new post in state
      } else {
          console.error('Failed to add deal:', data.message || 'Unknown error');
      }
  } catch (error) {
      console.error('Error adding deal:', error);
  }
};

// Fetching Student Profile
const fetchProfile = async () => {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:1000/api/auth/studentprofile', {
          headers: {
              'Content-Type': 'application/json',
              'auth-token': token
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data)
      setProfile(data);
  } catch (err) {
      setError(err.message);
  } finally {
      setLoading(false);
  }
};
// Updating Student Profile
const updateProfile = async (updatedFields) => {
  try {
    const response = await fetch('http://localhost:1000/api/auth/studentprofile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'), // Include the token in the headers
      },
      body: JSON.stringify(updatedFields),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Failed to update profile:', data.error);
      return;
    }

    console.log('Profile updated successfully:', data);
    // Update the state with the new profile data if necessary
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

// Fetching post for a specific student
const fetchPosts = async () => {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:1000/api/auth/posts', {
          headers: {
              'Content-Type': 'application/json',
              'auth-token': token
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      setPosts(data);
  } catch (err) {
      setError(err.message);
  }
};


  return (
    <registerContext.Provider value={{ userType, setUserType, registerUser, profile, posts, loading, error, fetchProfile, updateProfile, fetchPosts, addPost, addDeal }}>
      {props.children}
    </registerContext.Provider>
  );
};

export default RegistrationState;
