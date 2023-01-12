import { languageDropdownStyle } from "constants/languageDropdownStyle";
import React, {   FC  } from "react";
import Select, {
    ActionMeta,
    MultiValue,
    SingleValue,
} from "react-select";
import { ThemeOption } from "types/ThemeOption";
import { ThemesPage } from "constants/ThemesPage";

type props = {
    theme?: ThemeOption;
    handleThemePageChange(theme: ThemeOption): void
};
const ThemePage: FC<props> = ({ handleThemePageChange, theme }) => {
    const themesEntries: [string, string][] = Object.entries(ThemesPage);
    const optionsMaped: ThemeOption[] = themesEntries.map(
        ([Key, Name]) =>
        ({
            label: Name,
            value: Name,
            key: Key,
        } satisfies ThemeOption)
    );
    
    function onChange(
        newValue: SingleValue<ThemeOption> | MultiValue<ThemeOption>,
        actionMeta: ActionMeta<ThemeOption>
    ) {
        const ThemeSelected = newValue as ThemeOption;
        console.log(ThemeSelected);
        handleThemePageChange(ThemeSelected);
    }
    return (
        <Select
            placeholder="Select Theme Page"
            options={optionsMaped}
            onChange={onChange}
            defaultValue={theme}
            styles={languageDropdownStyle}
        />
    );
};

export default ThemePage;
