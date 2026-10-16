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
        if (!resumeFields || !Array.isArray(profileSections)) return;

        const resumeFieldLabels = Object.values(resumeFields).map((field) => {
            return field.label;
        });

        const profileFieldLabels = profileSections.map((section) => {
            return section.subsections.map((subsection) => {
                return subsection.fields.map((field) => field.label.toLowerCase());
            });
        }).flat(2);

        const sharedFieldLabels = resumeFieldLabels.filter(label => profileFieldLabels.includes(label.toLowerCase()));
        const sharedFields = Object.values(resumeFields)
            .filter(field => sharedFieldLabels.includes(field.label))
            .map(field => field);
        for (const field of sharedFields) {
            const fieldId = field.id;
            const fieldLabel = field.label;
            const slateFieldValue = field.value;

            // console.log('SLATE FIELD VALUE', slateFieldValue);
            const profileFieldValue = profileSections
                .map((section) => section.subsections)
                .flat()
                .map((subsection) => subsection.fields)
                .flat()
                .find((profileField) => profileField.label.toLowerCase() === fieldLabel.toLowerCase()).value;
            if (!profileFieldValue) continue;
            const newSlateFieldValue = replaceFieldValueText(slateFieldValue, profileFieldValue);
            dispatch(updateField({ id: fieldId, value: newSlateFieldValue }));
        }
    }

    return (
        <button onClick={handleImportProfileButtonClick}>Profile</button>
    )
}
