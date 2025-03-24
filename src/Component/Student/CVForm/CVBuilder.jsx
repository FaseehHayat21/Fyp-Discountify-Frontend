// import React, { useState } from 'react';
// import Template3 from './Template3'; // Assuming Template3 as an example
// import PDFTemplate3 from './PDFTemplate3'; // PDF version of Template3
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import template3image from "../../assets/template3.png"
// import './CVBuilder.css';

// const CVBuilder = () => {
//     const [selectedTemplate, setSelectedTemplate] = useState(null);
//     const [step, setStep] = useState(1); // For step-by-step form navigation
//     const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' });
//     const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
//     const [skills, setSkills] = useState(['']);
//     const [introduction, setIntroduction] = useState('');
//     const [projects, setProjects] = useState([{ title: '', description: '' }]);
//     const [certificates, setCertificates] = useState([{ title: '', year: '' }]);
//     const handleSubmitCV = async () => {
//         try {

//             console.log("Token retrieved for CV submission:", localStorage.getItem('token'));
//             const response = await fetch('http://localhost:1000/api/auth/cv', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'auth-token': localStorage.getItem('token'),  // Use the token retrieved
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 alert('CV saved successfully!');
//             } else {
//                 alert('Failed to save CV.');
//             }
//         } catch (error) {
//             console.error('Error saving CV:', error);
//             alert('An error occurred while saving your CV.');
//         }
//     };

//     const handleTemplateSelect = (template) => {
//         setSelectedTemplate(template);
//         setStep(1); // Reset form steps if necessary
//     };

//     const handleBackClick = () => {
//         setSelectedTemplate(null); // Deselect the template
//     };

//     const nextStep = () => setStep(step + 1);
//     const prevStep = () => setStep(step - 1);

//     const data = { ...personalInfo, education, skills, introduction, projects, certificates };

//     return (
//         <div className="cv-builder-container">
//             <h1 className='heading-top-routes'>CREATE YOUR  CV</h1>
//             {!selectedTemplate ? (
//                 <div className="template-selection">
//                     <h2>Select a Template</h2>
//                     <div className="template-previews">
//                         <div className="template-option" onClick={() => handleTemplateSelect('template3')}>
//                             <img src={template3image} alt="Template 3" />
//                             <p>Template 3</p>
//                         </div>
//                         {/* Add more templates here */}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="cv-content">
//                     <div className="cv-header-1">
//                         <h2>Build Your CV</h2>
//                         <button className="back-button" onClick={handleBackClick}>
//                             Back to Template Selection
//                         </button>
//                     </div>
//                     <div className="cpb">
//                         <div className="cv-form">
//                             {step === 1 && (
//                                 <div className="section">
//                                     <h3>Personal Information</h3>
//                                     <input
//                                         type="text"
//                                         placeholder="Name"
//                                         className='p-info'
//                                         value={personalInfo.name}
//                                         onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
//                                     />
//                                     <input
//                                         type="email"
//                                         placeholder="Email"
//                                         className='p-info'
//                                         value={personalInfo.email}
//                                         onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
//                                     />
//                                     <input
//                                         type="tel"
//                                         placeholder="Phone"
//                                         value={personalInfo.phone}
//                                         className='p-info'
//                                         onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
//                                     />
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={nextStep}>Next</button>
//                                     </div>
//                                 </div>
//                             )}

