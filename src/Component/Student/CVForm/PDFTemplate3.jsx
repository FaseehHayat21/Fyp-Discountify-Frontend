import React from 'react';
import { Page, Document, StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: '#ffffff',
    color: '#2d3748',
  },
  container: {
    maxWidth: '100%',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#4a6fa5',
    color: 'white',
    padding: '40px 30px',
    marginBottom: '20px',
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  name: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  contactInfo: {
    fontSize: '12px',
    opacity: 0.9,
    margin: 0,
  },
  mainContent: {
    padding: '0 30px 30px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'semibold',
    color: '#4a6fa5',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '6px',
    marginBottom: '15px',
    letterSpacing: '-0.25px',
  },
  introText: {
    fontSize: '12px',
    lineHeight: 1.5,
    color: '#4a5568',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 2,
  },
  educationItem: {
    marginBottom: '15px',
  },
  degree: {
    fontSize: '12px',
    fontWeight: 'semibold',
    color: '#2d3748',
    marginBottom: '4px',
  },
  institution: {
    fontSize: '11px',
    color: '#4a5568',
    marginBottom: '4px',
  },
  year: {
    fontSize: '10px',
    color: '#718096',
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '6px',
  },
  skillItem: {
    backgroundColor: '#edf2f7',
    color: '#2d3748',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 'medium',
  },
  projectItem: {
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #e2e8f0',
  },
  projectTitle: {
    fontSize: '12px',
    fontWeight: 'semibold',
    color: '#2d3748',
    marginBottom: '6px',
  },
  projectDescription: {
    fontSize: '11px',
    lineHeight: 1.4,
    color: '#4a5568',
  },
  certificateItem: {
    marginBottom: '10px',
  },
  certificateTitle: {
    fontSize: '11px',
    fontWeight: 'semibold',
    color: '#2d3748',
    marginBottom: '4px',
  },
  certificateYear: {
    fontSize: '10px',
    color: '#718096',
  },
});

const PDFTemplate3 = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.contactInfo}>
              {data.email} | {data.phone} | {data.portfolio} | {data.linkedin}
            </Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Brief Introduction</Text>
            <Text style={styles.introText}>{data.introduction}</Text>
          </View>

          <View style={styles.columns}>
            <View style={styles.leftColumn}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.institution}>{edu.institution}</Text>
                    <Text style={styles.year}>{edu.year}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsList}>
                  {data.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certificates</Text>
                {data.certificates.map((cert, index) => (
                  <View key={index} style={styles.certificateItem}>
                    <Text style={styles.certificateTitle}>{cert.title}</Text>
                    <Text style={styles.certificateYear}>{cert.year}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFTemplate3;