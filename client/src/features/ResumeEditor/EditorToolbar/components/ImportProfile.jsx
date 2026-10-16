import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import TextFormatDropdown from '../../TextFormatting/shared/TextFormatDropdown';

import { useSelector, useDispatch } from 'react-redux';

import { updateField } from "@/store/resumeSlice";
import { updateProfile } from "@/store/userSlice";

import { getUserProfile } from '@/services/profileServices';

function replaceFieldValueText(slateFieldValue, profileFieldValue) {
    // if (slateFieldValue.type === 'unordered-list') {
    //     console.log(slateFieldValue)
    //     // continue;
    //     return;
    // }
    const profileWords = typeof profileFieldValue === "string"
        ? profileFieldValue.trim().split(/\s+/).filter(Boolean)
        : [];
    const hasMultipleItems = slateFieldValue.length > 1;
    const newSlateFieldValue = slateFieldValue.map((item, index) => {
        console.log(item.type);
        if (item.type === 'unordered-list' || item.type === 'ordered-list') {
            return {
                ...item,
                children: replaceFieldValueText(item.children, profileFieldValue),
            };
        }
        return {
            ...item,
            children: item.children.map((child) => {
                // if (child.text.length === 0) return child;
                if (!child.text || child.text.length === 0) return { ...child };
                // console.log('CHILD BEFORE UPDATE', child);
                const slateFieldTextIsAllCaps = child.text === child.text.toUpperCase();
                const leadingWhitespace = child.text.match(/^\s*/)[0];
                const trailingWhitespace = child.text.match(/\s*$/)[0];
                const replacementText = hasMultipleItems
                    ? (index === slateFieldValue.length - 1
                        ? profileWords.slice(index).join(' ')
                        : profileWords[index] ?? '')
                    : profileFieldValue;
                return {
                    ...child,
                    text: leadingWhitespace + (slateFieldTextIsAllCaps ? replacementText.trim().toUpperCase() : replacementText.trim()) + trailingWhitespace,
                };
            }),
        }
    });
    return newSlateFieldValue;
}

export default function ImportProfile() {

    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.user.profiles) ?? [];
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [importError, setImportError] = useState('');
    const importRequest = useRef(0);
    const resumeSections = useSelector((state) => state.resume.present?.sections?.byId);
    const reduxResume = useSelector((state) => state.resume.present);
    const resumeFields = reduxResume.fields.byId;
    const resumeSubsections = reduxResume.subsections.byId;

    useEffect(() => () => {
        importRequest.current += 1;
    }, []);

    const importProfileSections = (profileSections) => {
        if (!resumeFields || !resumeSubsections || !resumeSections || !Array.isArray(profileSections)) return;

        const profileSubsectionsByType = new Map();
        for (const section of profileSections) {
            if (!section.type) continue;
            const subsections = profileSubsectionsByType.get(section.type) ?? [];
            subsections.push(...section.subsections);
            profileSubsectionsByType.set(section.type, subsections);
        }

        const nextSubsectionByType = new Map();
        const usedProfileFields = new Set();
        const sectionIds = reduxResume.columns.allIds.flatMap(
            (columnId) => reduxResume.columns.byId[columnId].sectionIds,
        );

        for (const sectionId of sectionIds) {
            const section = resumeSections[sectionId];
            if (!section?.type) continue;
            let matchingType = section.type;
            if (!profileSubsectionsByType.has(matchingType) && section.type === 'defaultSection') {
                matchingType = [...profileSubsectionsByType.keys()].find((type) =>
                    type.toLowerCase() === section.label?.trim().toLowerCase(),
                );
            }
            const profileSubsections = profileSubsectionsByType.get(matchingType) ?? [];

            for (const subsectionId of section.subsectionIds) {
                const subsection = resumeSubsections[subsectionId];
                if (!subsection) continue;
                const profileIndex = nextSubsectionByType.get(matchingType) ?? 0;
                const profileSubsection = profileSubsections[profileIndex];
                if (!profileSubsection) break;
                nextSubsectionByType.set(matchingType, profileIndex + 1);

                for (const fieldId of subsection.fieldIds) {
                    const field = resumeFields[fieldId];
                    if (!field) continue;
                    const profileField = profileSubsection.fields.find((candidate) =>
                        !usedProfileFields.has(candidate)
                        && candidate.label.toLowerCase() === field.label.toLowerCase(),
                    );
                    if (!profileField) continue;
                    usedProfileFields.add(profileField);
                    if (!profileField.value) continue;

                    const newSlateFieldValue = replaceFieldValueText(field.value, profileField.value);
                    dispatch(updateField({ id: fieldId, value: newSlateFieldValue }));
                }
            }
        }
    }

    const handleProfileSelect = async (profileId) => {
        if (!profileId || isImporting) return;
        const requestId = ++importRequest.current;
        setDropdownIsOpen(false);
        setIsImporting(true);
        setImportError('');
        try {
            const profile = await getUserProfile(profileId);
            if (requestId !== importRequest.current) return;
            if (!profile || !Array.isArray(profile.sections)) {
                setImportError('Unable to import this profile. Please try again.');
                return;
            }
            dispatch(updateProfile(profile));
            importProfileSections(profile.sections);
        } catch {
            if (requestId === importRequest.current) {
                setImportError('Unable to import this profile. Please try again.');
            }
        } finally {
            if (requestId === importRequest.current) {
                setIsImporting(false);
            }
        }
    };

    if (profiles.length === 0) {
        return <Link className="buttonMain" to="/account/profile/create">Create a Profile</Link>;
    }

    return (
        <div onKeyDown={(event) => {
            if (event.key === 'Escape') setDropdownIsOpen(false);
        }}>
            <button
                type="button"
                className="buttonMain"
                data-id="open-close-dropdown-button"
                aria-expanded={dropdownIsOpen}
                onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                disabled={isImporting}
                aria-busy={isImporting}
            >
                {isImporting ? 'Importing…' : 'Import Profile'}
                <MdArrowDropDown style={{ marginLeft: '0.25rem', marginRight: '-0.25rem' }} />
            </button>
            {dropdownIsOpen && (
                <TextFormatDropdown
                    isOpen={dropdownIsOpen}
                    setIsOpen={setDropdownIsOpen}
                    wrapperStyling={{ flexDirection: 'column', width: 'max-content' }}
                    containerStyling={{ maxHeight: '20rem', overflowY: 'auto' }}
                    dropdownOptions={profiles.map((profile) => (
                        <button
                            key={profile.id}
                            type="button"
                            className="buttonMain"
                            style={{ width: '100%', justifyContent: 'flex-start' }}
                            onClick={() => handleProfileSelect(profile.id)}
                        >
                            {profile.title || 'Untitled Profile'}
                        </button>
                    ))}
                />
            )}
            {importError && <span role="alert">{importError}</span>}
        </div>
    );
}
