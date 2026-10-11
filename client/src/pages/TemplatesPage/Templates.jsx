import styles from "./Templates.module.css";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ResumePreviewCard from "@/features/ResumePreview/ResumePreviewCard";
import { getResumesBySearchFromApi } from "@/services/resumeServices";
import { MdArrowDropDown } from "react-icons/md";
export default function Templates() {
  // ! Convert to URL Params/Routing
  // ! Look into storage of resume templates to prevent unnecessary additional requests

  const isMobile = useMediaQuery("(width < 768px)");

  const templatesPerPage = isMobile ? 12 : 15;
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [offset, setOffset] = useState(0);
  const [resumeTemplates, setResumeTemplates] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resumeTypes, setResumeTypes] = useState(["officialTemplate"]);
  const [resumeTypesOpen, setResumeTypesOpen] = useState(false);

  const pageCount = Math.ceil(totalTemplates / templatesPerPage);
  const currentPage = Math.floor(offset / templatesPerPage);
  // Slot limits include ellipses. Use whole numbers; values below 5 become 5.
  const mobilePageSlots = 7;
  const desktopPageSlots = 11;
  const maxPageSlots = Math.max(5, isMobile ? mobilePageSlots : desktopPageSlots);
  const edgePageCount = maxPageSlots - 2;
  const middlePageCount = maxPageSlots - 4;
  const middleStart = currentPage - Math.floor((middlePageCount - 1) / 2);
  const middleEnd = middleStart + middlePageCount - 1;

  let paginationItems;
  if (pageCount <= maxPageSlots) {
    paginationItems = Array.from({ length: pageCount }, (_, i) => i);
  } else if (middleStart <= 2) {
    paginationItems = [...Array.from({ length: edgePageCount }, (_, i) => i), 'end-ellipsis', pageCount - 1];
  } else if (middleEnd >= pageCount - 3) {
    paginationItems = [0, 'start-ellipsis', ...Array.from({ length: edgePageCount }, (_, i) => pageCount - edgePageCount + i)];
  } else {
    paginationItems = [0, 'start-ellipsis', ...Array.from({ length: middlePageCount }, (_, i) => middleStart + i), 'end-ellipsis', pageCount - 1];
  }

  const resumeTypeCheckboxOptions = [
    { value: "officialTemplate", label: "Official Templates" },
    { value: "personal", label: "My Resumes" },
  ];

  const toggleResumeType = (value) => {
    setResumeTypes((currentResumeTypes) =>
      currentResumeTypes.includes(value)
        ? currentResumeTypes.filter((type) => type !== value)
        : [...currentResumeTypes, value],
    );
  };

  const fetchTemplates = async () => {
    const templateData = await getResumesBySearchFromApi(
      searchQuery,
      sortBy,
      templatesPerPage,
      offset,
      resumeTypes,
    );
    setResumeTemplates(templateData.results ?? []);
    setTotalTemplates(templateData.totalCount ?? 0);
  };
  useEffect(() => {
    fetchTemplates();
  }, [offset, sortBy]);



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
    <div className={styles.templatesPageContainer}>
      <div className={styles.templatesPageContentWrapper}>
        <h1 className={styles.templatesPageTitle}>Browse Resumes</h1>

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

        <div className={styles.templatePreviewsGridWrapper}>
          {resumeTemplates.map((template) => (
            <ResumePreviewCard
              key={template.id}
              styling={{
                width: "100%",
                fontSize: isMobile ? '1rem' : 'auto'
              }}
              resumeId={template.id}
            />
          ))}
        </div>
        {resumeTemplates.length === 0 && <p>No templates available.</p>}
        {resumeTemplates.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
