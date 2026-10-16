import React, { useEffect } from 'react';

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
                const leadingWhitespace = child.text.match(/^\s*/)[0];
                const trailingWhitespace = child.text.match(/\s*$/)[0];
                const replacementText = hasMultipleItems
                    ? (index === slateFieldValue.length - 1
                        ? profileWords.slice(index).join(' ')
                        : profileWords[index] ?? '')
                    : profileFieldValue;
                return {
                    ...child,
                    text: leadingWhitespace + replacementText.trim() + trailingWhitespace,
                };
            }),
        }
    });
    return newSlateFieldValue;
}

export default function ImportProfile() {

    const dispatch = useDispatch();
    const firstProfile = useSelector((state) => state.user.profiles?.[0]);
    const firstProfileId = firstProfile?.id;
    const profileSections = firstProfile?.sections;
    const resumeSections = useSelector((state) => state.resume.present?.sections?.byId);
    const reduxResume = useSelector((state) => state.resume.present);
    const resumeFields = reduxResume.fields.byId;
    const resumeSubsections = reduxResume.subsections.byId;

    useEffect(() => {
        if (!firstProfileId) return;
        let active = true;
        const setUserProfileInfo = async () => {

            const userProfileInfo = await getUserProfile(firstProfileId);
            if (active && userProfileInfo) dispatch(updateProfile(userProfileInfo));
        }

        setUserProfileInfo();
        return () => { active = false; };
    }, [firstProfileId, dispatch]);

    const handleImportProfileButtonClick = () => {
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
            const profileSubsections = profileSubsectionsByType.get(section.type) ?? [];

            for (const subsectionId of section.subsectionIds) {
                const subsection = resumeSubsections[subsectionId];
                if (!subsection) continue;
                const profileIndex = nextSubsectionByType.get(section.type) ?? 0;
                const profileSubsection = profileSubsections[profileIndex];
                if (!profileSubsection) break;
                nextSubsectionByType.set(section.type, profileIndex + 1);

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

    return (
        <button onClick={handleImportProfileButtonClick}>Profile</button>
    )
}
