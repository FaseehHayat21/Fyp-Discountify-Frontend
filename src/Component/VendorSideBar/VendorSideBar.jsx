import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImProfile } from 'react-icons/im';
import { FaIdeal } from 'react-icons/fa';
import { MdMiscellaneousServices, MdMenu, MdClose, MdLogout } from 'react-icons/md';
import logopng from '../../assets/Logo2.png';
import { CgProfile } from 'react-icons/cg';
import './VendorSideBar.css';

export default function VendorSideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <>
     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
        <div className="sidebar-header">
          <img src={logopng} alt="Logo" className="sidebar-logo" />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="d-ser">
              <MdMiscellaneousServices />
              {isOpen && <h3 className="d-h-ser">Vendor</h3>}
            </div>
            <ul>
              <li>
                <Link to="adddeal">
                  <ImProfile />
                  {isOpen && <span>ADD Deals</span>}
                </Link>
              </li>
              <li>
                <Link to="dealsAndDiscount">
                  <FaIdeal />
                  {isOpen && <span>View Orders</span>}
                </Link>
              </li>
            
            </ul>
          </div>
          
          <div className="sidebar-section">
            <div className="d-ser">
              <CgProfile />
              {isOpen && <h3 className="d-h-ser">Profile</h3>}
            </div>
            <ul>
              <li>
                <Link to="studentProfile">
                  <CgProfile />
                  {isOpen && <span>Profile</span>}
                </Link>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  <MdLogout />
                  {isOpen && <span>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
