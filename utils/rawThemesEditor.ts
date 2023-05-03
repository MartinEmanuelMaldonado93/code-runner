export function rawThemesEditorToSelectValues(ThemesListJson: any) {
	const themesEntries = Object.entries(ThemesListJson);
	const optionsMaped = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));
	return optionsMaped;
}