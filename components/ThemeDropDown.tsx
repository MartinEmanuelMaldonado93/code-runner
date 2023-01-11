import React, { Dispatch, FC, SetStateAction } from "react";
import Select, {
	ActionMeta,
	MultiValue,
	SingleValue,
	Theme,
} from "react-select";
import ThemesListJson from "monaco-themes/themes/themelist.json";
import { ThemeOption } from "types/ThemeOption";
import { languageDropdownStyle } from "constants/languageDropdownStyle";

type props = {
	theme?: string;
	// handleThemeChange: Dispatch<SetStateAction<ThemeOption>>
	handleThemeChange: any;
};
const ThemeDropdown: FC<props> = ({ handleThemeChange, theme }) => {
	const themesEntries: [string, string][] = Object.entries(ThemesListJson);

	const optionsMaped: ThemeOption[] = themesEntries.map(
		([Key, Name]) =>
			({
				label: Name,
				value: Name,
				key: Key,
			} satisfies ThemeOption)
	);

	const defaultOption: ThemeOption = {
		key: "GitHub Light",
		label: "GitHub Light",
		value: "GitHub Light",
	};

	function onChange(
		newValue: SingleValue<ThemeOption> | MultiValue<ThemeOption>,
		actionMeta: ActionMeta<ThemeOption>
	) {
		const ThemeSelected = newValue as ThemeOption;

		// console.log(newValue);

		handleThemeChange(ThemeSelected);
	}
	return (
		<Select
			placeholder='Select Theme'
			options={optionsMaped}
			onChange={onChange}
			defaultValue={defaultOption}
			styles={languageDropdownStyle}
		/>
	);
};

export default ThemeDropdown;
