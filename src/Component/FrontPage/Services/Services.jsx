import React from 'react';
import './Services.css';
import DealsIcon from '../../Images/DealsIcon.png';
import JobIcon from '../../Images/JobIcon.png';
import CVIcon from '../../Images/CVIcon.png';
import CourseIcon from '../../Images/CourseIcon.png';
import ChatIcon from '../../Images/ChatIcon.png';

export default function Services() {
  const services = [
    {
      icon: DealsIcon,
      title: "Deals & Discounts",
      description: "Exclusive discounts on clothing, food, travel, health, and more. Save on what matters most to you!",
      color: "#FF6B6B"
    },
    // {
    //   icon: JobIcon,
    //   title: "Part-time Jobs",
    //   description: "Discover flexible part-time jobs that fit your student life. Boost your income and gain experience!",
    //   color: "#4ECDC4"
    // },
    {
      icon: CVIcon,
      title: "CV Creation",
      description: "Craft a standout CV with our simple tools. Highlight your skills and experience effortlessly!",
      color: "#FFD166"
    },
    {
      icon: CourseIcon,
      title: "Courses",
      description: "Accelerate your growth with instructor-led courses. Gain practical knowledge from professionals!",
      color: "#06D6A0"
    },
    {
      icon: ChatIcon,
      title: "Student Network",
      description: "Interact with fellow students for educational collaboration. Share ideas and support each other!",
      color: "#A78BFA"
    }
  ];

  return (
    <section className='modern-services'>
      <div className="services-background">
        <div className="gradient-overlay"></div>
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }} />
          ))}
        </div>
      </div>

      <div className="services-content">
        <h2 className="services-title">
          <span className="title-accent">Our</span> Services
        </h2>
        <p className="services-subtitle">Discover how we enhance your student experience</p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card"
              style={{ '--card-color': service.color }}
            >
              <div className="card-content">
                <div className="icon-wrapper">
                  <img src={service.icon} alt={service.title} className="service-icon" />
                  <div className="icon-halo"></div>
                </div>
                <h3>{service.title}</h3>
                <div className="card-hover-content">
                  <p>{service.description}</p>
                </div>
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}