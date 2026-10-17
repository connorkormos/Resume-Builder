const hasProfileFieldText = (field) => typeof field.value === 'string' && field.value.trim().length > 0;

const hasSlateText = (nodes) => Array.isArray(nodes) && nodes.some((node) =>
    (typeof node.text === 'string' && node.text.trim().length > 0)
    || (Array.isArray(node.children) && hasSlateText(node.children)),
);

// Match section types and pair their subsections in resume display order.
export function pairProfileSubsections(profileSections, resume) {
    const resumeSections = resume.sections.byId;
    const resumeSubsections = resume.subsections.byId;
    const subsectionPairs = [];
    // Track structural matchedFields separately from fields whose text gets imported.
    const matchedProfileSectionIds = new Set();
    const matchedResumeSectionIds = new Set();
    const matchedProfileSubsectionIds = new Set();
    const matchedResumeSubsectionIds = new Set();

    // Group profile subsections by section type, keeping their existing order.
    const profileSubsectionsByType = new Map();
    for (const section of profileSections) {
        if (!section.type) continue;
        const subsections = profileSubsectionsByType.get(section.type) ?? [];
        subsections.push(...section.subsections);
        profileSubsectionsByType.set(section.type, subsections);
    }

    // Track the next unused subsection for each section type.
    const nextSubsectionByType = new Map();
    // Visit resume sections in the order they appear across the columns.
    const sectionIds = resume.columns.allIds.flatMap(
        (columnId) => resume.columns.byId[columnId].sectionIds,
    );

    for (const sectionId of sectionIds) {
        // Get the section and check if it has a type to check/match
        const section = resumeSections[sectionId];
        if (!section?.type) continue;
        // Assign resume section type as the "type" to try and match with profile sections
        let matchingType = section.type;
        // Fallback to checking if the resume section's label matchedFields when the resume section type does not
        // if (!profileSubsectionsByType.has(matchingType) && section.type === 'defaultSection') {
        if (!profileSubsectionsByType.has(matchingType)) {
            matchingType = [...profileSubsectionsByType.keys()].find((type) =>
                type.toLowerCase() === section.label?.trim().toLowerCase(),
            );
        }
        // For matched sections, add resume section ID and profile section ID to the Sets for later use
        if (profileSubsectionsByType.has(matchingType)) {
            matchedResumeSectionIds.add(section.id);
            for (const profileSection of profileSections) {
                if (profileSection.type === matchingType) {
                    matchedProfileSectionIds.add(profileSection.id);
                }
            }
        }
        const profileSubsections = profileSubsectionsByType.get(matchingType) ?? [];

        for (const subsectionId of section.subsectionIds) {
            const subsection = resumeSubsections[subsectionId];
            if (!subsection) continue;
            // Pair subsections in order within this type, including across sections that share the type
            // Leave extra resume subsections untouched.
            const profileIndex = nextSubsectionByType.get(matchingType) ?? 0;
            const profileSubsection = profileSubsections[profileIndex];
            if (!profileSubsection) break;
            nextSubsectionByType.set(matchingType, profileIndex + 1);
            matchedProfileSubsectionIds.add(profileSubsection.id);
            matchedResumeSubsectionIds.add(subsection.id);

            subsectionPairs.push({ resumeSubsection: subsection, profileSubsection });
        }
    }
    return {
        subsectionPairs,
        matchedProfileSectionIds,
        matchedResumeSectionIds,
        matchedProfileSubsectionIds,
        matchedResumeSubsectionIds,
    };
}

export function findProbableMatches(potentialMatches) {
    const getLabelParts = (label) => label.toLowerCase()
        .replace(/[^\p{L}]+/gu, ' ')
        .split(' ')
        .filter(Boolean);
    const probableMatches = [];
    for (const match of potentialMatches) {
        const profileFieldToMatch = match.profileField;
        const profileFieldLabelParts = getLabelParts(profileFieldToMatch.label);
        const resumeFieldsToCheck = match.unmatchedResumeFields;
        for (const resumeField of resumeFieldsToCheck) {
            const resumeFieldLabelParts = getLabelParts(resumeField.label);
            // console.log('COMPARING:', profileFieldLabelParts, 'WITH:', resumeFieldLabelParts);
            const hasMatchingPart = profileFieldLabelParts.some((profilePart) =>
                resumeFieldLabelParts.some((resumePart) =>
                    profilePart.includes(resumePart) || resumePart.includes(profilePart),
                ),
            );
            if (hasMatchingPart) {
                probableMatches.push({ profileField: profileFieldToMatch, resumeField });
            }
        }
    }
    return probableMatches;
}

// Match nonempty profile fields by label, using each source field at most once.
export function matchProfileFields(subsectionPairs, resumeFields) {
    const matchedFields = [];
    const usedProfileFields = new Set();

    for (const { resumeSubsection, profileSubsection } of subsectionPairs) {
        for (const fieldId of resumeSubsection.fieldIds) {
            const field = resumeFields[fieldId];
            if (!field) continue;
            const profileField = profileSubsection.fields.find((candidate) =>
                hasProfileFieldText(candidate)
                && !usedProfileFields.has(candidate)
                && candidate.label.toLowerCase() === field.label.toLowerCase(),
            );
            if (!profileField) continue;
            usedProfileFields.add(profileField);
            matchedFields.push({ resumeField: field, profileField });
        }
    }
    // Collect candidates only after all confirmed matches have been consumed.
    const potentialMatches = checkUnmatchedFields(subsectionPairs, matchedFields, resumeFields);
    return { matchedFields, potentialMatches };
}

