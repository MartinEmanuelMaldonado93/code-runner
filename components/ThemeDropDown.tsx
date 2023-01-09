import React, { Dispatch, FC, SetStateAction } from "react";
import Select, { ActionMeta, MultiValue, SingleValue, Theme } from "react-select";
import ThemesList from "monaco-themes/themes/themelist.json";
import { ThemeOption } from "types/ThemeOption";
import { languageDropdownStyle } from "constants/languageDropdownStyle";

type props = {
    theme?: string,
    // handleThemeChange: Dispatch<SetStateAction<ThemeOption>>
    handleThemeChange: any
}
// const ThemeDropdown: FC<props> = ({ handleThemeChange, theme }) => {
function ThemeDropdown({ handleThemeChange, theme }: props): JSX.Element {
    const themesEntries: Array<[string, string]> = Object.entries(ThemesList);
    const optionsMaped: Array<ThemeOption> = themesEntries.map(([Key, Name]) => ({
        label: Name,
        value: Name,
        key: Key,
    }));
    const defaultOption: ThemeOption = {
        key: "GitHub Light",
        label: "GitHub Light",
        value: "GitHub Light"
    }

    function onChange(newValue: SingleValue<ThemeOption> | MultiValue<ThemeOption>, actionMeta: ActionMeta<ThemeOption>) {
        // if (!selectedOption) return;

        // console.log(selectedOption);
        handleThemeChange(newValue);
    }
    return (
        <Select
            placeholder="Select Theme"
            options={optionsMaped}
            onChange={onChange}
            value={defaultOption}
            styles={languageDropdownStyle}
        />

    );
};

export default ThemeDropdown;