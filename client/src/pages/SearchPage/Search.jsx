import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ResumePreviewCard from "@/features/ResumePreview/ResumePreviewCard";
import { getResumesBySearchFromApi } from "@/services/resumeServices";
import { MdArrowDropDown } from "react-icons/md";

import Form from "./components/Form.jsx";
import Pagination from "./components/Pagination.jsx";

import styles from "./Search.module.css";

export default function Search() {
  // ! Convert to URL Params/Routing
  // ! Look into storage of resume templates to prevent unnecessary additional requests

  const isMobile = useMediaQuery("(width < 768px)");
  const isLargeScreen = useMediaQuery("(width >= 2560px)");

  let templatesPerPage = 12;
  if (isMobile) templatesPerPage = 8;
  else if (isLargeScreen) templatesPerPage = 15;
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




  return (
    <div className={styles.templatesPageContainer}>
      <div className={styles.templatesPageContentWrapper}>
        <h1 className={styles.templatesPageTitle}>Browse Resumes</h1>

        <Form
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOpen={sortOpen}
          setSortOpen={setSortOpen}
          resumeTypes={resumeTypes}
          resumeTypesOpen={resumeTypesOpen}
          setResumeTypesOpen={setResumeTypesOpen}
          toggleResumeType={toggleResumeType}
          setOffset={setOffset}
          fetchTemplates={fetchTemplates}
        />

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
          <Pagination 
            offset={offset}
            setOffset={setOffset}
            paginationItems={paginationItems}
            templatesPerPage={templatesPerPage}
            resumeTemplates={resumeTemplates}
            totalTemplates={totalTemplates}
          />
        )}
      </div>
    </div>
  );
}
