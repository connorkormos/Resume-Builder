import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from 'react-icons/md';
import TextFormatDropdown from '../../TextFormatting/shared/TextFormatDropdown';

import { useSelector, useDispatch } from 'react-redux';

import { updateField } from "@/store/resumeSlice";
import { updateProfile } from "@/store/userSlice";

import { getUserProfile } from '@/services/profileServices';
import { pairProfileSubsections, matchProfileFields, findProbableMatches, logUnmatchedProfileItems } from '../helpers/importProfileHelpers';
import ImportProfileModal from './ImportProfileModal';

function replaceFieldValueText(slateFieldValue, profileFieldValue, containsListItems = false) {
    if (typeof profileFieldValue !== 'string') return slateFieldValue;

    // Preserve existing leaf colors unless the caller explicitly supplies one.
    // const colorOverride = fontColor != null ? { color: fontColor } : {};
    const profileText = profileFieldValue.trim();
    const profileTextSegments = containsListItems
        ? profileText.split(/\r?\n/).map((textSegment) => textSegment.trim()).filter(Boolean)
        : profileText.split(/\s+/).filter(Boolean);

    // Keep an empty list item when importing blank text so the list stays editable.
    if (containsListItems && profileTextSegments.length === 0) profileTextSegments.push('');
    const slateNodesToUpdate =
        containsListItems
            ? profileTextSegments.map((textSegment, index) => slateFieldValue[index] ?? slateFieldValue.at(-1) ?? {
                type: 'list-item',
                children: [{ text: textSegment }],
            })
            : slateFieldValue;
    let wordIndex = 0;

    return slateNodesToUpdate.map((slateNode, index) => {
        if (slateNode.type === 'unordered-list' || slateNode.type === 'ordered-list') {
            return {
                ...slateNode,
                children: replaceFieldValueText(slateNode.children, profileFieldValue, true),
            };
        }

        let replacementText = profileText;
        if (containsListItems) {
            replacementText = profileTextSegments[index];
        } else if (slateNodesToUpdate.length > 1) {
            const originalText = slateNode.children.map((child) => child.text ?? '').join('');
            const originalWordCount = originalText.trim().split(/\s+/).filter(Boolean).length;
            const endIndex = index === slateNodesToUpdate.length - 1
                ? profileTextSegments.length
                : wordIndex + originalWordCount;
            replacementText = profileTextSegments.slice(wordIndex, endIndex).join(' ');
            wordIndex = endIndex;
        }

        const textChildIndexes = slateNode.children.flatMap((child, childIndex) =>
            typeof child.text === 'string' ? [childIndex] : [],
        );
        const contentChildIndexes = textChildIndexes.filter(
            (childIndex) => slateNode.children[childIndex].text.trim().length > 0,
        );
        const lastIconIndex = slateNode.children.findLastIndex((child) => child.type === 'icon');
        // Empty blocks get one destination; existing text keeps its current slots.
        // Prefer text after the last icon, preserving its leading caret placeholder.
        const emptyTextTargetIndex = textChildIndexes.find((childIndex) => childIndex > lastIconIndex)
            ?? textChildIndexes[0];
        const replacementIndexes = new Set(contentChildIndexes.length > 0
            ? contentChildIndexes
            : emptyTextTargetIndex !== undefined ? [emptyTextTargetIndex] : []);

        return {
            ...slateNode,
            children: slateNode.children.map((child, childIndex) => {
                if (!replacementIndexes.has(childIndex)) return { ...child };
                const slateFieldTextIsAllCaps = /\p{L}/u.test(child.text)
                    && child.text === child.text.toUpperCase();
                const leadingWhitespace = child.text.match(/^\s*/)[0];
                // Whitespace-only destinations retain their whitespace once, as a prefix.
                const trailingWhitespace = child.text.trim().length > 0
                    ? child.text.match(/\s*$/)[0] : '';
                return {
                    ...child,
                    // ...colorOverride,
                    text: leadingWhitespace
                        + (slateFieldTextIsAllCaps ? replacementText.toUpperCase() : replacementText)
                        + trailingWhitespace,
                };
            }),
        };
    });
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

    const [unmatchedFields, setUnmatchedFields] = useState([]);
    const [showUnmatchedFieldsModal, setShowUnmatchedFieldsModal] = useState(false);
    const [manualMatchSessionId, setManualMatchSessionId] = useState(null);

    useEffect(() => () => {
        importRequest.current += 1;
    }, []);

    const importProfileSections = (profileSections) => {
        if (!resumeFields || !resumeSubsections || !resumeSections || !Array.isArray(profileSections)) return;

        // Pair subsections by section type, then match their fields by label.
        const pairs = pairProfileSubsections(profileSections, reduxResume);
        const { matchedFields, potentialMatches } = matchProfileFields(pairs.subsectionPairs, resumeFields);

        // Replace text using the existing Slate formatting and save each field.
        for (const { resumeField, profileField } of matchedFields) {
            const value = replaceFieldValueText(resumeField.value, profileField.value);
            dispatch(updateField({ id: resumeField.id, value }));
        }

        const probableMatches = findProbableMatches(potentialMatches);

        for (const { resumeField, profileField } of probableMatches) {
            const value = replaceFieldValueText(resumeField.value, profileField.value);
            dispatch(updateField({ id: resumeField.id, value }));
        }

        console.log('Probable matches:', probableMatches);

        const { unmatchedProfileFields } = logUnmatchedProfileItems({ profileSections, resume: reduxResume, pairs, matchedFields, probableMatches, potentialMatches });
        if (unmatchedProfileFields.length > 0) {
            console.log('Unmatched profile fields:', unmatchedProfileFields);
            setUnmatchedFields(unmatchedProfileFields);
            setManualMatchSessionId(crypto.randomUUID());
            setShowUnmatchedFieldsModal(true);
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
        <>
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
            {showUnmatchedFieldsModal && (
                <ImportProfileModal
                    key={`${reduxResume.id}:${manualMatchSessionId}`}
                    sessionId={manualMatchSessionId}
                    unmatchedFields={unmatchedFields}
                    replaceFieldValueText={replaceFieldValueText}
                    onClose={() => setShowUnmatchedFieldsModal(false)}
                />
            )}
        </>
    );
}
