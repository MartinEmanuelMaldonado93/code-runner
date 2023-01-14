import React, { Dispatch, FC, SetStateAction } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  SingleValue,
} from "react-select";
import ThemesListJson from "monaco-themes/themes/themelist.json";
import { ThemeOption } from "types/ThemeOption";
import { languageDropdownStyle } from "constants/languageDropdownStyle";

type props = {
  theme?: ThemeOption;
  handleThemeChange(theme: ThemeOption): void
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

  function onChange(
    newValue: SingleValue<ThemeOption> | MultiValue<ThemeOption>,
    actionMeta: ActionMeta<ThemeOption>
  ) {
    const ThemeSelected = newValue as ThemeOption;

    handleThemeChange(ThemeSelected);
  }
  return (
    <Select
      placeholder="Select Theme Editor"
      options={optionsMaped}
      onChange={onChange}
      defaultValue={theme}
      value={theme}
      styles={languageDropdownStyle}
    />
  );
};

export default ThemeDropdown;
