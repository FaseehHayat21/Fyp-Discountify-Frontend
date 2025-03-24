import React from 'react'
import './Services.css'
import DealsIcon from '../../Images/DealsIcon.png'
import JobIcon from '../../Images/JobIcon.png'
import CVIcon from '../../Images/CVIcon.png'
import CourseIcon from '../../Images/CourseIcon.png'
import ChatIcon from '../../Images/ChatIcon.png'

export default function Services() {
    return (
        <>
            <section className='service-main'>
                    <h2 className='service-detail'>SERVICES</h2>

                <div className='service-list'>
                    <div className='service-list-container'>
                        <img className='service-icons' src={DealsIcon} alt="deals & discount" />
                        <h4>Deals & Discounts</h4>
                        <p>Exclusive discounts on clothing, food, travel, health, and more. Save on what matters most to you!</p>    
                    </div>

                    <div className='service-list-container'>                       
                        <img className='service-icons' src={JobIcon} alt="part-time job" />
                        <h4>Part-time Job Opportunity</h4>
                        <p>Discover flexible part-time jobs that fit your student life. Boost your income and gain experience!</p>                        
                    </div>

                    <div className='service-list-container'>
                        <img className='service-icons' src={CVIcon} alt="cv creation" />
                        <h4>CV <br /> Creation</h4>
                        <p>Craft a standout CV with our simple tools. Highlight your skills and experience effortlessly!</p>
                    </div>

                    <div className='service-list-container'>
                        <img className='service-icons' src={CourseIcon} alt="courses notification" />
                        <h4>Course Notifications</h4>
                        <p>Receive notifications for local and international courses. Stay updated on the best opportunities!</p>
                    </div>

                    <div className='service-list-container'>
                        <img className='service-icons icon4' src={ChatIcon} alt="students interaction" />
                        <h4>Students' Interactions</h4>
                        <p>Chat with fellow students for educational collaboration. Share ideas and support each other's learning!</p>
                    </div>
                </div>
            </section>
        </>
    )
}