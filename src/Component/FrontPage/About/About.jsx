import React from 'react'
import './About.css'
import AboutImg from '../../../assets/about.png'

export default function About() {
  return (
    <>
      <div className='about-main'>
        {/* <div>
          <h2 className='about-heading'>ABOUT US</h2>
        </div> */}
        <div className='about-content'>
          <div className='about-paragraph'> <h2>Welcome to<span>Discountify,</span> </h2> the ultimate platform designed exclusively for students. At Discountify, we understand the unique challenges and opportunities that come with student life. Our mission is to provide you with a one-stop hub where you can access a wide range of resources and benefits tailored to your needs. Whether you're looking for amazing deals and discounts, valuable course information, part-time job opportunities, CV creation tools, or a vibrant community for student interaction, Discountify has it all. Discover more than you ever imagined and make the most of your student experience with us!</div>
          {/* <img className='about-img' src='' alt="" /> */}
        </div>
      </div>
    </>
  )
}