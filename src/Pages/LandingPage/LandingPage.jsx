import React from 'react'
import Home from '../../Component/Home/Home'
import About from '../../Component/About/About'
import Services from '../../Component/Services/Services'
import Navbar from '../../Component/Navbar/Navbar'
import ContactUs from '../../Component/ContactUs/ContactUs'
import Example from '../../Component/Example/Example'
import Team from '../../Component/Team/Team'
import LoginAs from '../../Component/LoginAs/LoginAs'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="home-section">
        <Home />
      </div>
      <LoginAs/>
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
