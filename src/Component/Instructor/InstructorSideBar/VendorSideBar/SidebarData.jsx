import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Add Courses',
    path: 'addcourse',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Your Courses',
    path: 'instcourse',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'LogOut',
    path: '', 
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    onClick: 'logout', 
  }
];