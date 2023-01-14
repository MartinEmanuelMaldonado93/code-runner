import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useKeyPress from "../hooks/useKeyPress";
import ThemeEditorDropdown from "@components/ThemeEditorDropDown";
import LanguagesDropdown from "@components/LanguageDropDown";
import CodeEditorWindow from "@components/CodeEditorWindow";
import { languageOptions } from "constants/languageOptions";
import { LanguageData } from "types/LanguageDropDown";
import { OnChange } from "@monaco-editor/react";
import { ThemeOption } from "types/ThemeOption";
import { defineTheme } from "@components/DefineTheme";
import axios from "axios";
import { javascriptCodeDefault } from "constants/javascriptCodeDefault";
import OutputResults from "@components/OutputResults";
import CustomInput from "@components/CustomInput";
import { Status } from "types/Status";
import ProblemDescription from "@components/ProblemDescription";
import Footer from "@components/Footer";
import { safeDeEncodeFrom64, safeEncodeTo64 } from "utils";
import { DataOutput } from "types/dataOutput";
import OutputDetails from "@components/OutputDetails";
import { showSuccessToast } from "ui_components/showSucces";
import { showErrorToast } from "ui_components/showError";
import ThemePage from "@components/ThemePage";
import { problems } from "constants/problems";
import useLocalStorage from "hooks/useLocalStorage";
import ConsoleDetails from "@components/ConsoleDetails";

const __KEY__ = "617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d";
const __HOST__ = "judge0-ce.p.rapidapi.com";

const Landing = () => {
  const [code, setCode] = useState<string>(javascriptCodeDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputData, setOutputData] = useState<DataOutput>();
  const [isProcessing, setIsProcessing] = useState<boolean>();
  const [language, setLanguage] = useState<LanguageData>(languageOptions[0]);
  const [themeEditor, setThemeEditor] = useState<ThemeOption>({
    key: "vs-dark",
    value: "vs-dark",
    label: "vs-dark",
  });

  const [themeFromStorage, setThemeFromStorage] = useLocalStorage("themePage", {
    key: "0",
    value: "light",
    label: "light",
  } satisfies ThemeOption);
  const [themePage, setThemePage] = useState<ThemeOption>();

  useEffect(() => {
    setThemePage(themeFromStorage);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
  // console.log("themePage: ", themePage);
  // console.log("themeFromStorage: ", themeFromStorage);
  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enterPress", enterPress);
  //     console.log("ctrlPress", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  const onChange: OnChange = (codeStr, event) => {
    setCode(codeStr ?? "");
  };
  /** Send code to an API method POST */
  const handleCompile = () => {
    setIsProcessing(true);

    const formData = {
      language_id: language.id,
      source_code: safeEncodeTo64(code),
      stdin: safeEncodeTo64(customInput),
    };
    const options = {
      method: "POST",
      url: "https://" + __HOST__ + "/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": __KEY__,
        "X-RapidAPI-Host": __HOST__,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setIsProcessing(false);
        console.log(error);
      });
  };
  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: "https://" + __HOST__ + "/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": __HOST__,
        "X-RapidAPI-Key": __KEY__,
      },
    };

    try {
      const response = await axios.request(options);
      const dataOutput: DataOutput = response.data;
      let statusId = dataOutput.status.id;

      if ([1, 2].includes(statusId)) {
        setTimeout(() => {
          checkStatus(token);
        }, 1000);
        return;
      }

      setIsProcessing(false);
      if (statusId === 3) {
        showSuccessToast(`Compiled Successfully!`);
      } else {
        showErrorToast();
      }
      setOutputData(dataOutput);
    } catch (err) {
      setIsProcessing(false);
      showErrorToast("error in request");
      console.log("err", err);
    }
  };
  function handleThemeChange(theme: ThemeOption) {
    //default themes 
    if (["light", "vs-dark"].includes(theme.value)) {
      setThemeEditor(theme);
      return;
    }

    defineTheme(theme).then(() => { });
  }

  function handleThemePageChange(themePage: ThemeOption) {
    setThemePage(themePage);
    setThemeFromStorage(themePage);// the last theme selected
  }

  return (
    <div data-theme={
      themePage ? themePage.label : "light"
    } className="h-screen max-h-screen flex flex-col justify-between overflow-y-auto">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <ConsoleDetails outputData={outputData} />
        </label>
      </label>
      <div className="navbar text-xl normal-case gap-2 bg-base-200">
        <div className="grow select-none"> {"{"} Code Runner ⚡ {"}"}</div>
        <LanguagesDropdown onSelectChange={setLanguage} language={language} />
        <ThemePage theme={themePage} handleThemePageChange={handleThemePageChange} />
        <ThemeEditorDropdown theme={themeEditor} handleThemeChange={handleThemeChange} />
      </div>
      <div id="editorSection" className="flex px-4 py-2">
        <ProblemDescription problem={problems[0]} />
        <div className="w-full">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language.value}
            theme={themeEditor.key}
          />
        </div>
      </div>
      <div id="outputSection">
        <div className="flex justify-end gap-9">
          <label htmlFor="my-modal-4" className="btn btn-active">See More Details</label>
          <button
            onClick={handleCompile}
            disabled={isProcessing}
            className={`btn btn-primary mr-8`}
          >
            {isProcessing ? "Processing..." : "Submit"}
          </button>
        </div>
        {outputData ? <OutputDetails outputDetails={outputData} /> : null}
      </div>
      <Footer />
    </div>
  );
};
export default Landing;
