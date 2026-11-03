import { Editor, Transforms, Element as SlateElement } from "slate";

export const isBlockActive = (editor, format) => {
   const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
   });
   return !!match;
};

export const getEditorAlignment = (editor) => {
  if (!editor?.selection) return null;

  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.textAlign,
    mode: "lowest",
  });

  return match ? match[0].textAlign : null;
};

export const setAlignment = (editor, alignment) => {
   Transforms.setNodes(
      editor,
      { textAlign: alignment },
      {
         match: (n) => SlateElement.isElement(n),
         split: false,
      }
   );
};