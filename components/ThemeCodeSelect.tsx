import React, { useEffect, useId, useRef } from 'react';
import { GroupBase } from 'react-select/dist/declarations/src/types';
import ThemesListJson from 'monaco-themes/themes/themelist.json';
import { ThemeOption } from '@types';
import {
	LS_KEYS,
	defaultCodeEditorDark,
	languageDropdownStyle,
} from '@constants';
import { useStoreThemeCode } from '@store';
import { defineEditorTheme, rawThemesEditorToSelectValues } from '@utils';
import { useLocalStorage } from '@hooks';
import Select from 'react-select';

const ThemeCodeEditorSelect = () => {
	const state = useStoreThemeCode();
	const ref = useRef<any>();
	const [langStorage, setLangStorage] = useLocalStorage(
		LS_KEYS.codeEditor,
		defaultCodeEditorDark
	);
	const optionsMaped = rawThemesEditorToSelectValues(ThemesListJson);

	useEffect(() => {
		!!ref.current && ref.current.setValue(langStorage);
	}, []);

	return (
		<Select
			ref={ref}
			className='inline'
			instanceId={useId()}
			placeholder='Your favourite theme'
			options={optionsMaped}
			onChange={(newValue) => {
				const themeSelected = newValue as ThemeOption;
				state.setThemeCode(themeSelected);
				defineEditorTheme(themeSelected);
				setLangStorage(themeSelected);
			}}
			styles={languageDropdownStyle}
		/>
	);
};

export { ThemeCodeEditorSelect as ThemeCodeSelect };
