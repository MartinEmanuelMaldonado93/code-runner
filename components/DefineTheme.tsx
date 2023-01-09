import { loader } from "@monaco-editor/react";
import ThemesList from "monaco-themes/themes/themelist.json";
import ThemesLis from "monaco-themes/themes/Amy.json";
import { SingleValue } from "react-select";
import { ThemeOption } from "types/ThemeOption";

function defineTheme(themeSelected: ThemeOption) {
    const themeName = themeSelected.key;
    console.log("themeName:", themeName);
    const promiseAll = (resolve: (value?: unknown) => void) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${themeSelected!.value}.json`),
        ])
            .then(
                ([monaco, themeData]) => {
                    monaco.editor.defineTheme(themeName, themeData);
                    resolve();
                }
            ).catch(console.warn);
    }

    return new Promise(promiseAll);
};

export { defineTheme };