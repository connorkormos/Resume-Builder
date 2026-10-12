import React from 'react';
import styles from '../Search.module.css';
import { MdArrowDropDown } from 'react-icons/md';

export default function SearchForm({
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    sortOpen,
    setSortOpen,
    resumeTypes,
    resumeTypesOpen,
    setResumeTypesOpen,
    toggleResumeType,
    setOffset,
    fetchTemplates,
}) {


    const resumeTypeCheckboxOptions = [
        { value: "officialTemplate", label: "Official Templates" },
        { value: "personal", label: "My Resumes" },
    ];

    const sortingLabelDict = {
        copyCount: "Most Copied",
        recent: "Most Recent",
        viewCount: "Most Viewed"
    };

    const sortLabel =
        sortingLabelDict[sortBy] ?? "Sort by...";

    const sortByOptions = Object.entries(sortingLabelDict).map(([key, label]) => {
        // return <button></button>

        return (
            <button
                type="button"
                className={styles.dropdownOption}
                onClick={() => {
                    setSortBy(key);
                    setOffset(0);
                    setSortOpen(false);
                }}
            >
                {label}
            </button >
        )
    })
    return (
        <div className={styles.resumeSearchWrapper}>
            <form
                id="resumeSearchForm"
                className={styles.resumeSearchForm}
                onSubmit={(e) => {
                    e.preventDefault();
                    setOffset(0);
                    fetchTemplates();
                }}
            >
                <input
                    className={styles.resumeSearchInput}
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className={styles.searchControlsWrapper}>
                <div className={styles.dropdownWrapper}>
                    <button
                        type="button"
                        className={styles.dropdownToggle}
                        onClick={() => setSortOpen(!sortOpen)}
                        aria-expanded={sortOpen}
                    >
                        <span className={styles.dropdownToggleLabel}>{sortLabel}</span>
                        <MdArrowDropDown />
                    </button>
                    {sortOpen && (
                        <div className={styles.dropdownMenu}>
                            {sortByOptions}
                        </div>
                    )}
                </div>

                <div className={styles.dropdownWrapper}>
                    <button
                        type="button"
                        className={styles.dropdownToggle}
                        onClick={() => setResumeTypesOpen(!resumeTypesOpen)}
                        aria-expanded={resumeTypesOpen}
                    >
                        <span className={styles.dropdownToggleLabel}>Resume Types</span>
                        <MdArrowDropDown />
                    </button>
                    {resumeTypesOpen && (
                        <div className={styles.dropdownMenu}>
                            {resumeTypeCheckboxOptions.map(({ value, label }) => (
                                <label key={value} className={styles.resumeTypeCheckboxOption}>
                                    <input
                                        type="checkbox"
                                        checked={resumeTypes.includes(value)}
                                        onChange={() => toggleResumeType(value)}
                                    />
                                    {label}
                                </label>
                            ))}
                            <button
                                type="button"
                                className={styles.applyButton}
                                onClick={() => {
                                    setOffset(0);
                                    fetchTemplates();
                                    setResumeTypesOpen(false);
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    form="resumeSearchForm"
                    className={styles.searchButton}
                >
                    Search
                </button>
            </div>
        </div>
    )
}