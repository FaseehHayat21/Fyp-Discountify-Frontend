import { useState } from 'react';
import Navbar from './Component/Navbar/Navbar';
import StudentPage from './Pages/StudentPage/StudentPage';
import RegistrationForm from './Component/Register/RegistrationForm';
import LandingPage from './Pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/Login/VendorLogin';
import DealsAndDiscount from './Component/DealsAndDiscount/DealsAndDiscount';
import CourseListing from './Component/CourseListing/CourseListing';
import JobListing from './Component/JobListing/JobListing';
import AddPostStudent from './Component/AddPostStudent/AddPostStudent';
import CVBuilder from './Component/CVForm/CVBuilder';
import RegisterState from "../src/context/Register/RegisterState"
import DealsDiscount from './Component/DealsAndDiscount/DealsDiscount';
import StudentProfile from './Component/StudentProfile/StudentProfile';
import VendorLogin from './Component/Login/VendorLogin';
import StudentLogin from './Component/Login/StudentLogin';
import LoginAs from "./Component/LoginAs/LoginAs"
import VendorPage from './Pages/VendorPage/VendorPage';
import AddDealsVendor from './Component/AddDealsVendor/AddDealsVendor';
import LoginSample from './Component/LoginSample/LoginSample';
function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

  return (
    <Router>
      <RegisterState>
      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='student/Login' element={<LoginSample/>} />
        <Route path='vendor/Login' element={<VendorLogin/>} />
        <Route path='/login' element={<LoginAs/>} />
      
       
        {/* Protect student routes */}
        <Route path='/s/*' element={userType === 'Student' ?  <Navigate to="/login" />: <StudentPage />} >
          {/* Define child routes with relative paths */}
          <Route path="cv" element={<CVBuilder/>} />
          <Route path="dealsAndDiscount" element={  <DealsDiscount/>} />
          <Route path="courseListing" element={<CourseListing />} />
          <Route path="jobListing" element={<JobListing />} />
          <Route path="addPostStudent" element={<AddPostStudent />} />
          <Route path="studentProfile" element={<StudentProfile/>} />
        </Route>
        <Route path='/v/*' element={userType === 'Vendor' ?  <Navigate to="/login" />: <VendorPage />} >
          {/* Define child routes with relative paths */}
          <Route path="cv" element={<CVBuilder/>} />
          <Route path="adddeal" element={<AddDealsVendor/>} />
        
        </Route>
      </Routes>
      </RegisterState>
    </Router>
  );
}

export default App;
