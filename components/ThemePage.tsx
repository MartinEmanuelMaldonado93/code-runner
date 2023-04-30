import React, { FC, useEffect, useId, useState } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import {
	ThemesPage,
	defaultDarkTheme,
	languageDropdownStyle,
} from '@constants';
import { ThemeOption } from '@types';
import { useStoreThemePage } from '@store';
import { useLocalStorage } from '@hooks';

const ThemePage = () => {
	const [themePageStorage, setThemeFromStorage] = useLocalStorage(
		'themePage',
		defaultDarkTheme
	);
	const state = useStoreThemePage();
	
	useEffect(() => {
		state.setTheme(themePageStorage);
	}, []);

	const themesEntries = Object.entries(ThemesPage);
	const optionsMaped = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));

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
