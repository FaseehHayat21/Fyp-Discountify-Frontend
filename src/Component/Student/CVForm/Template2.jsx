import React from 'react';
import './Template2.css'; // Import the corresponding CSS file

const Template2 = ({ data }) => {
    return (
        <div className="ats-cv-template">
            {/* Header Section */}
            <header className="ats-cv-header">
                <h1>{data.name}</h1>
                <p>{data.email} | {data.phone}</p>
            </header>

            {/* Brief Introduction Section */}
            <section className="ats-cv-section">
                <h2>Summary</h2>
                <p>{data.introduction}</p>
            </section>

            {/* Education Section */}
            <section className="ats-cv-section">
                <h2>Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="ats-education-item">
                        <h3>{edu.degree}</h3>
                        <p>{edu.institution} — {edu.year}</p>
                    </div>
                ))}
            </section>

            {/* Skills Section */}
            <section className="ats-cv-section">
                <h2>Skills</h2>
                <ul className="ats-skills-list">
                    {data.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>

            {/* Projects Section */}
            <section className="ats-cv-section">
                <h2>Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="ats-project-item">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>

            {/* Certificates Section */}
            <section className="ats-cv-section">
                <h2>Certifications</h2>
                {data.certificates.map((cert, index) => (
                    <div key={index} className="ats-certificate-item">
                        <h3>{cert.title}</h3>
                        <p>{cert.year}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Template2;