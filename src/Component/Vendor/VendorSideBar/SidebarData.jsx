import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Add Deals',
    path: 'adddeal',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Deals',
    path: 'viewdeal',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Edit Deals',
  //   path: 'editdeal',
  //   icon: <AiIcons.AiFillHome />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Profile',
    path: 'vendorProfile',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Profile',
  //   path: 'vendorProfile',
  //   icon: <IoIcons.IoMdHelpCircle />,
  //   cName: 'nav-text'
  // },
  {
    title: 'LogOut',
    path: '', 
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    onClick: 'logout', 
  }
];