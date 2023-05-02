import { loader } from "@monaco-editor/react";
import { ThemeOption } from "@types";

/** Change the theme through instance of editor */
export function defineEditorTheme(themeSelected: ThemeOption) {
  const promiseAll = (resolve: (value?: unknown) => void) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${themeSelected.value}.json`),
    ])
      .then(([monaco, themeData]) => {
        monaco.editor.defineTheme(themeSelected.key, themeData);
        monaco.editor.setTheme(themeSelected.key);
        resolve();
      })
      .catch(console.warn);
  };

  return new Promise(promiseAll);
}
