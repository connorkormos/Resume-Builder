import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getSectionTypesFromApi, addSectionToApi } from "@/services/resumeServices";

import styles from "../ResumePaper.module.css";

export default function AddSectionModal({ container, show, onClose }) {

    const reduxSectionsById = useSelector(state => state.resume.present.sections.byId);
    const reduxContainer = useSelector(state => state.resume.present.containers.byId[container.id]);

    const [containerSections, setContainerSections] = useState([]);
    const [availableSections, setAvailableSections] = useState([]);

    useEffect(() => {
        console.log('available types', availableSections)
        if (!reduxSectionsById || availableSections.length > 0) return;
        const getSectionTypes = async () => {
            const allSectionTypes = await getSectionTypesFromApi();
            console.log('All section types from API:', allSectionTypes);
            // for (const)

            // setAvailableSections(

            const usedSectionTypes = Object.values(reduxSectionsById).map(section => section.type);
            console.log('Used section types:', usedSectionTypes);
            const filteredSectionTypes = Object.values(allSectionTypes).map(
                ({ type, label }) => {
                    if (usedSectionTypes.includes(type)) return null;
                    return {
                        type,
                        label,
                    }
                }).filter(Boolean);
            setAvailableSections(filteredSectionTypes);
        }
        getSectionTypes();
    }, [availableSections, reduxSectionsById])



    useEffect(() => {
        const sectionsInContainer = reduxContainer.sectionIds.map((sectionId) => {
            return reduxSectionsById[sectionId];
        }).filter(Boolean);
        setContainerSections(sectionsInContainer);
    }, [reduxContainer.sectionIds, reduxSectionsById]);

    const addSectionToContainer = async (sectionType) => {
        const addedSection = await addSectionToApi(container.resumeId, sectionType, container.id);
        if (addedSection) {
            // Optionally, you can update the local state or trigger a Redux action to reflect the new section
            console.log('Added section:', addedSection);
        }
    }

    if (!show) return null;

    return (
        <>
            <div className={styles.addSectionModalContainer}>
                <button className={styles.closeButton} onClick={onClose}><span>X</span></button>
                <div className={styles.addSectionModalContent}>
                    <div className={styles.addSectionToContainerColumn}>
                        <h3>Add Subsections</h3>
                        {containerSections.map(section => (
                            <button
                                key={section.id}
                                className={styles.addSectionToContainerButton}
                            >
                                + {section.label}
                            </button>
                        ))}
                    </div>
                    <div className={styles.addSectionToContainerColumn}>
                        <h3>Add New Section</h3>
                        {availableSections.map(section => (
                            <button
                                key={section.type}
                                className={styles.addSectionToContainerButton}
                                onClick={() => addSectionToContainer(section.type)}
                            >
                                + {section.label}
                            </button>
                        ))}
                        {/* <button className={styles.addSectionToContainerButton}> */}
                        {/* + New Section */}
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </>
    );
}