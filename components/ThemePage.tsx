import React, { FC, useEffect, useId, useState } from "react";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { ThemesPage, languageDropdownStyle } from "@constants";
import { ThemeOption } from "@types";

type props = {
  theme?: ThemeOption; // ! may trigger hydration err
  handleThemePageChange(theme: ThemeOption): void;
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
    handleThemePageChange(ThemeSelected);
  }
  return (
    <Select
      instanceId={useId()}
      placeholder='Select Theme Page'
      options={optionsMaped}
      defaultValue={theme}
      value={theme}
      styles={languageDropdownStyle}
      onChange={onChange}
    />
  );
};

export { ThemePage };
