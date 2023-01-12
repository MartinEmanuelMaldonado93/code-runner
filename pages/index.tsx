import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useKeyPress from "../hooks/useKeyPress";
import ThemeDropdown from "@components/ThemeDropDown";
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
import { safeEncodeTo64 } from "utils";
import { DataOutput } from "types/dataOutput";
import OutputDetails from "@components/OutputDetails";
import { showSuccessToast } from "ui_components/showSucces";
import { showErrorToast } from "ui_components/showError";

const __KEY__ = "617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d";
const __HOST__ = "judge0-ce.p.rapidapi.com";

const Landing = () => {
  const [code, setCode] = useState<string>(javascriptCodeDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState<DataOutput>();
  const [processing, setProcessing] = useState<boolean>();
  const [language, setLanguage] = useState<LanguageData>(languageOptions[0]);
  const [theme, setTheme] = useState<ThemeOption>({
    key: "vs-dark",
    value: "vs-dark",
    label: "vs-dark",
  });

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
    setProcessing(true);

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
        setProcessing(false);
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

      setProcessing(false);
      if (statusId === 3) {
        showSuccessToast(`Compiled Successfully!`);
      } else {
        showErrorToast();
      }
      setOutputDetails(dataOutput);
    } catch (err) {
      setProcessing(false);
      showErrorToast("error in request");
      console.log("err", err);
    }
  };
  function handleThemeChange(theme: ThemeOption) {
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
      return;
    }

    defineTheme(theme).then(() => { });
  }
  // fav luxury, dracula
  return (
    <div data-theme="dracula" className="h-screen flex flex-col overflow-auto">
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
      {/* <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> */}
      <div className="navbar text-xl normal-case gap-2 bg-base-200">
        <div className="grow">Code runner ⚡</div>
        <LanguagesDropdown onSelectChange={setLanguage} />
        <ThemeDropdown handleThemeChange={handleThemeChange} />
      </div>
      <div id="editorSection" className="flex h-full px-4 py-2">
        <ProblemDescription>
          <div className="text-lg">Problem:</div>
          Binary Search: Search a sorted array for a target value.
        </ProblemDescription>
        <div className="w-full h-full">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language.value}
            theme={theme.key}
          />
        </div>
      </div>
      <div id="outputSection" className="">
        <div className="flex justify-center gap-9">
          {/* <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            /> */}
          <div className="btn btn-secondary">Console</div>
          <button
            onClick={handleCompile}
            // disabled={!code}
            className={`btn btn-primary ${!code ? "opacity-50" : ""}`}
          >
            {processing ? "Processing..." : "Submit"}
          </button>
        </div>
        {outputDetails ? <OutputDetails outputDetails={outputDetails} /> : null}
      </div>
      <Footer />
    </div>
  );
};
export default Landing;
