import React, { Dispatch, FC, SetStateAction } from "react";
import Select, { Theme } from "react-select";
import ThemesList from "monaco-themes/themes/themelist.json";
import { ThemeOption } from "types/ThemeOption";
// import { customStyles } from "../constants/customStyles";

// type ThemeMonaco = Record<string, string>;

type props = {
    theme?: string,
    handleThemeChange: Dispatch<SetStateAction<ThemeOption>>
}
// const ThemeDropdown: FC<props> = ({ handleThemeChange, theme }) => {
function ThemeDropdown({ handleThemeChange, theme = "GitHub Light" }: props): JSX.Element {
    const themesEntries: Array<[string, string]> = Object.entries(ThemesList);
    const optionsMaped: Array<ThemeOption> = themesEntries.map(([Key, Name]) => ({
        label: Name,
        value: Name,
        key: Key,
    }));

    return (
        <Select
            placeholder={"Select Theme"}
            options={optionsMaped}
            onChange={
                (selectedOption) => {
                    if (!selectedOption) return;

                    handleThemeChange(selectedOption);
                }
            }
        // value={theme ? defaultTheme : null}
        // styles={customStyles}
        />
    );
};

export default ThemeDropdown;