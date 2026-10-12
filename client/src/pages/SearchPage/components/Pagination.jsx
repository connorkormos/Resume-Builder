import React from 'react';
import styles from '../Search.module.css';

export default function Pagination({
    offset,
    setOffset,
    templatesPerPage,
    resumeTemplates,
    totalTemplates,
    paginationItems,
    currentPage,
}) {
    return (
        <div className={styles.paginationContainer}>
            <p className={styles.currentPageInfoText}>
                Showing {offset + 1} - {offset + resumeTemplates.length} of{" "}
                {totalTemplates} templates.
                {/* {" "}Page {currentPage + 1} of {pageCount}. */}
            </p>
            <nav className={styles.paginationWrapper} aria-label="Template pages">
                {paginationItems.map(item => (
                    typeof item === 'string' ? (
                        <span key={item} className={styles.paginationEllipsis}>…</span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            className={styles.pageNumberButton}
                            aria-label={`Page ${item + 1}`}
                            aria-current={item === currentPage ? 'page' : undefined}
                            onClick={() => setOffset(item * templatesPerPage)}
                        >
                            {item + 1}
                        </button>
                    )
                ))}
            </nav>
            <div className={styles.previousNextButtonWrapper}
                style={{ marginLeft: offset > 0 ? null : 'auto' }}
            >
                {offset > 0 && (
                    <button
                        type="button"
                        className={styles.previousNextButton}
                        onClick={() =>
                            setOffset(Math.max(offset - templatesPerPage, 0))
                        }
                    >
                        Previous
                    </button>
                )}
                {offset + resumeTemplates.length < totalTemplates && (
                    <button
                        type="button"
                        className={styles.previousNextButton}
                        name="next"
                        onClick={() => setOffset(offset + templatesPerPage)}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}