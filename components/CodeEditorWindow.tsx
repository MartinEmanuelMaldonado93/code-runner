import { FC } from "react";
import Editor, { EditorProps } from "@monaco-editor/react";

interface props extends EditorProps {
  code?: string;
}
const CodeEditorWindow: FC<props> = ({
  onChange,
  language = "javascript",
  theme,
  code = "/// Happy coding",
}) => {
  return (
    <div className='border-black rounded-md w-full h-full min-h-[70vh] shadow-4xl'>
      <Editor
        height={"100%"}
        language={language}
        value={code}
        theme={theme}
        onChange={onChange}
      />
    </div>
  );
};
export { CodeEditorWindow };
