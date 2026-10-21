import PreviewSection from './PreviewSection';

export default function PreviewContainer({ container, resume, presentation, sectionPresentations }) {
  return (
    <div style={presentation.style} data-container-id={container.id}>
      {presentation.sectionIds.map(id => (
        <PreviewSection
          key={id}
          section={resume.sections.byId[id]}
          container={container}
          resume={resume}
          presentation={sectionPresentations[id]}
        />
      ))}
    </div>
  );
}
