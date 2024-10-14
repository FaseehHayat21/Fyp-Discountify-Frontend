import React from 'react'
import Home from '../../Component/Home/Home'
import About from '../../Component/About/About'
import Services from '../../Component/Services/Services'
import Navbar from '../../Component/Navbar/Navbar'
import ContactUs from '../../Component/ContactUs/ContactUs'
import Team from '../../Component/Team/Team'
import LoginSample from '../../Component/LoginSample/LoginSample'


export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="home-section">
        <Home />
      </div>
      {/* <LoginSample/> */}
      <div id="about-section">
        <About />
      </div>
      <div id="services-section">
        <Services />
      </div>
      <div id="team-section">
        <Team />
      </div>
      <div id="contactus">
        <ContactUs />
      </div>
      {/* <Example/> */}
    </>
  )
}
