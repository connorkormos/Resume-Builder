import SectionBorder from "@/pages/ResumeEditorPage/features/ResumePaper/components/SectionBorder";
import RichText from "./RichText";
import PreviewSubsection from "./PreviewSubsection";

export default function PreviewSection({
  section,
  container,
  resume,
  presentation,
}) {
  const layout = resume.layout;
  const styling = {
    resumeStyling: resume.styling,
    containerStyling: container.styling,
    sectionStyling: section.styling,
  };
  const subsections = section.subsectionIds
    .map((id) => resume.subsections.byId[id])
    .filter(Boolean);
  return (
    <div style={presentation.style} data-section-id={section.id}>
      {section.showHeading !== false && (
        <RichText
          value={section.value}
          styling={styling}
          gap={layout.gap}
        />
      )}
      {subsections.map((subsection, index) => (
        <PreviewSubsection
          key={subsection.id}
          subsection={subsection}
          section={section}
          resume={resume}
          styling={styling}
          isLast={index === subsections.length - 1}
        />
      ))}
      {["top", "bottom", "left", "right"].map(
        (side) =>
          section.styling?.border?.[side] && (
            <SectionBorder
              key={side}
              sectionBorder={section.styling.border[side]}
              borderSide={side}
            />
          ),
      )}
    </div>
  );
}
