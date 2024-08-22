import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentSideBar from '../../Component/StudentSideBar/StudentSideBar';
import "./StudentPage.css"
import DealsAndDiscount from '../../Component/DealsAndDiscount/DealsAndDiscount';
import CourseListing from '../../Component/CourseListing/CourseListing';
import JobListing from '../../Component/JobListing/JobListing';
import AddPostStudent from '../../Component/AddPostStudent/AddPostStudent';
import { Outlet } from 'react-router-dom';
export default function StudentPage() {
  return (
    <>
    <div className="App">
       
          <div className="sidebar-s">
          <StudentSideBar/>
          </div>
          <div className="content">
            <Outlet />
          </div>
       
      </div>
   
    </>
  )
}
/*
   <div className="cv-form">
                        {step === 1 && (
                            <div className="section">
                                <h3>Personal Information</h3>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={personalInfo.name}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={personalInfo.email}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={personalInfo.phone}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                />
                                <button onClick={nextStep}>Next</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="section">
                                <h3>Education</h3>
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
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
                                            value={edu.year}
                                            onChange={(e) => {
                                                const newEducation = [...education];
                                                newEducation[index].year = e.target.value;
                                                setEducation(newEducation);
                                            }}
                                        />
                                    </div>
                                ))}
                                <button onClick={() => setEducation([...education, { degree: '', institution: '', year: '' }])}>Add Education</button>
                                <button onClick={prevStep}>Previous</button>
                                <button onClick={nextStep}>Next</button>
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
                                      value={skill}
                                      onChange={(e) => {
                                          const newSkills = [...skills];
                                          newSkills[index] = e.target.value;
                                          setSkills(newSkills);
                                      }}
                                  />
                              ))}
                              <button onClick={() => setSkills([...skills, ''])}>Add Skill</button>
                              <button onClick={prevStep}>Previous</button>
                              <button onClick={nextStep}>Next</button>
                          </div>
                      )}

                     
                      {step === 4 && (
                          <div className="section">
                              <h3>Brief Introduction</h3>
                              <textarea
                                  placeholder="Introduce Yourself"
                                  value={introduction}
                                  onChange={(e) => setIntroduction(e.target.value)}
                              />
                              <button onClick={prevStep}>Previous</button>
                              <button onClick={nextStep}>Next</button>
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
                                          value={project.title}
                                          onChange={(e) => {
                                              const newProjects = [...projects];
                                              newProjects[index].title = e.target.value;
                                              setProjects(newProjects);
                                          }}
                                      />
                                      <textarea
                                          placeholder="Project Description"
                                          value={project.description}
                                          onChange={(e) => {
                                              const newProjects = [...projects];
                                              newProjects[index].description = e.target.value;
                                              setProjects(newProjects);
                                          }}
                                      />
                                  </div>
                              ))}
                              <button onClick={() => setProjects([...projects, { title: '', description: '' }])}>Add Project</button>
                              <button onClick={prevStep}>Previous</button>
                              <button onClick={nextStep}>Next</button>
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
                                          value={cert.year}
                                          onChange={(e) => {
                                              const newCertificates = [...certificates];
                                              newCertificates[index].year = e.target.value;
                                              setCertificates(newCertificates);
                                          }}
                                      />
                                  </div>
                              ))}
                              <button onClick={() => setCertificates([...certificates, { title: '', year: '' }])}>Add Certificate</button>
                              <button onClick={prevStep}>Previous</button>
                              <button onClick={() => setStep(7)}>Finish</button>
                          </div>
                      )}
                  </div>
*/