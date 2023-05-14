import { defaultJavascriptCode } from '@constants';
import { useStoreThemeCode } from '@store';
import { useWindowsResize } from '@hooks';
import { useState } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

const CodeEditorWindow = (props: EditorProps) => {
	const state = useStoreThemeCode();
	const [code, setCode] = useState(defaultJavascriptCode);
	const { width, height } = useWindowsResize();

	return (
		<Editor
			{...props}
			width={Math.min(width-30, 600)}//pixels of rigth side with max width
			language='javascript'
			value={code}
			theme={state.themeCode.key}
			onChange={(value) => !!value && setCode(value)}
		/>
	);
};
export { CodeEditorWindow };
