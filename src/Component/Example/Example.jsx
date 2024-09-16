import React from 'react';

const Example = () => {
  return (
    <div style={styles.app}>
      <Header />
      <Hero />
      <Services />
      <Team />
      <Footer />
    </div>
  );
};

const Header = () => (
  <header style={styles.header}>
    <div style={styles.container}>
      <div style={styles.logo}>HealthCare</div>
      <nav>
        <ul style={styles.navList}>
          <li><a href="#home" style={styles.navLink}>Home</a></li>
          <li><a href="#about" style={styles.navLink}>About</a></li>
          <li><a href="#services" style={styles.navLink}>Services</a></li>
          <li><a href="#team" style={styles.navLink}>Team</a></li>
          <li><a href="#contact" style={styles.navLink}>Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section style={styles.hero} id="home">
    <div style={styles.container}>
      <div style={styles.heroText}>
        <h1 style={styles.heroTitle}>Take Care of Your Health Now</h1>
        <p style={styles.heroSubtitle}>High standard of health services with a professional touch.</p>
        <a href="#services" style={styles.btnPrimary}>Explore Services</a>
      </div>
      <div style={styles.heroImage}>
        <img src="doctor-image.png" alt="Doctor" style={styles.image} />
      </div>
    </div>
  </section>
);

const Services = () => (
  <section style={styles.services} id="services">
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Our Services</h2>
      <div style={styles.serviceCards}>
        <div style={styles.serviceCard}>
          <img src="qualified-doctor.png" alt="Qualified Doctor" style={styles.serviceImage} />
          <h3 style={styles.serviceTitle}>Qualified Doctor</h3>
        </div>
        <div style={styles.serviceCard}>
          <img src="emergency-help.png" alt="Emergency Help" style={styles.serviceImage} />
          <h3 style={styles.serviceTitle}>Emergency Help</h3>
        </div>
        <div style={styles.serviceCard}>
          <img src="modern-equipment.png" alt="Modern Equipment" style={styles.serviceImage} />
          <h3 style={styles.serviceTitle}>Modern Equipment</h3>
        </div>
        <div style={styles.serviceCard}>
          <img src="family-medicine.png" alt="Family Medicine" style={styles.serviceImage} />
          <h3 style={styles.serviceTitle}>Family Medicine</h3>
        </div>
      </div>
    </div>
  </section>
);

const Team = () => (
  <section style={styles.team} id="team">
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>Meet Our Team</h2>
      <div style={styles.teamMembers}>
        <div style={styles.teamMember}>
          <img src="doctor-1.png" alt="Doctor 1" style={styles.teamImage} />
          <h3 style={styles.teamTitle}>Dr. John Doe</h3>
          <p style={styles.teamSubtitle}>Cardiologist</p>
        </div>
        <div style={styles.teamMember}>
          <img src="doctor-2.png" alt="Doctor 2" style={styles.teamImage} />
          <h3 style={styles.teamTitle}>Dr. Jane Smith</h3>
          <p style={styles.teamSubtitle}>Neurologist</p>
        </div>
        <div style={styles.teamMember}>
          <img src="doctor-3.png" alt="Doctor 3" style={styles.teamImage} />
          <h3 style={styles.teamTitle}>Dr. Sam Wilson</h3>
          <p style={styles.teamSubtitle}>Pediatrician</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={styles.footer}>
    <div style={styles.container}>
      <p>&copy; 2024 HealthCare. All rights reserved.</p>
    </div>
  </footer>
);

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    color: '#333',
    lineHeight: 1.6,
    margin: 0,
  },
  container: {
    width: '80%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 0',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: '20px 0',
    color: 'white',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  hero: {
    backgroundColor: '#152238',
    color: 'white',
    padding: '100px 0',
    display: 'flex',
    alignItems: 'center',
  },
  heroText: {
    maxWidth: '50%',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  btnPrimary: {
    display: 'inline-block',
    backgroundColor: '#ff5a5f',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
  },
  heroImage: {
    maxWidth: '100%',
    marginLeft: '20px',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
  },
  services: {
    padding: '80px 0',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: '50px',
    fontSize: '2.5rem',
    color: '#333',
  },
  serviceCards: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  serviceCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  serviceImage: {
    maxWidth: '80px',
    marginBottom: '20px',
  },
  serviceTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#ff5a5f',
  },
  team: {
    padding: '80px 0',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
  },
  teamMembers: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  teamMember: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  teamImage: {
    maxWidth: '100%',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  teamTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  },
  teamSubtitle: {
    fontSize: '1.1rem',
    color: '#777',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
  },
};

export default Example;
