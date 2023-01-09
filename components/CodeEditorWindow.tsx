import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import Editor, { EditorProps } from "@monaco-editor/react";

interface props extends EditorProps {
  code?:string,
}
const CodeEditorWindow: FC<props> = ({ onChange, language, theme, code }) => {
  const [valueCode, setValue] = useState(" ");

  const handleEditorChange = (value: string | undefined) => {
    value ??= "";
    console.log(value);
    setValue(value);
    onChange!("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={valueCode}
        theme={theme}
        defaultValue="// some comment"
        onChange={
          handleEditorChange
        }
      />
    </div>
  );
};
export default CodeEditorWindow;