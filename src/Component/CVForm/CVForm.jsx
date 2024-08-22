import React, { useState } from 'react';
import './CVForm.css'; // Import the CSS file
import Template3 from './Template3';    
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';

const CVForm = () => {
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' });
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
    const [skills, setSkills] = useState(['']);
    const [introduction, setIntroduction] = useState('');
    const [projects, setProjects] = useState([{ title: '', description: '' }]);
    const [certificates, setCertificates] = useState([{ title: '', year: '' }]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo({ ...personalInfo, [name]: value });
    };

    const handleEducationChange = (index, e) => {
        const newEducation = education.map((edu, eduIndex) => {
            if (index === eduIndex) {
                return { ...edu, [e.target.name]: e.target.value };
            }
            return edu;
        });
        setEducation(newEducation);
    };

    const handleSkillsChange = (index, e) => {
        const newSkills = skills.map((skill, skillIndex) => {
            if (index === skillIndex) {
                return e.target.value;
            }
            return skill;
        });
        setSkills(newSkills);
    };

    const handleProjectsChange = (index, e) => {
        const newProjects = projects.map((project, projIndex) => {
            if (index === projIndex) {
                return { ...project, [e.target.name]: e.target.value };
            }
            return project;
        });
        setProjects(newProjects);
    };

    const handleCertificatesChange = (index, e) => {
        const newCertificates = certificates.map((cert, certIndex) => {
            if (index === certIndex) {
                return { ...cert, [e.target.name]: e.target.value };
            }
            return cert;
        });
        setCertificates(newCertificates);
    };

    const addEducation = () => setEducation([...education, { degree: '', institution: '', year: '' }]);
    const addSkill = () => setSkills([...skills, '']);
    const addProject = () => setProjects([...projects, { title: '', description: '' }]);
    const addCertificate = () => setCertificates([...certificates, { title: '', year: '' }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const renderSelectedTemplate = () => {
        const data = { ...personalInfo, education, skills, introduction, projects, certificates };
        if (selectedTemplate === 'template1') return <Template1 data={data} />;
        if (selectedTemplate === 'template2') return <Template2 data={data} />;
        if (selectedTemplate === 'template3') return <Template3 data={data} />;
        return null;
    };

    const MyDocument = (
        <Document>
            <Page size="A4">
                <View>
                    <Text>{renderSelectedTemplate()}</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <div className="template-selection">
                <h2>Select a Template</h2>
                <div className="template-previews">
                    <div className="template-option" onClick={() => setSelectedTemplate('template1')}>
                        <img src="template1-preview.jpg" alt="Template 1" />
                        <p>Template 1</p>
                    </div>
                    <div className="template-option" onClick={() => setSelectedTemplate('template2')}>
                        <img src="template2-preview.jpg" alt="Template 2" />
                        <p>Template 2</p>
                    </div>
                    <div className="template-option" onClick={() => setSelectedTemplate('template3')}>
                        <img src="template3-preview.jpg" alt="Template 3" />
                        <p>Template 3</p>
                    </div>
                </div>
            </div>

            {!submitted && (
                <form className="cv-form-container" onSubmit={handleSubmit}>
                    <div className="section">
                        <h2 className="section-title">Personal Information</h2>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={personalInfo.name}
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={personalInfo.email}
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Phone"
                                value={personalInfo.phone}
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Education</h2>
                        {education.map((edu, index) => (
                            <div className="form-group input-group" key={index}>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    value={edu.year}
                                    onChange={(e) => handleEducationChange(index, e)}
                                />
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addEducation}>Add Education</button>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Skills</h2>
                        {skills.map((skill, index) => (
                            <div className="form-group" key={index}>
                                <input
                                    type="text"
                                    placeholder="Skill"
                                    value={skill}
                                    onChange={(e) => handleSkillsChange(index, e)}
                                />
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addSkill}>Add Skill</button>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Brief Introduction</h2>
                        <div className="form-group">
                            <textarea
                                name="introduction"
                                placeholder="Introduce Yourself"
                                value={introduction}
                                onChange={(e) => setIntroduction(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Projects</h2>
                        {projects.map((project, index) => (
                            <div className="form-group input-group" key={index}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) => handleProjectsChange(index, e)}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Project Description"
                                    value={project.description}
                                    onChange={(e) => handleProjectsChange(index, e)}
                                />
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addProject}>Add Project</button>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Certificates</h2>
                        {certificates.map((cert, index) => (
                            <div className="form-group input-group" key={index}>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Certificate Title"
                                    value={cert.title}
                                    onChange={(e) => handleCertificatesChange(index, e)}
                                />
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    value={cert.year}
                                    onChange={(e) => handleCertificatesChange(index, e)}
                                />
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addCertificate}>Add Certificate</button>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            )}

            {submitted && selectedTemplate && (
                <div>
                    <div>{renderSelectedTemplate()}</div>
                    <PDFDownloadLink document={MyDocument} fileName="cv.pdf">
                        {({ loading }) => (loading ? 'Loading document...' : 'Download CV as PDF')}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default CVForm;
