import React, { FC, useId, useState } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import ThemesListJson from "monaco-themes/themes/themelist.json";
import { ThemeOption } from "@types";
import { languageDropdownStyle } from "@constants";

type props = {
  theme?: ThemeOption;
  handleThemeChange(theme: ThemeOption): void;
};
const ThemeEditorDropdown: FC<props> = ({ handleThemeChange, theme }) => {
  const themesEntries: [string, string][] = Object.entries(ThemesListJson);

  const optionsMaped: ThemeOption[] = themesEntries.map(
    ([Key, Name]) =>
      ({
        label: Name,
        value: Name,
        key: Key,
      } satisfies ThemeOption)
  );
  const [themeEditorName, setEditorName] = useState(theme);

  function onChange(
    newValue: SingleValue<ThemeOption> | MultiValue<ThemeOption>,
    actionMeta: ActionMeta<ThemeOption>
  ) {
    const ThemeSelected = newValue as ThemeOption;
    handleThemeChange(ThemeSelected);
    setEditorName(ThemeSelected);
  }
  return (
    <Select
      instanceId={useId()}
      placeholder='Select Theme Editor'
      options={optionsMaped}
      onChange={onChange}
      defaultValue={theme}
      value={themeEditorName}
      styles={languageDropdownStyle}
    />
  );
};

export { ThemeEditorDropdown };
