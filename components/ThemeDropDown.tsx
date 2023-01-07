import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist.json";
// import { customStyles } from "../constants/customStyles";
type props = {
    theme: string,
    handleThemeChange: () => void
}

const ThemeDropdown = ({ handleThemeChange, theme }: props) => {
    const themesEntries = Object.entries(monacoThemes);
    
    const optionsMaped = themesEntries.map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
    }))

    return (
        <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={ optionsMaped }
            value={theme}
            //   styles={customStyles}
            onChange={handleThemeChange}
        />
    );
};

export default ThemeDropdown;