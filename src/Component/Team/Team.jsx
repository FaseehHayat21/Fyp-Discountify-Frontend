import React from 'react'
import "./Team.css"
export default function Team() {
  return (
    <section className="team" id="team">
    <div className="container">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src="doctor-1.png" alt="Doctor 1" />
          <h3>Student 1</h3>
          <p>Developer</p>
        </div>
        <div className="team-member">
          <img src="doctor-2.png" alt="Student 2" />
          <h3>Student 2</h3>
          <p>Developer</p>
        </div>
        <div className="team-member">
          <img src="doctor-3.png" alt="Doctor 3" />
          <h3>Student 3</h3>
          <p>Developer</p>
        </div>
      </div>
    </div>
  </section>
  )
}
