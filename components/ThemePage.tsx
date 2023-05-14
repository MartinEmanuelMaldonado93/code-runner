import React, { useEffect, useId } from 'react';
import Select from 'react-select';
import {
	LS_KEYS,
	ThemesPage,
	defaultCodeEditorDark,
	languageDropdownStyle,
} from '@constants';
import { ThemeOption } from '@types';
import { useStoreThemePage } from '@store';
import { useLocalStorage } from '@hooks';
import { rawThemesPageToSelectValues } from '@utils';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

const ThemePage = () => {
	const state = useStoreThemePage();
	const [themePageStorage, setThemeFromStorage] = useLocalStorage(
		LS_KEYS.landingPage,
		defaultCodeEditorDark
	);
	const optionsMaped = rawThemesPageToSelectValues(ThemesPage);

	useEffect(() => !!state && state.setTheme(themePageStorage), []);

	const filterOptions = (
		option: FilterOptionOption<ThemeOption>,
		inputValue: string
	) => option.label.toLowerCase().includes(inputValue.toLowerCase());

	return (
		<Select<ThemeOption>
			instanceId={useId()}
			placeholder='Select Theme Page'
			options={optionsMaped}
			defaultValue={state.theme}
			value={state.theme}
			styles={languageDropdownStyle}
			onChange={(newValue) => {
				if (!newValue) return;

				const { key, label, value } = newValue satisfies ThemeOption;
				if (!(key || label || value)) return;

				const ThemeSelected = newValue;
				state.setTheme(ThemeSelected);
				setThemeFromStorage(ThemeSelected);
			}}
			isSearchable
			isClearable
			filterOption={filterOptions}
		/>
	);
};

export { ThemePage };