//                             {step === 2 && (
//                                 <div className="section">
//                                     <h3>Education</h3>
//                                     {education.map((edu, index) => (
//                                         <div className='' key={index}>
//                                             <input
//                                                 type="text"
//                                                 className='p-info'
//                                                 placeholder="Degree"
//                                                 value={edu.degree}
//                                                 onChange={(e) => {
//                                                     const newEducation = [...education];
//                                                     newEducation[index].degree = e.target.value;
//                                                     setEducation(newEducation);
//                                                 }}
//                                             />
//                                             <input
//                                                 type="text"
//                                                 placeholder="Institution"
//                                                 className='p-info'
//                                                 value={edu.institution}
//                                                 onChange={(e) => {
//                                                     const newEducation = [...education];
//                                                     newEducation[index].institution = e.target.value;
//                                                     setEducation(newEducation);
//                                                 }}
//                                             />
//                                             <input
//                                                 type="text"
//                                                 placeholder="Year"
//                                                 className='p-info'
//                                                 value={edu.year}
//                                                 onChange={(e) => {
//                                                     const newEducation = [...education];
//                                                     newEducation[index].year = e.target.value;
//                                                     setEducation(newEducation);
//                                                 }}
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={() => setEducation([...education, { degree: '', institution: '', year: '' }])}>Add Education</button>
//                                         <button className='cv-button' onClick={prevStep}>Previous</button>
//                                         <button className='cv-button' onClick={nextStep}>Next</button>
//                                     </div>
//                                 </div>
//                             )}


//                             {step === 3 && (
//                                 <div className="section">
//                                     <h3>Skills</h3>
//                                     {skills.map((skill, index) => (
//                                         <input
//                                             key={index}
//                                             type="text"
//                                             placeholder="Skill"
//                                             className='p-info'
//                                             value={skill}
//                                             onChange={(e) => {
//                                                 const newSkills = [...skills];
//                                                 newSkills[index] = e.target.value;
//                                                 setSkills(newSkills);
//                                             }}
//                                         />
//                                     ))}
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={() => setSkills([...skills, ''])}>Add Skill</button>
//                                         <button className='cv-button' onClick={prevStep}>Previous</button>
//                                         <button className='cv-button' onClick={nextStep}>Next</button>
//                                     </div>
//                                 </div>
//                             )}


//                             {step === 4 && (
//                                 <div className="section">
//                                     <h3>Brief Introduction</h3>
//                                     <textarea
//                                         placeholder="Introduce Yourself"
//                                         className='p-info'
//                                         value={introduction}
//                                         onChange={(e) => setIntroduction(e.target.value)}
//                                     />
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={prevStep}>Previous</button>
//                                         <button className='cv-button' onClick={nextStep}>Next</button>
//                                     </div>
//                                 </div>
//                             )}


//                             {step === 5 && (
//                                 <div className="section">
//                                     <h3>Projects</h3>
//                                     {projects.map((project, index) => (
//                                         <div key={index}>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Project Title"
//                                                 className='p-info'
//                                                 value={project.title}
//                                                 onChange={(e) => {
//                                                     const newProjects = [...projects];
//                                                     newProjects[index].title = e.target.value;
//                                                     setProjects(newProjects);
//                                                 }}
//                                             />
//                                             <textarea
//                                                 placeholder="Project Description"
//                                                 className='p-info'
//                                                 value={project.description}
//                                                 onChange={(e) => {
//                                                     const newProjects = [...projects];
//                                                     newProjects[index].description = e.target.value;
//                                                     setProjects(newProjects);
//                                                 }}
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={() => setProjects([...projects, { title: '', description: '' }])}>Add Project</button>
//                                         <button className='cv-button' onClick={prevStep}>Previous</button>
//                                         <button className='cv-button' onClick={nextStep}>Next</button>
//                                     </div>
//                                 </div>
//                             )}

