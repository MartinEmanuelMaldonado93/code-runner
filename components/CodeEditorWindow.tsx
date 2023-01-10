import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor, { EditorProps, useMonaco } from "@monaco-editor/react";

interface props extends EditorProps {
  code?:string,
}
const CodeEditorWindow: FC<props> = ({ onChange, language, theme, code="/// Happy coding" }) => {
  const [valueCode, setValue] = useState<string>(code);
  const handleEditorChange = (value: string | undefined) => {
    // value ??= "";
    // console.warn(value);
    // setValue(value);
    // onChange!("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={valueCode}
        theme={theme}
        onChange={
          onChange
        } 
      />
    </div>
  );
};
export default CodeEditorWindow;