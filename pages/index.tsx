import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ThemeEditorDropdown,
  LanguagesDropdown,
  CodeEditorWindow,
  ThemePage,
  ProblemDescription,
  Footer,
  OutputDetails,
  ConsoleDetails,
} from "@components/index";
import { languageOptions } from "constants/languageOptions";
import { LanguageData } from "types/LanguageDropDown";
import { OnChange } from "@monaco-editor/react";
import { ThemeOption } from "types/ThemeOption";
import axios from "axios";
import { javascriptCodeDefault } from "constants/javascriptCodeDefault";
import { safeDeEncodeFrom64, safeEncodeTo64, defineTheme } from "utils";
import { DataOutput } from "types/DataOutput";
import { showSuccessToast } from "ui_components/showSucces";
import { showErrorToast } from "ui_components/showError";
import { problems } from "constants/problems";
import useLocalStorage from "hooks/useLocalStorage";

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
  const [themePageStorage, setThemeFromStorage] = useLocalStorage("themePage", {
    key: "0",
    value: "light",
    label: "light",
  } satisfies ThemeOption);
  const [themePage, setThemePage] = useState<ThemeOption>();
  const [modalChecked, setModalChecked] = useState<boolean>();

  useEffect(
    () => {
      setThemePage(themePageStorage);
      //check if is small device
      if (window.innerWidth > 600) {
        setModalChecked(false);
      } else {
        setModalChecked(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
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
      url:
        "https://" +
        process.env.NEXT_PUBLIC_APP_RAPID_API_HOST +
        "/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_APP_RAPID_API_HOST,
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
      url:
        "https://" +
        process.env.NEXT_PUBLIC_APP_RAPID_API_HOST +
        "/submissions/" +
        token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_APP_RAPID_API_KEY,
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

    defineTheme(theme); //.then(console.log);
  }
  function handleThemePage(themePage: ThemeOption) {
    setThemePage(themePage);
    setThemeFromStorage(themePage); // the last theme selected
  }

  return (
    <div
      data-theme={themePage ? themePage.label : "light"}
      className='h-screen max-h-screen flex flex-col justify-between overflow-y-auto'
    >
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* modals */}
      <input type='checkbox' id='my-modal-4' className='modal-toggle' />
      <label htmlFor='my-modal-4' className='modal cursor-pointer'>
        <label className='modal-box relative' htmlFor=''>
          <ConsoleDetails outputData={outputData} />
        </label>
      </label>
      <input
        type='checkbox'
        // checked={modalChecked}
        id='my-modal'
        className='modal-toggle'
      />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Limited functionality in small devices 😅
          </h3>
          <p className='py-4'>
            Feel free to run this on a laptop or your pc desktop,
            <span className='block'>Thanks for your patience 🙌!!</span>
          </p>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn'
              onClick={() => setModalChecked((p) => !p)}
            >
              Yay!
            </label>
          </div>
        </div>
      </div>
      {/* modals */}
      <div className='navbar flex-wrap justify-center min-h-max sm:h-full text-xl normal-case gap-2 bg-base-200 '>
        <div className='w-full sm:w-auto grow select-none font-bold'>
          {" "}
          {"{"} Code Runner ⚡ {"}"}
        </div>
        <div className='btn-group'>
          <button className='btn'>«</button>
          <button className='btn'>Page 1</button>
          <button className='btn'>»</button>
        </div>
        <LanguagesDropdown onSelectChange={setLanguage} language={language} />
        <ThemePage theme={themePage} handleThemePageChange={handleThemePage} />
        <ThemeEditorDropdown
          theme={themeEditor}
          handleThemeChange={handleThemeChange}
        />
      </div>
      <div
        id='editorSection'
        className='flex flex-wrap md:flex-nowrap px-4 py-2'
      >
        <ProblemDescription problem={problems[0]} />
        <div className='w-full'>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language.value}
            theme={themeEditor.key}
          />
        </div>
      </div>
      <div id='outputSection'>
        <div className='flex justify-end gap-9 my-2'>
          <label htmlFor='my-modal-4' className='btn btn-active'>
            CONSOLE
          </label>
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
