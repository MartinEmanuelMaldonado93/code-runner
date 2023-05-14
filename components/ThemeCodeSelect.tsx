import React, { useEffect, useId, useRef, useState } from 'react';
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
import OptionTypeBase from 'react-select';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

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

	const filterOptions = (
		option: FilterOptionOption<ThemeOption>,
		inputValue: string
	) => {
		// return optionsMaped.filter((option) =>
		// 	option.label.toLowerCase().includes(inputValue.toLowerCase())
		// );
		return option.label.toLowerCase().includes(inputValue.toLowerCase());
	};

	return (
		<Select<ThemeOption>
			ref={ref}
			className='inline'
			instanceId={useId()}
			placeholder='Search your favourite theme'
			options={optionsMaped}
			onChange={(newValue) => {
				if(!newValue) return;

				const { key, label, value } = newValue satisfies ThemeOption;
				if (!(key || label || value)) return;

				const themeSelected = newValue;
				state.setThemeCode(themeSelected);
				defineEditorTheme(themeSelected);
				setLangStorage(themeSelected);
			}}
			styles={languageDropdownStyle}
			isSearchable
			isClearable
			filterOption={filterOptions}
		/>
	);
};

export { ThemeCodeEditorSelect as ThemeCodeSelect };
