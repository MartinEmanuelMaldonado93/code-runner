import { ThemeOption } from "@types";

export function rawThemesEditorToSelectValues(ThemesListJson: any) {
	const themesEntries = Object.entries(ThemesListJson);
	const optionsMaped: ThemeOption[] = themesEntries.map(([Key, Name]) => ({
		label: Name as string,
		value: Name as string,
		key: Key,
	}));
	return optionsMaped;
}