import React from 'react'
import "./LoginSample.css"
import loginsample from "../../assets/LoginSample.jpg"

export default function LoginSample() {
    return (
        <>
            <section className='login-sample'>
                <div className='loginsample-main'>
                    <div className='loginsample-left'>
                        {/* <h3 className='loginsample-heading2'>Welcome to Student Portal</h3> */}
                        <h3 className='loginsample-heading1'>Login</h3>
                        <p className='loginsample-paragraph1'>Enter your Account Details</p>

                        <form action="" className='loginsample-form'>
                            <input className='loginsample-inputtag' type="text" placeholder='Email' />
                            <input className='loginsample-inputtag' type="text" placeholder='Password' />
                        </form>

                        <p className='loginsample-paragraph2'>Forget Password</p>
                        <button className='loginsample-lbutton'>Login</button>
                        
                        <div className='loginsample-sdiv'>
                            <p className='loginsample-paragraph2'>Don't Have an Account</p>
                            <button className='loginsample-sbutton'>Sign Up</button>
                        </div>
                    </div>

                    <div className='loginsample-right'>
                        <h3 className='loginsample-heading2'>Welcome to Student Portal</h3>
                        <p className='loginsample-paragraph1'>Login to Access your Account</p>
                        {/* <img className='loginsample-img' src={loginsample} alt="img not added" /> */}
                    </div>
                </div>
            </section>
        </>
    )
}
