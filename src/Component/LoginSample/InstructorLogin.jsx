import React, { useState } from 'react';
import "./LoginSample.css"
import loginsample from "../../assets/LoginSample.jpg"
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function InstructorLogin() {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:1000/api/auth/instructor/login", {
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
                navigate("/c");
            } else {
                console.error("Token is undefined, cannot save to localStorage");
            }

        } else {
            alert("Invalid credentials");
        }
    }
    return (
        <>
            <section className='login-sample'>
                <div className='loginsample-main'>
                    <div className='loginsample-left'>
                        {/* <h3 className='loginsample-heading2'>Welcome to Student Portal</h3> */}
                        <h3 className='loginsample-heading1'>Login</h3>
                        <p className='loginsample-paragraph1'>Enter your Account Details</p>

                        <form onSubmit={handleSubmit} className='loginsample-form'>
                            <div className='loginsample-input-container'>
                                <input className='loginsample-inputtag' onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder='Email' required />
                            </div>
                            {/* <input className='loginsample-inputtag'  onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder='Password' required/>
                             */}
                            <div className="loginsample-input-container">
                                <input
                                    className="loginsample-inputtag"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>

                            {/* <p className='loginsample-paragraph2'>Forget Password</p> */}
                            <button type="submit" className='loginsample-lbutton'>Login</button>
                        </form>


                        <div className='loginsample-sdiv'>
                            <p className='loginsample-paragraph2'>Don't Have an Account</p>
                            <button className='loginsample-sbutton'><Link to="/register">Sign Up</Link></button>
                        </div>
                    </div>

                    <div className='loginsample-right'>
                        <h3 className='loginsample-heading2'>Welcome to Instructor Portal</h3>
                        <p className='loginsample-paragraph1'>Login to Access your Account</p>
                        {/* <img className='loginsample-img' src={loginsample} alt="img not added" /> */}
                    </div>
                </div>
            </section>
        </>
    )
}
