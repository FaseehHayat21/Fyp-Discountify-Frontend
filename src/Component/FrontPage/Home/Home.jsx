import React from 'react'
import './Home.css'
import image from "../../../assets/HomeImg.png"
import homevideo from "../../../assets/BgVideo.mp4"

export default function Home() {

  return (
    <>
      <section className="hero" id="home">
        <video autoPlay loop muted className='hero-bgvideo' src={homevideo}></video>
        <div className="container">
          <div className="hero-text">
            <h1>DISCOUNTIFY <br /> A Student Facilitation Portal</h1>
            {/* <h2>A Student Facilitation Portal</h2> */}
            <p>Unlock a world of opportunities created exclusively for students - discover more than you ever imagined!</p>
            <a href="#services-section" className="home-button">Explore Services</a>
          </div>
          {/* <div className="hero-image">
            <img className='hero-image' src={image} alt="Doctor" />
          </div> */}
        </div>
      </section>
    </>
  )
}