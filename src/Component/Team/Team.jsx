import React from 'react'
import "./Team.css"
import Team1 from "../../assets/Team1.png"
import Team2 from "../../assets/Team2.png"
import Team3 from "../../assets/Team3.png"

export default function Team() {
  return (
    <section className="team" id="team">
    <div className="container">
      <h2>MEET OUR TEAM</h2>
      <div className="team-members">
        <div className="team-member">
          <img src={Team1} alt="Doctor 1" />
          <h3>Faseeh Hayat</h3>
          <p>210663</p>
        </div>
        <div className="team-member">
          <img src={Team2} alt="Student 2" />
          <h3>Eman Azhar</h3>
          <p>210654</p>
        </div>
        <div className="team-member">
          <img src={Team3} alt="Doctor 3" />
          <h3>Aena Salim</h3>
          <p>210699</p>
        </div>
      </div>
    </div>
  </section>
  )
}
