import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        padding: 20,
        backgroundColor: '#e6e6e6',
        color: '#000',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        marginRight: 20,
    },
    headerText: {
        textAlign: 'left',
    },
    headerName: {
        fontSize: 24,
        marginBottom: 5,
    },
    headerDetails: {
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

const PDFTemplateWithImage = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
            {data.profileImage && (
                    <Image style={styles.profileImage} src={data.profileImage} />
                )}

                <View style={styles.headerText}>
                    <Text style={styles.headerName}>{data.name}</Text>
                    <Text style={styles.headerDetails}>{data.email} | {data.phone}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Introduction</Text>
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

export default PDFTemplateWithImage;
