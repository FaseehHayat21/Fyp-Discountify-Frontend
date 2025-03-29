import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StudentPage from './Pages/StudentPage/StudentPage';
import RegistrationForm from './Component/Register/RegistrationForm';
import LandingPage from './Pages/LandingPage/LandingPage';
import CourseListing from './Component/Student/CourseListing/CourseListing';
import JobListing from './Component/Student/JobListing/JobListing';
import AddPostStudent from './Component/Student/AddPostStudent/AddPostStudent';
import CVBuilder from './Component/Student/CVForm/CVBuilder';
import RegisterState from "../src/context/Register/RegisterState";
import DealsDiscount from './Component/Student/DealsAndDiscount/DealsDiscount';
import StudentProfile from './Component/Student/StudentProfile/StudentProfile';
import LoginAs from "./Component/LoginAs/LoginAs";
import VendorPage from './Pages/VendorPage/VendorPage';
import AddDealsVendor from './Component/Vendor/AddDealsVendor/AddDealsVendor';
import VendorLogin from './Component/LoginSample/VendorLogin';
import StudentLogin from './Component/LoginSample/StudentLogin';
import Community from './Component/Student/Community/Community';
import AdminPage from './Pages/AdminPage/AdminPage';
import ManageUsers from './Component/Admin/ManageUser/ManageUser';
import AdminLogin from './Component/Admin/AdminLogin/AdminLogin';
import ViewDeals from './Component/Vendor/ViewDeals/ViewDeals';
import EditDeal from './Component/Vendor/EditDeal/EditDeal';
import VendorProfile from './Component/Vendor/VendorProfile/VendorProfile';
import Notification from './Component/Vendor/Notification/Notification';
import FeedbackForm from './Component/Student/FeedbackForm/FeedbackForm';
import StudentProfiles from './Component/Student/StudentProfiles/StudentProfiles';
import Categories from './Component/Student/DealsAndDiscount/Categories';
import Layout from './Component/Admin/Layout/Layout';
import Feedbacks from './Component/Admin/Feedback/Feedback';
import Users from './Component/Admin/Users/Users';
import Analytics from './Component/Admin/Analytics/Analytics';
import InstructorPage from './Pages/InstructorPage/InstructorPage';
import AddCourse from './Component/Instructor/AddCourse/AddCourse';
import InstructorLogin from './Component/LoginSample/InstructorLogin';
import InstructorCourses from './Component/Instructor/InstructorCourses/InstructorCourses';
import CourseDetail from './Component/Instructor/InstructorCourses/CourseDetail';
import InstructorCourseManager from './Component/Instructor/InstructorCourses/InstructorCourseManager';
import Courses from './Component/Student/Courses/Courses';

function App() {
  // const [userType, setUserType] = useState(localStorage.getItem('usertype') || '');
  // useEffect(() => {
  //   localStorage.setItem('userType', userType);
  // }, [userType]);
  const [userType, setUserType] = useState(() => localStorage.getItem('usertype') || '');

  useEffect(() => {
    const syncUserType = () => {
      const storedUserType = localStorage.getItem('usertype') || '';
      if (storedUserType !== userType) {
        setUserType(storedUserType);
      }
    };

    // Sync with localStorage on mount and when storage changes
    syncUserType();
    window.addEventListener('storage', syncUserType);
    return () => window.removeEventListener('storage', syncUserType);
  }, [userType]);

  
  return (
    <Router>
      <RegisterState>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/student/login' element={<StudentLogin setUserType={setUserType} />} />
          <Route path='/vendor/login' element={<VendorLogin setUserType={setUserType} />} />
          <Route path='/instructor/login' element={<InstructorLogin setUserType={setUserType} />} />
                 

          <Route path='/login' element={<LoginAs />} />
          <Route path='/adminLogin' element={<AdminLogin/>} />
          {/* Protect student routes */}
          <Route path='/s/*' element={!userType === 'Student' ? <Navigate to="/login" />:  <StudentPage />} >
            <Route index element={<StudentProfile />} />
           
            <Route path="cv" element={<CVBuilder />} />
            <Route path="dealsAndDiscount" element={<DealsDiscount />} />
            <Route path="courseListing" element={<CourseListing />} />
            <Route path="jobListing" element={<JobListing />} />
            <Route path="addPostStudent" element={<AddPostStudent />} />
            <Route path="community" element={<Community />} />
            <Route path="studentProfile" element={<StudentProfile />} />
            <Route path="feedbackform" element={<FeedbackForm/>} />
            <Route path="studentprofiles" element={<StudentProfiles/>} />
            <Route path="categories" element={<Categories/>} />
            <Route path="course" element={<Courses/>} />
            
            
          </Route>
          {/* Protect vendor routes */}
          <Route path='/v/*' element={!userType === 'Vendor' ?  <Navigate to="/login" />: <VendorPage />  } >
          <Route index element={<Notification/>} />
            <Route path="vendorProfile" element={<VendorProfile/>} />
            <Route path="adddeal" element={<AddDealsVendor />} />
            <Route path="viewdeal" element={<ViewDeals/>} />
            <Route path="editdeal" element={<EditDeal/>} />
            <Route path="notification" element={<Notification/>} />
            
           
          </Route>

          
          <Route path='/c/*' element={!userType === 'Instructor' ?  <Navigate to="/login" />: <InstructorPage />  } >
            <Route path="addcourse" element={<AddCourse/>} />
            <Route path="instcourse" element={<InstructorCourses/>} />
            <Route path="coursedetail" element={<CourseDetail/>} />
            <Route path="InstructorCourseManager" element={ <InstructorCourseManager/>} />
          
         
          </Route>

          {/* Protect admin routes */}
          <Route path='/admin/*' element={!userType === 'admin' ? <Navigate to="/adminLogin" /> :<Layout/> }>
             <Route path="manage-users" element={<ManageUsers authToken={localStorage.getItem('authToken')} />} />
             <Route path="layout" element={<Layout/>} />
              <Route path="feedbacks" element={<Feedbacks/>} />
              <Route path="users" element={<Users/>} />
              <Route path="analytics" element={<Analytics/>} />

             
             
             
          </Route>
        </Routes>
      </RegisterState>
    </Router>
  );
}

export default App;
