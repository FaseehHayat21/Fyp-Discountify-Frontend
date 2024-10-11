import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./VendorPage.css"
import { Outlet } from 'react-router-dom';
import VendorSideBar from '../../Component/VendorSideBar/VendorSideBar';
export default function VendorPage() {
  return (
    <>
    <div className="App">
       
          <div className="sidebar-s">
          <VendorSideBar/>
          </div>
          <div className="content">
            <Outlet />
          </div>
       
      </div>
   
    </>
  )
}
