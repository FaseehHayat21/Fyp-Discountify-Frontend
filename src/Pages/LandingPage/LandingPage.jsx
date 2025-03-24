import React from 'react'
import Home from '../../Component//FrontPage/Home/Home'
import About from '../../Component/FrontPage/About/About'
import Services from '../../Component/FrontPage/Services/Services'
import Navbar from '../../Component/FrontPage/Navbar/Navbar'
import ContactUs from '../../Component/FrontPage/ContactUs/ContactUs'
import Team from '../../Component/FrontPage/Team/Team'


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
