import React, { Dispatch, SetStateAction, FC, useId } from "react";
import Select from "react-select";
import { languageOptions } from "../constants/languageOptions";
import { languageDropdownStyle } from "../constants/languageDropdownStyle";
import { LanguageData } from "types/LanguageDropDown";

type props = {
  onSelectChange: Dispatch<SetStateAction<LanguageData>>;
  language: LanguageData;
};
const LanguagesDropdown: FC<props> = ({
  onSelectChange,
  language,
}): JSX.Element => {
  return (
    <Select
      instanceId={useId()}
      placeholder='Filter By Category'
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

export { LanguagesDropdown };
