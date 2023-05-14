import { ThemeOption } from "@types";

export function rawThemesPageToSelectValues(rawThemes: string[]) {
	const themesEntries = Object.entries(rawThemes);
	const optionsMaped: ThemeOption[] = themesEntries.map(([Key, Name]) => ({
		label: Name,
		value: Name,
		key: Key,
	}));
	return optionsMaped;
}