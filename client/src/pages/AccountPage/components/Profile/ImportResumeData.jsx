import React from 'react';

import { useLocation } from 'react-router-dom';

import { getNodeString } from '@/helpers/getNodeString';

import styles from './ImportResumeData.module.css';

export default function ImportResumeData() {
    const location = useLocation();
    const resumeData = location.state?.resume;

    const orderedSectionIds = [];
    Object.values(resumeData.columns.byId).forEach((column) => {
        for (const sectionId in column.sectionIds) {
            orderedSectionIds.push(column.sectionIds[sectionId]);
        }
    });

    const renderFields = (fieldData) => {
        // console.log("fieldData:", fieldData);
        return fieldData.map((field) => {
            console.log("field value:", field.value[0].children);
            return (
                <div key={field.id} className={styles.resumeField}>
                    <p><strong>Field:</strong> {field.label}</p>
                    <p><strong>Label:</strong> {field.value[0].label}</p>
                    <p><strong>Value:</strong> {getNodeString(field)}</p>
                </div>
            );
        });
    };

    const renderSubsections = (subsectionData) => {
        return subsectionData.map((subsection) => {
            const fieldData = subsection.fieldIds.map((fieldId) => resumeData.fields.byId[fieldId]);
            return (
                <>
                    <div key={subsection.id} className={styles.resumeSubsection}>
                        <h3>{subsection.label}</h3>
                        {/* <p>Label: {subsection.label}</p> */}
                        <p><strong>Type:</strong> {subsection.type}</p>
                        {/* <p>Value: {getNodeString(subsection)}</p> */}
                    </div>
                    {renderFields(fieldData)}
                </>
            );
        });
    };

    const resumeSections = orderedSectionIds.map((sectionId) => {
        const sectionData = resumeData.sections.byId[sectionId];
        const subsectionData = sectionData.subsectionIds.map((subsectionId) => resumeData.subsections.byId[subsectionId]);
        return (
            <>
                <div key={sectionId} className={styles.resumeSection}>
                    <h2>{sectionData.label} Section</h2>
                    <p><strong>Type:</strong> {sectionData.type}</p>
                    <p><strong>Value:</strong> {getNodeString(sectionData)}</p>
                </div>
                {renderSubsections(subsectionData)}
            </>
        )
    });


    if (!resumeData) {
        return null;
    }
    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profilePageTitle}>Profile</h1>
            <div className={styles.profileInfoWrapper}>
                {/* {profileInfoRows} */}
                {resumeSections}
            </div>
        </div>
    )
}