import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Component/Navbar/Navbar';
import StudentPage from './Pages/StudentPage/StudentPage';
import RegistrationForm from './Component/Register/RegistrationForm';
import LandingPage from './Pages/LandingPage/LandingPage';
import Login from './Component/Login/VendorLogin';
import DealsAndDiscount from './Component/DealsAndDiscount/DealsAndDiscount';
import CourseListing from './Component/CourseListing/CourseListing';
import JobListing from './Component/JobListing/JobListing';
import AddPostStudent from './Component/AddPostStudent/AddPostStudent';
import CVBuilder from './Component/CVForm/CVBuilder';
import RegisterState from "../src/context/Register/RegisterState";
import DealsDiscount from './Component/DealsAndDiscount/DealsDiscount';
import StudentProfile from './Component/StudentProfile/StudentProfile';
import LoginAs from "./Component/LoginAs/LoginAs";
import VendorPage from './Pages/VendorPage/VendorPage';
import AddDealsVendor from './Component/AddDealsVendor/AddDealsVendor';
import VendorLogin from './Component/LoginSample/VendorLogin';
import StudentLogin from './Component/LoginSample/StudentLogin';
import Community from './Component/Community/Community';
import AdminPage from './Pages/AdminPage/AdminPage';
import ManageUsers from './Component/Admin/ManageUser/ManageUser';
import AdminLogin from './Component/Admin/AdminLogin/AdminLogin';

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

  // Update localStorage whenever userType changes
  useEffect(() => {
    localStorage.setItem('userType', userType);
  }, [userType]);

  return (
    <Router>
      <RegisterState>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/student/login' element={<StudentLogin setUserType={setUserType} />} />
          <Route path='/vendor/login' element={<VendorLogin setUserType={setUserType} />} />
          <Route path='/login' element={<LoginAs />} />
          <Route path='/adminLogin' element={<AdminLogin/>} />

          {/* Protect student routes */}
          <Route path='/s/*' element={userType === 'Student' ?  <Navigate to="/login" />: <StudentPage />} >
          {/* <Route path='/s/*' element={userType === 'Student' ? <StudentPage /> : <Navigate to="/login" />} > */}
            <Route path="cv" element={<CVBuilder />} />
            <Route path="dealsAndDiscount" element={<DealsDiscount />} />
            <Route path="courseListing" element={<CourseListing />} />
            <Route path="jobListing" element={<JobListing />} />
            <Route path="addPostStudent" element={<AddPostStudent />} />
            <Route path="community" element={<Community />} />
            <Route path="studentProfile" element={<StudentProfile />} />
          </Route>
          {/* Protect vendor routes */}
          <Route path='/v/*' element={userType === 'Vendor' ? <VendorPage /> : <Navigate to="/login" />} >
            <Route path="cv" element={<CVBuilder />} />
            <Route path="adddeal" element={<AddDealsVendor />} />
          </Route>

          {/* Protect admin routes */}
          <Route path='/admin/*' element={userType === 'admin' ?<Navigate to="/adminLogin" />: <AdminPage />  }>
             <Route path="manage-users" element={<ManageUsers authToken={localStorage.getItem('authToken')} />} />
          </Route>
        </Routes>
      </RegisterState>
    </Router>
  );
}

export default App;