//                             {step === 6 && (
//                                 <div className="section">
//                                     <h3>Certificates</h3>
//                                     {certificates.map((cert, index) => (
//                                         <div key={index}>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Certificate Title"
//                                                 className='p-info'
//                                                 value={cert.title}
//                                                 onChange={(e) => {
//                                                     const newCertificates = [...certificates];
//                                                     newCertificates[index].title = e.target.value;
//                                                     setCertificates(newCertificates);
//                                                 }}
//                                             />
//                                             <input
//                                                 type="text"
//                                                 placeholder="Year"
//                                                 className='p-info'
//                                                 value={cert.year}
//                                                 onChange={(e) => {
//                                                     const newCertificates = [...certificates];
//                                                     newCertificates[index].year = e.target.value;
//                                                     setCertificates(newCertificates);
//                                                 }}
//                                             />
//                                         </div>
//                                     ))}
//                                     <div className='cv-pagebuttons'>
//                                         <button className='cv-button' onClick={() => setCertificates([...certificates, { title: '', year: '' }])}>Add Certificate</button>
//                                         <button className='cv-button' onClick={prevStep}>Previous</button>
//                                         <button className='cv-button' onClick={() => { setStep(7); handleSubmitCV(); }}>
//                                             Finish & Save
//                                         </button>

//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="cv-preview">
//                             <h2>Preview</h2>
//                             {selectedTemplate === 'template3' && <Template3 data={data} />}
//                             {step === 7 && (
//                                 <PDFDownloadLink
//                                     document={<PDFTemplate3 data={data} />}
//                                     fileName="cv.pdf"
//                                     className="download-link"
//                                 >
//                                     {({ loading }) => (loading ? 'Loading document...' : 'Download CV as PDF')}
//                                 </PDFDownloadLink>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CVBuilder;
import React, { useState } from 'react';
import Template3 from './Template3'; // Assuming Template3 as an example
import Template2 from './Template2'; // Assuming Template2 as an example
import PDFTemplate3 from './PDFTemplate3'; // PDF version of Template3
import PDFTemplate1 from './PDFTemplate1'; // PDF version of Template2
import { PDFDownloadLink } from '@react-pdf/renderer';
import template3image from "../../../assets/template3.png";
import './CVBuilder.css';

