import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="discountify-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Discountify</h2>
          <p>Empowering students with deals, knowledge, and career tools.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about-section">About US</a></li>
            <li><a href="#services-section">Services</a></li>
            <li><a href="#team-section">Team</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Discountify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;