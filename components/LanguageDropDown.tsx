import React, { Dispatch, SetStateAction } from "react";
import Select from "react-select";
// import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";
import { LanguageDropDown } from "types/LanguageDropDown";

const LanguagesDropdown = ( onSelectChange : Dispatch<SetStateAction<LanguageDropDown>>) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
    //   styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption!)}
    />
  );
};

export default LanguagesDropdown;