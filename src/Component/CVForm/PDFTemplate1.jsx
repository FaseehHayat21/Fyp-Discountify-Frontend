import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
        backgroundColor: '#f0f0f0',
        color: '#000',
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 5,
    },
    headerSubText: {
        fontSize: 12,
        color: '#555',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#333',
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        paddingBottom: 5,
        marginBottom: 10,
    },
    item: {
        marginBottom: 15,
    },
    itemTitle: {
        fontSize: 14,
        color: '#007bff',
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

const PDFTemplate1 = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{data.name}</Text>
                <Text style={styles.headerSubText}>{data.email} | {data.phone}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.itemText}>{data.introduction}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{edu.degree}</Text>
                        <Text style={styles.itemText}>{edu.institution} — {edu.year}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsList}>
                    {data.skills.map((skill, index) => (
                        <Text key={index} style={styles.skillItem}>• {skill}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((project, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemTitle}>{project.title}</Text>
                        <Text style={styles.itemText}>{project.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certificates</Text>
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

export default PDFTemplate1;
