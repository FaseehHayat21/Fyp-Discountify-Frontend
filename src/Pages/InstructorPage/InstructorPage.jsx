
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./InstructorPage.css"
import { Outlet } from 'react-router-dom';
import VendorSideBar from '../../Component/VendorSideBar/VendorSideBar';
import InstructorSideBar from '../../Component/Instructor/InstructorSideBar/VendorSideBar/InstructorSideBar';
export default function InstructorPage() {
  return (
    <>
    <div className="App">
       
          <div className="sidebar-s">
          
          <InstructorSideBar/>
          </div>
          <div className="content">
            <Outlet />
          </div>
       
      </div>
   
    </>
  )
}
