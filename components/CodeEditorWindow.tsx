import Editor, { EditorProps } from "@monaco-editor/react";
import { useStoreThemeCode } from "@store";
import { defineTheme } from "@utils";

interface props extends EditorProps {
  code?: string;
}
const CodeEditorWindow = ({
  onChange,
  language = "javascript",
  code = "/// Happy coding",
}: props) => {
  const state = useStoreThemeCode();

  return (
		<div className='border-black rounded-md w-full h-full min-h-[70vh] shadow-4xl'>
			<Editor
				height={'100%'}
				language={language}
				value={code}
				theme={state.themeCode.key}
				onChange={onChange}
			/>
		</div>
	);
};
export { CodeEditorWindow };
