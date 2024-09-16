import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let navbarClasses = ['navbar', 'navbar-expand-lg', 'navbar-background', 'fixed-top'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <>
      <nav className={navbarClasses.join(' ')}>
        <div className="container navbar-e">
          <div className="logo">
            <img className="nav-logo" src={logo} alt="logo" />
            <h2 className="nav-heading">Discountify</h2>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-e" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#product">Product</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#contactus">Contact Us</a>
              </li>
            </ul>
            <form className="d-flex mx-4" role="search">
              <Link className="nav-link" to="/register">
                <button className="btn btn-danger mx-2" type="button">SignUp</button>
              </Link>
              <Link className="nav-link" to="/login">
                <button className="btn btn-secondary" type="button">Login</button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
