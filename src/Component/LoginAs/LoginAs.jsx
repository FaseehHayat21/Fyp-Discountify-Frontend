import React from 'react'
import "./LoginAs.css"
import {Link} from 'react-router-dom'
export default function LoginAs() {
  return ( 
    <>
        <div className='login-as'>
            <div className='login-as-student'>
             <Link to="/student/Login"><h3>Login <br /> as a Student</h3></Link>
            </div>
            <div className='login-as-vendor'>
            <Link to="/vendor/Login"> <h3>Login <br /> as a Vendor</h3></Link>
            </div>
        </div>
    </>
  )
}
