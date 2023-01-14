import React, { Dispatch, SetStateAction, FC } from "react";
import Select from "react-select";
import { languageOptions } from "../constants/languageOptions";
import { languageDropdownStyle } from "../constants/languageDropdownStyle";
import { LanguageData } from "types/LanguageDropDown";

type props = {
  onSelectChange: Dispatch<SetStateAction<LanguageData>>,
  language: LanguageData,
};
const LanguagesDropdown: FC<props> = ({ onSelectChange,language }): JSX.Element => {
  // function LanguagesDropdown({ onSelectChange }: props): JSX.Element {
  return (
    <Select
      placeholder="Filter By Category"
      isSearchable={true}
      isClearable={true}
      options={languageOptions}
      defaultValue={languageOptions[0]}
      value={language}
      onChange={(selectedOption) => {
        if (!selectedOption) return;

        onSelectChange(selectedOption);
      }}
      styles={languageDropdownStyle}
    />
  );
};

export default LanguagesDropdown;
