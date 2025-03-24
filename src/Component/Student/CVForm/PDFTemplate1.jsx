import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica', // ATS-friendly font
        padding: 30,
        backgroundColor: '#ffffff',
        color: '#333',
        lineHeight: 1.6,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        color: '#2c3e50',
        marginBottom: 5,
    },
    headerSubText: {
        fontSize: 12,
        color: '#555',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#34495e',
        borderBottomWidth: 2,
        borderBottomColor: '#3498db',
        paddingBottom: 5,
        marginBottom: 10,
    },
    item: {
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 14,
        color: '#2c3e50',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 12,
        color: '#555',
    },
    skillsList: {
        marginLeft: 20,
    },
    skillItem: {
        fontSize: 12,
        marginBottom: 5,
    },
});

const PDFTemplate2 = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{data.name}</Text>
                <Text style={styles.headerSubText}>{data.email} | {data.phone}</Text>
            </View>

            {/* Brief Introduction Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.itemText}>{data.introduction}</Text>
            </View>

            {/* Education Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{edu.degree}</Text>
                        <Text style={styles.itemText}>{edu.institution} — {edu.year}</Text>
                    </View>
                ))}
            </View>

            {/* Skills Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsList}>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>• {skill}</Text>
                    ))}
                </View>
            </View>

            {/* Projects Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((project, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{project.title}</Text>
                        <Text style={styles.itemText}>{project.description}</Text>
                    </View>
                ))}
            </View>

            {/* Certificates Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {data.certificates.map((cert, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{cert.title}</Text>
                        <Text style={styles.itemText}>{cert.year}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default PDFTemplate2;