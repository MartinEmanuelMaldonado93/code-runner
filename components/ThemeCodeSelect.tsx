import React, {  useEffect, useId, useRef } from 'react';
import { GroupBase } from 'react-select/dist/declarations/src/types';
import ThemesListJson from 'monaco-themes/themes/themelist.json';
import { ThemeOption } from '@types';
import { languageDropdownStyle } from '@constants';
import { useStoreThemeCode } from '@store';
import { defineEditorTheme } from '@utils';
import { useLocalStorage } from '@hooks';
import Select from 'react-select';

const ThemeCodeSelect = () => {
	const state = useStoreThemeCode();
	const ref = useRef<any>();
	const [langStorage, setLangStorage] = useLocalStorage('themePage', {
		key: '0',
		value: 'light',
		label: 'light',
	});
	const themesEntries = Object.entries(ThemesListJson);
	const optionsMaped = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));

	useEffect(() => {
		if (ref.current) {
			ref.current.prototype.setValue(langStorage);
		}
	}, [!!ref.current]);

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

export { ThemeCodeSelect };
