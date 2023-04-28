import React, { FC, useId, useState } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import ThemesListJson from 'monaco-themes/themes/themelist.json';
import { ThemeOption } from '@types';
import { languageDropdownStyle } from '@constants';
import { useStoreThemeCode } from '@store';
import { defineTheme } from '@utils';

const ThemeCodeSelect = () => {
	const state = useStoreThemeCode();
	const themesEntries = Object.entries(ThemesListJson);
	const optionsMaped = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));

	return (
		<Select
			instanceId={useId()}
			placeholder='Select Theme Editor'
			options={optionsMaped}
			onChange={(newValue) => {
				const ThemeSelected = newValue as ThemeOption;
				state.setThemeCode(ThemeSelected);
				// if (['light', 'vs-dark'].includes(state.themeCode.value)) {
				// }
				defineTheme(ThemeSelected);
			}}
			defaultValue={state.themeCode}
			value={state.themeCode}
			styles={languageDropdownStyle}
		/>
	);
};

export { ThemeCodeSelect as ThemeEditorDropdown };
