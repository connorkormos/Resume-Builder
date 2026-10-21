import { resolveResumePresentation } from '@/utils/resumePresentation.js';
import PreviewContainer from './PreviewContainer';

export default function PreviewPaper({ resume }) {
  const presentation = resolveResumePresentation(resume);
  const normalizedResume = { ...resume, layout: presentation.resumeLayout };
  return (
    <div style={presentation.pageStyle}>
      {presentation.containerIds.map(id => (
        <PreviewContainer
          key={id}
          container={resume.containers.byId[id]}
          resume={normalizedResume}
          presentation={presentation.containersById[id]}
          sectionPresentations={presentation.sectionsById}
        />
      ))}
    </div>
  );
}
