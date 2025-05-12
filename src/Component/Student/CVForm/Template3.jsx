import React from 'react';
import './Template3.css';

const Template3 = ({ data }) => {
    const { name, email, phone, portfolio, linkedin, introduction, education, skills, projects, certificates } = data;

    return (
        <div className="cv-template3">
            {/* Header */}
            <header className="cv-header3">
                <h1>{name}</h1>
                <p className="cv-contact">
                    {email} | {phone}<br />
                    <a href={portfolio} target="_blank" rel="noopener noreferrer">{portfolio}</a> | 
                    <a href={linkedin} target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                </p>
            </header>

            {/* Introduction */}
            {introduction && (
                <section className="cv-section">
                    <h2>Brief Introduction</h2>
                    <p className="cv-intro">{introduction}</p>
                </section>
            )}

            <div className="cv-columns">
                <div className="cv-left">
                    {/* Education */}
                    {education?.length > 0 && (
                        <section className="cv-section">
                            <h2>Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} className="cv-item">
                                    <h3 className="cv-item-title">{edu.degree}</h3>
                                    <p className="cv-subtext">{edu.institution} — {edu.year}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section className="cv-section">
                            <h2>Skills</h2>
                            <div className="cv-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="cv-skill">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="cv-right">
                    {/* Projects */}
                    {projects?.length > 0 && (
                        <section className="cv-section">
                            <h2>Projects</h2>
                            {projects.map((project, index) => (
                                <div key={index} className="cv-item">
                                    <h3 className="cv-item-title">{project.title}</h3>
                                    <p className="cv-subtext">{project.description}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certificates */}
                    {certificates?.length > 0 && (
                        <section className="cv-section">
                            <h2>Certificates</h2>
                            {certificates.map((cert, index) => (
                                <div key={index} className="cv-item">
                                    <h3 className="cv-item-title">{cert.title}</h3>
                                    <p className="cv-subtext">{cert.year}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Template3;
