import { loader } from "@monaco-editor/react";
import { ThemeOption } from "types/ThemeOption";
import { String64 } from "types/DataOutput";

export function safeEncodeTo64(str: string) {
  return Buffer.from(String(str)).toString("base64");
}
export function safeDeEncodeFrom64(str: string) {
  // return atob(str); ** deprecated
  return Buffer.from(str, "base64").toString("utf-8");
}

/** Change the theme through instance of editor */
export function defineTheme(themeSelected: ThemeOption) {
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