// Give each unmatched profile field only the unused resume fields in its paired subsection.
export function checkUnmatchedFields(subsectionPairs, matchedFields, resumeFields) {
    const usedProfileFields = new Set(matchedFields.map(({ profileField }) => profileField));
    const usedResumeFieldIds = new Set(matchedFields.map(({ resumeField }) => resumeField.id));

    return subsectionPairs.flatMap(({ resumeSubsection, profileSubsection }) => {
        // Empty resume fields are still valid destinations for imported text.
        const unmatchedResumeFields = resumeSubsection.fieldIds
            .map((fieldId) => resumeFields[fieldId])
            .filter((field) => field && !usedResumeFieldIds.has(field.id));

        return profileSubsection.fields
            .filter((field) => hasProfileFieldText(field) && !usedProfileFields.has(field))
            .map((profileField) => ({
                profileField,
                profileSubsection,
                resumeSubsection,
                unmatchedResumeFields,
            }));
    });
}

// Report unused items with the same parent context and console layout as the import.
export function logUnmatchedProfileItems({ profileSections, resume, pairs, matchedFields, potentialMatches }) {
    const resumeSections = resume.sections.byId;
    const resumeSubsections = resume.subsections.byId;
    const resumeFields = resume.fields.byId;
    const {
        matchedProfileSectionIds,
        matchedResumeSectionIds,
        matchedProfileSubsectionIds,
        matchedResumeSubsectionIds,
    } = pairs;
    const importedProfileFieldIds = new Set(matchedFields.map(({ profileField }) => profileField.id));
    const updatedResumeFieldIds = new Set(matchedFields.map(({ resumeField }) => resumeField.id));
    const potentialProfileFieldIds = new Set(potentialMatches.map(({ profileField }) => profileField.id));

    // Include unused fields beneath unmatched sections and subsections as well.
    // Add parent context to diagnostic copies, keeping the source data untouched.
    const getSubsectionContext = (section, subsection, index) => ({
        sectionId: section?.id,
        sectionType: section?.type,
        sectionLabel: section?.label,
        subsectionId: subsection?.id,
        subsectionIndex: index >= 0 ? index : undefined,
        subsectionNumber: index >= 0 ? index + 1 : undefined,
        subsectionPosition: subsection?.position,
    });
    const getResumeSubsectionContext = (subsection) => {
        const section = resumeSections[subsection?.sectionId];
        const index = section?.subsectionIds.indexOf(subsection?.id) ?? -1;
        return getSubsectionContext(section, subsection, index);
    };
    const allProfileSubsections = profileSections.flatMap((section) =>
        section.subsections.map((subsection, index) => ({
            ...subsection,
            ...getSubsectionContext(section, subsection, index),
        })),
    );
    const allProfileFields = allProfileSubsections
        .flatMap((subsection) => subsection.fields.map((field) => ({
            ...field,
            sectionId: subsection.sectionId,
            sectionType: subsection.sectionType,
            sectionLabel: subsection.sectionLabel,
            subsectionId: subsection.id,
            subsectionIndex: subsection.subsectionIndex,
            subsectionNumber: subsection.subsectionNumber,
            subsectionPosition: subsection.subsectionPosition,
        })))
        .filter(hasProfileFieldText);

    const unmatchedProfileSections = profileSections.filter(
        (section) => !matchedProfileSectionIds.has(section.id),
    );
    const unmatchedResumeSections = Object.values(resumeSections).filter(
        (section) => !matchedResumeSectionIds.has(section.id),
    );
    const unmatchedProfileSubsections = allProfileSubsections.filter(
        (subsection) => !matchedProfileSubsectionIds.has(subsection.id),
    );
    const unmatchedResumeSubsections = Object.values(resumeSubsections).filter(
        (subsection) => !matchedResumeSubsectionIds.has(subsection.id),
    ).map((subsection) => ({
        ...subsection,
        ...getResumeSubsectionContext(subsection),
    }));
    const unmatchedProfileFields = allProfileFields.filter(
        (field) => !importedProfileFieldIds.has(field.id),
    ).map((field) => ({
        ...field,
        shouldHaveMatched: potentialProfileFieldIds.has(field.id),
    }));
    const unmatchedResumeFields = Object.values(resumeFields).filter(
        (field) => !updatedResumeFieldIds.has(field.id) && hasSlateText(field.value),
    ).map((field) => ({
        ...field,
        ...getResumeSubsectionContext(resumeSubsections[field.subsectionId]),
    }));

    console.group('Profile import: unmatched items');
    if (unmatchedProfileSections.length > 0) console.log(`Profile sections (${unmatchedProfileSections.length}):`, unmatchedProfileSections);
    if (unmatchedResumeSections.length > 0) console.log(`Resume sections (${unmatchedResumeSections.length}):`, unmatchedResumeSections);
    if (unmatchedProfileSubsections.length > 0) console.log(`Profile subsections (${unmatchedProfileSubsections.length}):`, unmatchedProfileSubsections);
    if (unmatchedResumeSubsections.length > 0) console.log(`Resume subsections (${unmatchedResumeSubsections.length}):`, unmatchedResumeSubsections);
    if (unmatchedProfileFields.length > 0) console.log(`Profile fields (${unmatchedProfileFields.length}; ${potentialMatches.length} should have matched):`, unmatchedProfileFields);
    if (unmatchedResumeFields.length > 0) console.log(`Resume fields (${unmatchedResumeFields.length}):`, unmatchedResumeFields);
    console.groupEnd();
}
