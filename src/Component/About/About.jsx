import React from 'react'
import './About.css'
import AboutImg from '../../assets/about.png'

export default function About() {
  return (
    <>
      <div className='about-main'>
        <div>
          <h2 className='about-heading'>ABOUT US</h2>
        </div>
        <div className='about-content'>
          <p className='about-paragraph'> <h2>Welcome to <span>Discountify,</span> </h2> the ultimate platform for students. We understand the unique challenges of student life and are here to provide you with a hub of resources aligned to your needs. From amazing deals and course information to part-time jobs, CV tools, and a vibrant student community, Discountify has it all. Discover more than you ever imagined and make the most of your student experience with us!</p>
          <img className='about-img' src={AboutImg} alt="" />
        </div>
      </div>
    </>
  )
}