const CVBuilder = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [step, setStep] = useState(1); // For step-by-step form navigation
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' });
    const [education, setEducation] = useState([{ degree: '', institution: '', year: '' }]);
    const [skills, setSkills] = useState(['']);
    const [introduction, setIntroduction] = useState('');
    const [projects, setProjects] = useState([{ title: '', description: '' }]);
    const [certificates, setCertificates] = useState([{ title: '', year: '' }]);

    const handleSubmitCV = async () => {
        try {
            console.log("Token retrieved for CV submission:", localStorage.getItem('token'));
            const response = await fetch('http://localhost:1000/api/auth/cv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),  // Use the token retrieved
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

    const data = { ...personalInfo, education, skills, introduction, projects, certificates };

    return (
        <div className="cv-builder-container">
            <h1 className='heading-top-routes'>CREATE YOUR CV</h1>
            {step <= 6 ? (
                <div className="cv-content">
                    <div className="cv-header-1">
                        <h2>Build Your CV</h2>
                    </div>
                    <div className="cpb">
                        <div className="cv-form">
                            {step === 1 && (
                                <div className="section">
                                    <h3>Personal Information</h3>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className='p-info'
                                        value={personalInfo.name}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className='p-info'
                                        value={personalInfo.email}
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        value={personalInfo.phone}
                                        className='p-info'
                                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                    />
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="section">
                                    <h3>Education</h3>
                                    {education.map((edu, index) => (
                                        <div className='' key={index}>
                                            <input
                                                type="text"
                                                className='p-info'
                                                placeholder="Degree"
                                                value={edu.degree}
                                                onChange={(e) => {
                                                    const newEducation = [...education];
                                                    newEducation[index].degree = e.target.value;
                                                    setEducation(newEducation);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                className='p-info'
                                                value={edu.institution}
                                                onChange={(e) => {
                                                    const newEducation = [...education];
                                                    newEducation[index].institution = e.target.value;
                                                    setEducation(newEducation);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                className='p-info'
                                                value={edu.year}
                                                onChange={(e) => {
                                                    const newEducation = [...education];
                                                    newEducation[index].year = e.target.value;
                                                    setEducation(newEducation);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={() => setEducation([...education, { degree: '', institution: '', year: '' }])}>Add Education</button>
                                        <button className='cv-button' onClick={prevStep}>Previous</button>
                                        <button className='cv-button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="section">
                                    <h3>Skills</h3>
                                    {skills.map((skill, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder="Skill"
                                            className='p-info'
                                            value={skill}
                                            onChange={(e) => {
                                                const newSkills = [...skills];
                                                newSkills[index] = e.target.value;
                                                setSkills(newSkills);
                                            }}
                                        />
                                    ))}
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={() => setSkills([...skills, ''])}>Add Skill</button>
                                        <button className='cv-button' onClick={prevStep}>Previous</button>
                                        <button className='cv-button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="section">
                                    <h3>Brief Introduction</h3>
                                    <textarea
                                        placeholder="Introduce Yourself"
                                        className='p-info'
                                        value={introduction}
                                        onChange={(e) => setIntroduction(e.target.value)}
                                    />
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={prevStep}>Previous</button>
                                        <button className='cv-button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="section">
                                    <h3>Projects</h3>
                                    {projects.map((project, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                placeholder="Project Title"
                                                className='p-info'
                                                value={project.title}
                                                onChange={(e) => {
                                                    const newProjects = [...projects];
                                                    newProjects[index].title = e.target.value;
                                                    setProjects(newProjects);
                                                }}
                                            />
                                            <textarea
                                                placeholder="Project Description"
                                                className='p-info'
                                                value={project.description}
                                                onChange={(e) => {
                                                    const newProjects = [...projects];
                                                    newProjects[index].description = e.target.value;
                                                    setProjects(newProjects);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={() => setProjects([...projects, { title: '', description: '' }])}>Add Project</button>
                                        <button className='cv-button' onClick={prevStep}>Previous</button>
                                        <button className='cv-button' onClick={nextStep}>Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 6 && (
                                <div className="section">
                                    <h3>Certificates</h3>
                                    {certificates.map((cert, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                placeholder="Certificate Title"
                                                className='p-info'
                                                value={cert.title}
                                                onChange={(e) => {
                                                    const newCertificates = [...certificates];
                                                    newCertificates[index].title = e.target.value;
                                                    setCertificates(newCertificates);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                className='p-info'
                                                value={cert.year}
                                                onChange={(e) => {
                                                    const newCertificates = [...certificates];
                                                    newCertificates[index].year = e.target.value;
                                                    setCertificates(newCertificates);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className='cv-pagebuttons'>
                                        <button className='cv-button' onClick={() => setCertificates([...certificates, { title: '', year: '' }])}>Add Certificate</button>
                                        <button className='cv-button' onClick={prevStep}>Previous</button>
                                        <button className='cv-button' onClick={nextStep}>Finish</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="template-selection">
                    <h2>Select a Template</h2>
                    <div className="template-previews">
                    <div className="template-option" onClick={() => handleTemplateSelect('template2')}>
                            <img src={template3image} alt="Template 2" />
                            <p>Template 2</p>
                        </div>
                        <div className="template-option" onClick={() => handleTemplateSelect('template3')}>
                            <img src={template3image} alt="Template 3" />
                            <p>Template 3</p>
                        </div>

                        {/* Add more templates here */}
                    </div>
                </div>
            )}

            {selectedTemplate && (
                <div className="cv-preview">
                    <h2>Preview</h2>
                    {selectedTemplate === 'template2' && <Template2 data={data} />}
                    {selectedTemplate === 'template3' && <Template3 data={data} />}

                    <PDFDownloadLink
                        document={
                          
                            selectedTemplate === 'template2' ? <PDFTemplate1 data={data} /> :
                            selectedTemplate === 'template3' ? <PDFTemplate3 data={data} /> :
    
                            null
                        }
                        fileName="cv.pdf"
                        className="download-link"
                    >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download CV as PDF')}
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default CVBuilder;