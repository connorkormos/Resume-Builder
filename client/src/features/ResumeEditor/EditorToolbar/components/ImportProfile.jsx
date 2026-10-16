import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { updateField } from "@/store/resumeSlice";
import { updateProfile } from "@/store/userSlice";

import { getUserProfile } from '@/services/profileServices';

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


    // useEffect(() => {
    //     // if (!resumeSections || !Array.isArray(profileSections)) return;
    //     if (!resumeFields || !Array.isArray(profileSections)) return;

    //     // console.log("RESUME FIELDS: ", resumeFields);
    //     const resumeFieldLabels =Object.values(resumeFields).map((field) => {
    //         return field.label;
    //         // console.log(field.id, field.label, field.value);
    //     });
    //     console.log("RESUME FIELD LABELS: ", resumeFieldLabels);

    //     // Flatten the profile field labels array
    //     const profileFieldLabels = profileSections.map((section) => {
    //         return section.subsections.map((subsection) => {
    //             return subsection.fields.map((field) => field.label.toLowerCase());
    //         });
    //     }).flat(2);
    //     // const flattenedProfileFieldLabels = profileFieldLabels.flat(2);

    //     console.log("PROFILE FIELD LABELS: ", profileFieldLabels);
    //     // console.log("FLATTENED PROFILE FIELD LABELS: ", flattenedProfileFieldLabels);

    //     const sharedFieldLabels = resumeFieldLabels.filter(label => profileFieldLabels.includes(label.toLowerCase()));
    //     // get the ids for the resume fields that match the shared field labels
    //     const sharedFields = Object.values(resumeFields)
    //         .filter(field => sharedFieldLabels.includes(field.label))
    //         .map(field => field);
    //     // console.log("SHARED FIELD IDS: ", sharedFieldIds);
    //     // console.log("SHARED FIELD LABELS: ", sharedFieldLabels);
    //     // console.log("SHARED FIELDS: ", sharedFields);
    //     for (const field of sharedFields) {
    //         // console.log("SHARED FIELD: ", field);
    //         console.log("SHARED FIELD VALUE: ", field.value);
    //     }
    //     // for (const fieldId of sharedFieldIds) {

    //         // console.log("SHARED FIELD ID: ", fieldId);
    //     // }

    //     // const reduxResumeSectionTypes = Object.values(resumeSections).map((section) => section.type);
    //     // const userProfileSectionTypes = profileSections.map((section) => section.type);

    //     // const sharedSectionTypes = reduxResumeSectionTypes.filter(sectionType => userProfileSectionTypes.includes(sectionType));
    //     // console.log("RESUME SECTION TYPES: ", reduxResumeSectionTypes);
    //     // console.log("USER PROFILE SECTION TYPES: ", userProfileSectionTypes);
    //     // console.log("MATCHING SECTION TYPES: ", sharedSectionTypes)

    // // }, [resumeSections, profileSections]);
    // }, [resumeFields, profileSections]);

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
            const profileWords = typeof profileFieldValue === "string"
                ? profileFieldValue.trim().split(/\s+/).filter(Boolean)
                : [];
            const hasMatchingWordCount = slateFieldValue.length > 1
                && slateFieldValue.length === profileWords.length;
            const valueItems = hasMatchingWordCount ? slateFieldValue : slateFieldValue.slice(0, 1);
            const newSlateFieldValue = valueItems.map((item, index) => ({
                ...item,
                children: item.children.map((child) => {
                    // if (child.text.length === 0) return child;
                    if (!child.text || child.text.length === 0) return { ...child };
                    console.log('CHILD BEFORE UPDATE', child);
                    const leadingWhitespace = child.text.match(/^\s*/)[0];
                    const trailingWhitespace = child.text.match(/\s*$/)[0];
                    const replacementText = hasMatchingWordCount ? profileWords[index] : profileFieldValue;
                    return {
                        ...child,
                        text: leadingWhitespace + replacementText.trim() + trailingWhitespace,
                    };
                }),
            }));
            dispatch(updateField({ id: fieldId, value: newSlateFieldValue }));
        }



    }

    return (
        <button onClick={handleImportProfileButtonClick}>Profile</button>
    )
}
