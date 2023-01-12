import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Editor, { EditorProps, useMonaco } from "@monaco-editor/react";

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
    <div className="overflow-hidden w-full h-full max-h-[75vh] rounded-md  shadow-4xl">
      <Editor 
        language={language}
        value={code}
        theme={theme}
        onChange={onChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
