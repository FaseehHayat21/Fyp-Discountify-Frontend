import React from 'react';
import './Template2.css';

const Template2 = ({ data }) => {
    return (
        <div className="t2-container">
            {/* Header Section */}
            <header className="t2-header">
                <h1 className="t2-name">{data.name}</h1>
                <p className="t2-contact-info">
                    {data.email} | {data.phone} | {data.portfolio} | {data.linkedin}
                </p>
            </header>

            {/* Summary Section */}
            <section className="t2-section">
                <h2 className="t2-section-title">Summary</h2>
                <p className="t2-text">{data.introduction}</p>
            </section>

            {/* Education Section */}
            <section className="t2-section">
                <h2 className="t2-section-title">Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="t2-education-item">
                        <h3 className="t2-degree">{edu.degree}</h3>
                        <p className="t2-text">{edu.institution} — {edu.year}</p>
                    </div>
                ))}
            </section>

            {/* Skills Section */}
            <section className="t2-section">
                <h2 className="t2-section-title">Skills</h2>
                <ul className="t2-skills-list">
                    {data.skills.map((skill, index) => (
                        <li key={index} className="t2-skill-item">{skill}</li>
                    ))}
                </ul>
            </section>

            {/* Projects Section */}
            <section className="t2-section">
                <h2 className="t2-section-title">Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="t2-project-item">
                        <h3 className="t2-project-title">{project.title}</h3>
                        <p className="t2-text">{project.description}</p>
                    </div>
                ))}
            </section>

            {/* Certificates Section */}
            <section className="t2-section">
                <h2 className="t2-section-title">Certifications</h2>
                {data.certificates.map((cert, index) => (
                    <div key={index} className="t2-certificate-item">
                        <h3 className="t2-certificate-title">{cert.title}</h3>
                        <p className="t2-text">{cert.year}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Template2;