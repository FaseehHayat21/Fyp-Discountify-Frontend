import React from 'react';
import './Template3.css';

const Template3 = ({ data }) => {
    return (
        <div className="cv-template">
            <header className="cv-header">
                <h1>{data.name}</h1>
                <p>{data.email} | {data.phone}</p>
            </header>

            <section className="cv-section">
                <h2>Brief Introduction</h2>
                <p>{data.introduction}</p>
            </section>

            <section className="cv-section">
                <h2>Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <h3>{edu.degree}</h3>
                        <p>{edu.institution} — {edu.year}</p>
                    </div>
                ))}
            </section>

            <section className="cv-section">
                <h2>Skills</h2>
                <ul className="skills-list">
                    {data.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </section>

            <section className="cv-section">
                <h2>Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="project-item">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>

            <section className="cv-section">
                <h2>Certificates</h2>
                {data.certificates.map((cert, index) => (
                    <div key={index} className="certificate-item">
                        <h3>{cert.title}</h3>
                        <p>{cert.year}</p>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Template3;
