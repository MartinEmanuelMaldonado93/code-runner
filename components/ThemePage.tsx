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

const ThemePage = () => {
	const state = useStoreThemePage();
	const [themePageStorage, setThemeFromStorage] = useLocalStorage(
		LS_KEYS.landingPage,
		defaultCodeEditorDark
	);

	useEffect(() => {
		!!state && state.setTheme(themePageStorage);
	}, []);

	const optionsMaped = rawThemesPageToSelectValues(ThemesPage);

	return (
		<Select
			instanceId={useId()}
			placeholder='Select Theme Page'
			options={optionsMaped}
			defaultValue={state.theme}
			value={state.theme}
			styles={languageDropdownStyle}
			onChange={(newValue) => {
				const ThemeSelected = newValue as ThemeOption;
				state.setTheme(ThemeSelected);
				setThemeFromStorage(ThemeSelected);
			}}
		/>
	);
};

export { ThemePage };
