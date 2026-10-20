import { parseRemValue } from "@/utils/formatters";
import SectionBorder from "@/pages/ResumeEditorPage/features/ResumePaper/components/SectionBorder";
import RichText from "./RichText";
import PreviewSubsection from "./PreviewSubsection";

export default function PreviewSection({
  section,
  container,
  resume,
  isFirstContainer,
  isLastContainer,
  isFirstSection,
  isLastSection,
}) {
  const layout = resume.layout;
  const padding = layout.padding || {};
  const withGap = (value, gap) =>
    `${Math.max(0, parseRemValue(value) + parseRemValue(gap))}rem`;
  const sectionStyle = { ...section.styling };
  // These saved properties describe custom rendering, not CSS declarations.
  delete sectionStyle.border;
  delete sectionStyle.fontSizeOffset;
  delete sectionStyle.lineHeightOffset;
  const styling = {
    resumeStyling: resume.styling,
    containerStyling: container.styling,
    sectionStyling: section.styling,
  };
  const subsections = section.subsectionIds
    .map((id) => resume.subsections.byId[id])
    .filter(Boolean);
  return (
    <div
      style={{
        ...sectionStyle,
        position: "relative",
        height: "min-content",
        paddingLeft:
          isFirstContainer
            ? padding.left
            : withGap(
                container.layout?.padding?.left,
                layout.gap?.horizontal,
              ),
        paddingRight:
          isLastContainer
            ? padding.right
            : withGap(
                container.layout?.padding?.right,
                layout.gap?.horizontal,
              ),
        paddingTop:
          isFirstSection
            ? padding.top
            : withGap(
                section.layout?.padding?.top,
                layout.gap?.vertical,
              ),
        paddingBottom:
          isLastSection
            ? padding.bottom
            : withGap(
                section.layout?.padding?.bottom,
                layout.gap?.vertical,
              ),
        flex: isLastSection ? "1" : "none",
      }}
    >
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
          section.styling.border?.[side] && (
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
