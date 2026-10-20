import PreviewContainer from "./PreviewContainer";

export default function PreviewPaper({ resume }) {
  const containers = resume.containers.allIds
    .map((id) => resume.containers.byId[id])
    .filter(Boolean);

  return containers.map((container, index) => (
    <PreviewContainer
      key={container.id}
      container={container}
      resume={resume}
      isFirstContainer={index === 0}
      isLastContainer={index === containers.length - 1}
    />
  ));
}
