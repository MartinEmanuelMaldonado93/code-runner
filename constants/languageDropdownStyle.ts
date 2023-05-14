import { GroupBase, StylesConfig } from "react-select";
import { LanguageData } from "types/LanguageDropDown";
import { ThemeOption } from "types/ThemeOption";

// type SelectComponent = ThemeOption | LanguageData;
export const languageDropdownStyle:
  | StylesConfig<any, false, GroupBase<any>>
  | undefined = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: ".5rem",
    color: "#000",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    border: "1px solid #000000",
    transition: "500ms",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      borderRadius: ".5rem", 
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      borderRadius: ".5rem",
      transitionDuration: "500ms",
    };
  },
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "hsl(0deg 0% 0% / 72.16%)",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
