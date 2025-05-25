import React from 'react';
import './Template4.css';

const Template4 = ({ data }) => {
    const {
        name, email, phone, linkedin, summary,
        experience, education, skills, certificates, projects
    } = data;

    return (
        <div className="template4-container">
            {/* Header */}
            <header className="template4-header">
                <h1>{name}</h1>
                <h2>Full Stack Web Developer</h2>
                <p>{phone} | {email} | <a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            </header>

            <div className="template4-body">
                {/* Left Sidebar */}
                <aside className="template4-left">
                    {/* Certification */}
                    {certificates?.length > 0 && (
                        <section>
                            <h3>Certification</h3>
                            <ul>
                                {certificates.map((cert, index) => (
                                    <li key={index}>{cert.title}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h3>Skills</h3>
                            <div className="template4-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="skill-badge">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education?.length > 0 && (
                        <section>
                            <h3>Education</h3>
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <strong>{edu.degree}</strong>
                                    <p>{edu.institution} — {edu.year}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </aside>

                {/* Right Main Content */}
                <main className="template4-right">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h3>Summary</h3>
                            <p>{summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience?.length > 0 && (
                        <section>
                            <h3>Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <strong>{exp.title}</strong> at <em>{exp.company}</em><br />
                                    <span>{exp.duration} — {exp.location}</span>
                                    <ul>
                                        {exp.description.map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {projects?.length > 0 && (
                        <section>
                            <h3>Projects</h3>
                            {projects.map((project, index) => (
                                <div key={index}>
                                    <strong>{project.title}</strong>
                                    <p>{project.description}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Template4;
