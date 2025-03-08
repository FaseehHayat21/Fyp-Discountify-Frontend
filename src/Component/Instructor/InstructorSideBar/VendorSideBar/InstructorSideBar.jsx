


import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { SidebarData } from './SidebarData.jsx';
import './InstructorSideBar.css';
import { IconContext } from 'react-icons';

function InstructorSideBar() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem('token');    // Removes the token
    localStorage.removeItem('usertype'); // Removes the userType
    localStorage.removeItem('userid');   // Removes the userid
    navigate('/login');
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar-nav'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName}
                  onClick={item.onClick === 'logout' ? handleLogout : undefined}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default InstructorSideBar;
