import PreviewSection from "./PreviewSection";

export default function PreviewContainer({ container, resume, isFirstContainer, isLastContainer }) {
  const sections = container.sectionIds
    .map((id) => resume.sections.byId[id])
    .filter(Boolean);

  return (
    <div
      style={{
        height: "100%",
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        flex:
          container.layout?.width?.auto || !container.layout?.width?.value
            ? "1 1 0%"
            : `0 0 ${container.layout.width.value}`,
      }}
    >
      {sections.map((section, index) => (
        <PreviewSection
          key={section.id}
          section={section}
          container={container}
          resume={resume}
          isFirstContainer={isFirstContainer}
          isLastContainer={isLastContainer}
          isFirstSection={index === 0}
          isLastSection={index === sections.length - 1}
        />
      ))}
    </div>
  );
}
