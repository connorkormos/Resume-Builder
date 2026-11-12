import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addSection, addSubsection } from "@/store/resumeSlice";
import { getSectionTypesFromApi, addSectionToApi } from "@/services/resumeServices";

import styles from "../ResumePaper.module.css";

export default function AddSectionModal({ container, show, onClose }) {

    const reduxSectionsById = useSelector(state => state.resume.present.sections.byId);
    const reduxContainer = useSelector(state => state.resume.present.containers.byId[container.id]);
    const dispatch = useDispatch();

    const [sectionTypes, setSectionTypes] = useState([]);

    useEffect(() => {
        let cancelled = false;
        const getSectionTypes = async () => {
            const allSectionTypes = await getSectionTypesFromApi();
            if (!cancelled && allSectionTypes) {
                setSectionTypes(Object.values(allSectionTypes));
            }
        };
        getSectionTypes();
        return () => { cancelled = true; };
    }, []);

    const usedSectionTypes = new Set(
        Object.values(reduxSectionsById).map(section => section.type)
    );
    const availableSections = sectionTypes.filter(
        section => !usedSectionTypes.has(section.type)
    );
    const containerSections = reduxContainer.sectionIds
        .map(id => reduxSectionsById[id])
        .filter(Boolean);

    const addSectionToContainer = async (sectionType) => {
        const createdData = await addSectionToApi(container.resumeId, sectionType, container.id);
        if (createdData) {
            if (createdData.section) {
                dispatch(addSection({ sectionData: createdData.section }));
            } else if (createdData.subsection) {
                dispatch(addSubsection({ subsectionData: createdData.subsection }));
            }
        }
        onClose();
    }

    if (!show) return null;

    return (
        <>
            <div className={styles.addSectionModalContainer}>
                <button className={styles.closeButton} onClick={onClose}><span>X</span></button>
                <div className={styles.addSectionModalContent}>
                    {containerSections.length > 0 && (

                        <div className={styles.addSectionToContainerColumn}>
                            <h3>Add Subsections</h3>
                            {containerSections.map(section => (
                                <button
                                    key={section.id}
                                    className={styles.addSectionToContainerButton}
                                    onClick={() => addSectionToContainer(section.type)}

                                >
                                    + {section.label}
                                </button>
                            ))}
                        </div>
                    )}
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
                        {availableSections.length === 0 && (
                            <p>All section types are already in use.</p>
                        )}
                        {/* <button className={styles.addSectionToContainerButton}> */}
                        {/* + New Section */}
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </>
    );
}
