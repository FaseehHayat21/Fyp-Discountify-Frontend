import React, { useState } from 'react';
import './Login.css';
import LoginImage2 from '../Images/LoginImage2.png';
import UsernameLogo from '../Images/UsernameLogo.png';
import PasswordLogo from '../Images/PasswordLogo.png';
import { useNavigate, Link } from 'react-router-dom';

export default function VendorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:1000/api/auth/vendor/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const json = await response.json();
    
        console.log("API Response:", json);  // Log the entire response
    
        if (json.success === true) {
            const token = json.authToken;  // Use correct capitalization
            console.log("Token to be saved:", token);  // Log the token before saving
    
            if (token) {
                localStorage.setItem('token', token);  // Attempt to save
                localStorage.setItem('usertype', json.userType);  // Attempt to save
                localStorage.setItem('userid', json.userid);  // Attempt to save
                console.log("Token saved to localStorage:", localStorage.getItem('token'));  // Verify save
                console.log("Token saved to localStorage:", localStorage.getItem('userid'));  // Verify save
                console.log("Token saved to localStorage:", localStorage.getItem('usertype'));  // Verify save
                navigate("/s"); 
            } else {
                console.error("Token is undefined, cannot save to localStorage");
            }
            
             // Only navigate if token save is successful
        } else {
            alert("Invalid credentials");
        }
    }
    
    return (
        <>
            <div className='login-main'>
                <div>
                    <img className='login-image' src={LoginImage2} alt="login" />
                </div>

                <div className='login-form'>
                    <h2 className='login-heading'>Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='login-username'>
                            <img className='login-logos' src={UsernameLogo} alt="username logo" />
                            <input
                                className='login-input-tag'
                                type="text"
                                placeholder='Username'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className='login-password'>
                            <img className='login-logos' src={PasswordLogo} alt="password logo" />
                            <input
                                className='login-input-tag'
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className='login-forget-password'>
                            <u className='login-underline'>Forgot Password</u>
                        </div>

                        <button type="submit" className='login-button'>Login</button>
                    </form>

                    <div className='login-signup-request'>Don't have an account? <Link to="/register" className='login-underline'>SignUp</Link></div>
                </div>
            </div>
        </>
    );
}
