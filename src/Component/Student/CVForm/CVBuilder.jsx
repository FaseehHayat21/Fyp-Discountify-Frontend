import React, { useState } from 'react';
import Template3 from './Template3';
import Template2 from './Template2';
import PDFTemplate3 from './PDFTemplate3';
import PDFTemplate1 from './PDFTemplate1';
import { PDFDownloadLink } from '@react-pdf/renderer';
import template3image from "../../../assets/template3.png";
import { FiArrowRight, FiArrowLeft, FiPlus, FiTrash2, FiDownload } from 'react-icons/fi';
import './CVBuilder.css';

const CVBuilder = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [step, setStep] = useState(1);
    const [personalInfo, setPersonalInfo] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        address: '',
        linkedin: '',
        portfolio: ''
    });
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '', description: '' }]);
    const [skills, setSkills] = useState(['']);
    const [introduction, setIntroduction] = useState('');
    const [projects, setProjects] = useState([{ title: '', description: '', technologies: '' }]);
    const [certificates, setCertificates] = useState([{ title: '', year: '', issuer: '' }]);
    const [workExperience, setWorkExperience] = useState([{ 
        position: '', 
        company: '', 
        duration: '',
        description: ''
    }]);

    const handleSubmitCV = async () => {
        try {
            const response = await fetch('http://localhost:1000/api/auth/cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('CV saved successfully!');
            } else {
                alert('Failed to save CV.');
            }
        } catch (error) {
            console.error('Error saving CV:', error);
            alert('An error occurred while saving your CV.');
        }
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const data = { 
        ...personalInfo, 
        education, 
        skills, 
        introduction, 
        projects, 
        certificates,
        workExperience
    };

    return (
        <div className="cv-builder">
            <div className="cv-header">
                <h1 className="cv-title">Create Your Professional CV</h1>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${(step / 7) * 100}%` }}></div>
                    <span className="progress-text">Step {step} of 7</span>
                </div>
            </div>

            <div className="cv-container">
                {step <= 7 ? (
                    <div className="cv-form-container">
                        <div className="form-stepper">
                            {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => (
                                <div 
                                    key={stepNum} 
                                    className={`step ${step === stepNum ? 'active' : ''} ${step > stepNum ? 'completed' : ''}`}
                                    onClick={() => step > stepNum && setStep(stepNum)}
                                >
                                    <div className="step-number">{stepNum}</div>
                                    <div className="step-label">
                                        {stepNum === 1 && 'Personal Info'}
                                        {stepNum === 2 && 'Education'}
                                        {stepNum === 3 && 'Experience'}
                                        {stepNum === 4 && 'Skills'}
                                        {stepNum === 5 && 'Projects'}
                                        {stepNum === 6 && 'Certificates'}
                                        {stepNum === 7 && 'Introduction'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="form-content">
                            {step === 1 && (
                                <div className="form-section">
                                    <h2 className="section-title">Personal Information</h2>
                                    <div className="form-grid">
                                        <div className="input-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                value={personalInfo.name}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={personalInfo.email}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                value={personalInfo.phone}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                value={personalInfo.address}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                                                placeholder="City, Country"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>LinkedIn</label>
                                            <input
                                                type="url"
                                                value={personalInfo.linkedin}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                                                placeholder="linkedin.com/in/yourname"
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Portfolio</label>
                                            <input
                                                type="url"
                                                value={personalInfo.portfolio}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                                                placeholder="yourportfolio.com"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="form-section">
                                    <h2 className="section-title">Education</h2>
                                    {education.map((edu, index) => (
                                        <div className="form-group" key={index}>
                                            <div className="form-row">
                                                <div className="input-group">
                                                    <label>Degree</label>
                                                    <input
                                                        type="text"
                                                        value={edu.degree}
                                                        onChange={(e) => {
                                                            const newEducation = [...education];
                                                            newEducation[index].degree = e.target.value;
                                                            setEducation(newEducation);
                                                        }}
                                                        placeholder="Bachelor of Science"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Institution</label>
                                                    <input
                                                        type="text"
                                                        value={edu.institution}
                                                        onChange={(e) => {
                                                            const newEducation = [...education];
                                                            newEducation[index].institution = e.target.value;
                                                            setEducation(newEducation);
                                                        }}
                                                        placeholder="University Name"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Year</label>
                                                    <input
                                                        type="text"
                                                        value={edu.year}
                                                        onChange={(e) => {
                                                            const newEducation = [...education];
                                                            newEducation[index].year = e.target.value;
                                                            setEducation(newEducation);
                                                        }}
                                                        placeholder="2015 - 2019"
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label>Description</label>
                                                <textarea
                                                    value={edu.description}
                                                    onChange={(e) => {
                                                        const newEducation = [...education];
                                                        newEducation[index].description = e.target.value;
                                                        setEducation(newEducation);
                                                    }}
                                                    placeholder="Relevant coursework, achievements, etc."
                                                    rows="3"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => {
                                                        const newEducation = [...education];
                                                        newEducation.splice(index, 1);
                                                        setEducation(newEducation);
                                                    }}
                                                >
                                                    <FiTrash2 /> Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        className="add-btn"
                                        onClick={() => setEducation([...education, { degree: '', institution: '', year: '', description: '' }])}
                                    >
                                        <FiPlus /> Add Education
                                    </button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="form-section">
                                    <h2 className="section-title">Work Experience</h2>
                                    {workExperience.map((exp, index) => (
                                        <div className="form-group" key={index}>
                                            <div className="form-row">
                                                <div className="input-group">
                                                    <label>Position</label>
                                                    <input
                                                        type="text"
                                                        value={exp.position}
                                                        onChange={(e) => {
                                                            const newExp = [...workExperience];
                                                            newExp[index].position = e.target.value;
                                                            setWorkExperience(newExp);
                                                        }}
                                                        placeholder="Software Engineer"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Company</label>
                                                    <input
                                                        type="text"
                                                        value={exp.company}
                                                        onChange={(e) => {
                                                            const newExp = [...workExperience];
                                                            newExp[index].company = e.target.value;
                                                            setWorkExperience(newExp);
                                                        }}
                                                        placeholder="Tech Corp Inc."
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Duration</label>
                                                    <input
                                                        type="text"
                                                        value={exp.duration}
                                                        onChange={(e) => {
                                                            const newExp = [...workExperience];
                                                            newExp[index].duration = e.target.value;
                                                            setWorkExperience(newExp);
                                                        }}
                                                        placeholder="Jun 2020 - Present"
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label>Description</label>
                                                <textarea
                                                    value={exp.description}
                                                    onChange={(e) => {
                                                        const newExp = [...workExperience];
                                                        newExp[index].description = e.target.value;
                                                        setWorkExperience(newExp);
                                                    }}
                                                    placeholder="Responsibilities and achievements"
                                                    rows="4"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => {
                                                        const newExp = [...workExperience];
                                                        newExp.splice(index, 1);
                                                        setWorkExperience(newExp);
                                                    }}
                                                >
                                                    <FiTrash2 /> Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        className="add-btn"
                                        onClick={() => setWorkExperience([...workExperience, { position: '', company: '', duration: '', description: '' }])}
                                    >
                                        <FiPlus /> Add Experience
                                    </button>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="form-section">
                                    <h2 className="section-title">Skills</h2>
                                    <div className="skills-grid">
                                        {skills.map((skill, index) => (
                                            <div className="skill-input-group" key={index}>
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={(e) => {
                                                        const newSkills = [...skills];
                                                        newSkills[index] = e.target.value;
                                                        setSkills(newSkills);
                                                    }}
                                                    placeholder="JavaScript, React, etc."
                                                />
                                                {index > 0 && (
                                                    <button 
                                                        className="skill-remove-btn"
                                                        onClick={() => {
                                                            const newSkills = [...skills];
                                                            newSkills.splice(index, 1);
                                                            setSkills(newSkills);
                                                        }}
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className="add-btn"
                                        onClick={() => setSkills([...skills, ''])}
                                    >
                                        <FiPlus /> Add Skill
                                    </button>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="form-section">
                                    <h2 className="section-title">Projects</h2>
                                    {projects.map((project, index) => (
                                        <div className="form-group" key={index}>
                                            <div className="input-group">
                                                <label>Project Title</label>
                                                <input
                                                    type="text"
                                                    value={project.title}
                                                    onChange={(e) => {
                                                        const newProjects = [...projects];
                                                        newProjects[index].title = e.target.value;
                                                        setProjects(newProjects);
                                                    }}
                                                    placeholder="E-commerce Website"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Technologies Used</label>
                                                <input
                                                    type="text"
                                                    value={project.technologies}
                                                    onChange={(e) => {
                                                        const newProjects = [...projects];
                                                        newProjects[index].technologies = e.target.value;
                                                        setProjects(newProjects);
                                                    }}
                                                    placeholder="React, Node.js, MongoDB"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label>Description</label>
                                                <textarea
                                                    value={project.description}
                                                    onChange={(e) => {
                                                        const newProjects = [...projects];
                                                        newProjects[index].description = e.target.value;
                                                        setProjects(newProjects);
                                                    }}
                                                    placeholder="Project details and your contributions"
                                                    rows="4"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => {
                                                        const newProjects = [...projects];
                                                        newProjects.splice(index, 1);
                                                        setProjects(newProjects);
                                                    }}
                                                >
                                                    <FiTrash2 /> Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        className="add-btn"
                                        onClick={() => setProjects([...projects, { title: '', description: '', technologies: '' }])}
                                    >
                                        <FiPlus /> Add Project
                                    </button>
                                </div>
                            )}

                            {step === 6 && (
                                <div className="form-section">
                                    <h2 className="section-title">Certificates</h2>
                                    {certificates.map((cert, index) => (
                                        <div className="form-group" key={index}>
                                            <div className="form-row">
                                                <div className="input-group">
                                                    <label>Certificate Title</label>
                                                    <input
                                                        type="text"
                                                        value={cert.title}
                                                        onChange={(e) => {
                                                            const newCerts = [...certificates];
                                                            newCerts[index].title = e.target.value;
                                                            setCertificates(newCerts);
                                                        }}
                                                        placeholder="AWS Certified Developer"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Issuer</label>
                                                    <input
                                                        type="text"
                                                        value={cert.issuer}
                                                        onChange={(e) => {
                                                            const newCerts = [...certificates];
                                                            newCerts[index].issuer = e.target.value;
                                                            setCertificates(newCerts);
                                                        }}
                                                        placeholder="Amazon Web Services"
                                                    />
                                                </div>
                                                <div className="input-group">
                                                    <label>Year</label>
                                                    <input
                                                        type="text"
                                                        value={cert.year}
                                                        onChange={(e) => {
                                                            const newCerts = [...certificates];
                                                            newCerts[index].year = e.target.value;
                                                            setCertificates(newCerts);
                                                        }}
                                                        placeholder="2022"
                                                    />
                                                </div>
                                            </div>
                                            {index > 0 && (
                                                <button 
                                                    className="remove-btn"
                                                    onClick={() => {
                                                        const newCerts = [...certificates];
                                                        newCerts.splice(index, 1);
                                                        setCertificates(newCerts);
                                                    }}
                                                >
                                                    <FiTrash2 /> Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button 
                                        className="add-btn"
                                        onClick={() => setCertificates([...certificates, { title: '', year: '', issuer: '' }])}
                                    >
                                        <FiPlus /> Add Certificate
                                    </button>
                                </div>
                            )}

                            {step === 7 && (
                                <div className="form-section">
                                    <h2 className="section-title">Professional Summary</h2>
                                    <div className="input-group">
                                        <label>Write a brief introduction about yourself</label>
                                        <textarea
                                            value={introduction}
                                            onChange={(e) => setIntroduction(e.target.value)}
                                            placeholder="Passionate software engineer with 5+ years of experience in web development..."
                                            rows="8"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-navigation">
                                {step > 1 && (
                                    <button className="nav-btn prev-btn" onClick={prevStep}>
                                        <FiArrowLeft /> Previous
                                    </button>
                                )}
                                {step < 7 ? (
                                    <button className="nav-btn next-btn" onClick={nextStep}>
                                        Next <FiArrowRight />
                                    </button>
                                ) : (
                                    <button className="nav-btn finish-btn" onClick={nextStep}>
                                        Finish & Choose Template
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="template-selection-container">
                        <h2 className="section-title">Select Your CV Template</h2>
                        <p className="template-subtitle">Choose a design that best represents your professional brand</p>
                        
                        <div className="template-grid">
                            <div 
                                className={`template-card ${selectedTemplate === 'template2' ? 'selected' : ''}`}
                                onClick={() => handleTemplateSelect('template2')}
                            >
                                <div className="template-preview">
                                    <img src={template3image} alt="Template 2" />
                                </div>
                                <div className="template-info">
                                    <h3>Modern Professional</h3>
                                    <p>Clean, contemporary design with a focus on readability</p>
                                </div>
                            </div>
                            
                            <div 
                                className={`template-card ${selectedTemplate === 'template3' ? 'selected' : ''}`}
                                onClick={() => handleTemplateSelect('template3')}
                            >
                                <div className="template-preview">
                                    <img src={template3image} alt="Template 3" />
                                </div>
                                <div className="template-info">
                                    <h3>Creative Minimalist</h3>
                                    <p>Stylish layout with visual elements for creative fields</p>
                                </div>
                            </div>
                        </div>

                        <button className="back-btn" onClick={() => setStep(7)}>
                            <FiArrowLeft /> Back to Form
                        </button>
                    </div>
                )}

                {selectedTemplate && (
                    <div className="cv-preview-container">
                        <div className="preview-header">
                            <h2>CV Preview</h2>
                            <div className="preview-actions">
                                <PDFDownloadLink
                                    document={
                                        selectedTemplate === 'template2' ? <PDFTemplate1 data={data} /> :
                                        selectedTemplate === 'template3' ? <PDFTemplate3 data={data} /> :
                                        null
                                    }
                                    fileName="professional_cv.pdf"
                                    className="download-btn"
                                >
                                    {({ loading }) => (
                                        loading ? 'Generating PDF...' : (
                                            <>
                                                <FiDownload /> Download PDF
                                            </>
                                        )
                                    )}
                                </PDFDownloadLink>
                                <button className="save-btn" onClick={handleSubmitCV}>
                                    Save to Profile
                                </button>
                            </div>
                        </div>
                        
                        <div className="preview-content">
                            {selectedTemplate === 'template2' && <Template2 data={data} />}
                            {selectedTemplate === 'template3' && <Template3 data={data} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVBuilder;