import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
   <>
   <nav class="navbar navbar-expand-lg navbar-background fixed-top">
    <div class="container navbar-e">
    <div>
    {/* <img src=",..." alt="logo" /> */}
    <h2 className='nav-heading'>Sysnetiks</h2>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navbar-e" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li class="nav-item">
         <a class="nav-link " aria-current="page" href="#home">Home</a>
        </li>
        <li class="nav-item">
      <a class="nav-link " aria-current="page" href="#about">About Us</a>
        </li>
        <li class="nav-item">   
          <a class="nav-link " aria-current="page" href="#product">Product</a>
        </li>
        <li class="nav-item">
        <a class="nav-link " aria-current="page" href="#contactus">Contact Us</a>
        </li>
       
      </ul>
      <form class="d-flex mx-4" role="search">
       
        
       <Link className='nav-link' to="/register"> <button class="btn btn-danger mx-2" type="submit">SignUp</button></Link>
       <Link className='nav-link' to="/login"> <button class="btn btn-secondary" type="submit">Login</button></Link>
      </form>
    </div>
  </div>
</nav>
   </>
  )
}