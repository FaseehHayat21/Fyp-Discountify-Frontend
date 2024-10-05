import React from 'react'
import './Services.css'
import DealsIcon from '../Images/DealsIcon.png'
import JobIcon from '../Images/JobIcon.png'
import CVIcon from '../Images/CVIcon.png'
import CourseIcon from '../Images/CourseIcon.png'
import ChatIcon from '../Images/ChatIcon.png'

export default function Services() {
    return (
        <>
            <section className='service-main'>
                <div className='service-detail'>
                    <h2>SERVICES</h2>
                    {/* <p>We offer a range of solutions to enhance your student experience and support your journey.</p> */}
                </div>

                <div className='service-list'>
                    <div className='service-list-container'>
                        <div>
                            <h4>Deals & Discounts</h4>
                            <p>Exclusive discounts on clothing, food, travel, health, and more. Save on what matters most to you!</p>
                        </div>
                        <img className='service-icons' src={DealsIcon} alt="deals & discount" />
                    </div>

                    <div className='service-list-container'>
                        <div>
                            <h4>Part-time Job Opportunity</h4>
                            <p>Discover flexible part-time jobs that fit your student life. Boost your income and gain experience!</p>
                        </div>
                        <img className='service-icons' src={JobIcon} alt="part-time job" />
                    </div>

                    <div className='service-list-container'>
                        <div>
                            <h4>CV Creation</h4>
                            <p>Craft a standout CV with our simple tools. Highlight your skills and experience effortlessly!</p>
                        </div>
                        <img className='service-icons' src={CVIcon} alt="cv creation" />
                    </div>

                    <div className='service-list-container'>
                        <div>
                            <h4>Course Notifications</h4>
                            <p>Receive notifications for local and international courses. Stay updated on the best opportunities!</p>
                        </div>
                        <img className='service-icons' src={CourseIcon} alt="courses notification" />
                    </div>

                    <div className='service-list-container'>
                        <div>
                            <h4>Students' Interactions</h4>
                            <p>Chat with fellow students for educational collaboration. Share ideas and support each other's learning!</p>
                        </div>
                        <img className='service-icons' src={ChatIcon} alt="students interaction" />
                    </div>
                </div>
            </section>
        </>
    )
}