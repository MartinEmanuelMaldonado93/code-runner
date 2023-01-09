import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import Footer from "./Footer";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
import ThemeDropdown from "@components/ThemeDropDown";
import LanguagesDropdown from "@components/LanguageDropDown";
import CodeEditorWindow from "@components/CodeEditorWindow";
import { languageOptions } from "constants/languageOptions";
import { LanguageData } from "types/LanguageDropDown";
import { OnChange } from "@monaco-editor/react";
import { ThemeOption } from "types/ThemeOption";
import { defineTheme } from "@components/DefineTheme";
import axios from "axios";

const javascriptDefault = `// some comment`;

const Landing = () => {
  const [code, setCode] = useState<string>(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<boolean>();
  const [theme, setTheme] = useState<ThemeOption>({ key: "", value: "", label: "" });
  const [language, setLanguage] = useState<LanguageData>(languageOptions[0]);

  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enterPress", enterPress);
  //     console.log("ctrlPress", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  const onChange: OnChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: Buffer.from(code, 'base64'),
      stdin: Buffer.from(customInput, 'base64')
    }
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
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
     
  };

  function handleThemeChange(theme: ThemeOption) {
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
      return;
    }

    defineTheme(theme).then((_) => {
      console.log("ready")
    });
  }
  // useEffect(() => {
  //   defineTheme("oceanic-next").then((_) =>
  //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
  //   );
  // }, []);

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg: string) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
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
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={setLanguage} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          {/* <CodeEditorWindow
            code={code}
            onChange={
              onChange
            }
            language={language?.value}
            theme={theme}
          /> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Landing;