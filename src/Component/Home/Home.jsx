import React from 'react'
import './Home.css'
import image from "../../assets/HomeImg2.png"
export default function Home() {
 
  return (
    <>
     <section className="hero" id="home">
      <div className="container">
        <div className="hero-text">
          <h1>DISCOUNTIFY: <br /> A Student Facilitation Portal</h1>
          {/* <h2>A Student Facilitation Portal</h2> */}
          <p>Unlock a world of opportunities created exclusively for students - discover more than you ever imagined!</p>
          <a href="#services" className="btn-primary">Explore Services</a>
        </div>
        <div className="hero-image">
          <img className='hero-image' src={image} alt="Doctor" />
        </div>
      </div>
    </section>
      {/* <div className='home-main'>
        <h2 className='home-heading'>DISCOUNTIFY</h2>
        <p className='home-paragraph'>Unlock a world of opportunities created exclusively for students - discover more than you ever imagined!</p>
        <button className='home-button'>Let's Go</button>
      </div> */}
    </>
  )
}