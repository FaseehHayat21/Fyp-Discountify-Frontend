import React, {useState} from 'react'
import './Login.css'
import LoginImage2 from '../Images/LoginImage2.png'
import UsernameLogo from '../Images/UsernameLogo.png'
import PasswordLogo from '../Images/PasswordLogo.png'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:1000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        });
        const json = await response.json()
        console.log(json)
        if (json.success){
            console.log(json.authtoken);
            console.log(json.userRole);
            console.log(json.access);
            console.log("Login Succesfull")
            localStorage.setItem('token', json.authtoken); 
            localStorage.setItem('role', json.userRole); 
            localStorage.setItem('access', json.access); 
            
            navigate("/welcome");
        }
        else{
            alert("Invalid credentials");
        }

    }
    return (
        <>
            <div className='login-main'>
                <div>
                    <img className='login-image' src={LoginImage2} alt="login image" />
                </div>

                <div className='login-form'>
                    <h2 className='login-heading'>Login</h2>

                    <form action="" onSubmit={handleSubmit}>
                        <div className='login-username'>
                            <img className='login-logos' src={UsernameLogo} alt="username logo" />
                            <input className='login-input-tag' type="text" placeholder='Username' />
                        </div>

                        <div className='login-password'>
                            <img className='login-logos' src={PasswordLogo} alt="password logo" />
                            <input className='login-input-tag' type="text" placeholder='Password' />
                        </div>

                        <div className='login-forget-password'>
                            <u className='login-underline'>Forget Password</u>
                        </div>
                    </form>

                    <button className='login-button'>Login</button>
                    <div className='login-signup-request'>Not Have an Account. <u className='login-underline'>SignUp</u></div>
                </div>
            </div>
        </>
    )
}