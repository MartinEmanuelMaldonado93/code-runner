import { defaultJavascriptCode } from '@constants';
import { useStoreThemeCode } from '@store';
import { useState } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

const CodeEditorWindow = (props: EditorProps) => {
	const state = useStoreThemeCode();
	const [code, setCode] = useState(defaultJavascriptCode);

	return (
		<Editor
			{...props}
			language='javascript'
			value={code}
			theme={state.themeCode.key}
			onChange={(value) => value && setCode(value)}
		/>
	);
};
export { CodeEditorWindow };
