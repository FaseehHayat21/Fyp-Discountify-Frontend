import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 30,
    backgroundColor: '#ffffff',
    color: '#2d3748',
  },
  container: {
    maxWidth: '100%',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2b6cb0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  contact: {
    fontSize: 11,
    color: '#4a5568',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#4a5568',
    marginBottom: 8,
    textAlign: 'left',
  },
  skillsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: 10,
  },
  skillItem: {
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: 10,
    fontWeight: 'medium',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 4,
  },
});

const PDFTemplate1 = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.contact}>
            {data.email} | {data.phone} | {data.portfolio} | {data.linkedin}
          </Text>
        </View>

        {/* Summary */}
        {data.introduction && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{data.introduction}</Text>
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.text}>
                  {edu.institution} — {edu.year}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
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
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <Text style={styles.itemTitle}>{project.title}</Text>
                <Text style={styles.text}>{project.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certificates.map((cert, index) => (
              <View key={index} style={{ marginBottom: 12 }}>
                <Text style={styles.itemTitle}>{cert.title}</Text>
                <Text style={styles.text}>{cert.year}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFTemplate1;