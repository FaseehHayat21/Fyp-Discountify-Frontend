import { useState } from 'react';
import Navbar from './Component/Navbar/Navbar';
import StudentPage from './Pages/StudentPage/StudentPage';
import RegistrationForm from './Component/Register/RegistrationForm';
import LandingPage from './Pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Component/Login/Login';
import DealsAndDiscount from './Component/DealsAndDiscount/DealsAndDiscount';
import CourseListing from './Component/CourseListing/CourseListing';
import JobListing from './Component/JobListing/JobListing';
import AddPostStudent from './Component/AddPostStudent/AddPostStudent';
import CVBuilder from './Component/CVForm/CVBuilder';
import RegisterState from "../src/context/Register/RegisterState"
import DealsDiscount from './Component/DealsAndDiscount/DealsDiscount';
import StudentProfile from './Component/StudentProfile/StudentProfile';


function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');

  return (
    <Router>
      <RegisterState>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<Login setUserType={setUserType} />} />
       
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
      </Routes>
      </RegisterState>
    </Router>
  );
}

export default App;
