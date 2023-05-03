export function rawThemesPageToSelectValues(rawThemes: string[]) {
	const themesEntries = Object.entries(rawThemes);
	const optionsMaped = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));
	return optionsMaped;
}