import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
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
  showErrorToast,
  showSuccessToast,
} from "@components";
import { LanguageData, ThemeOption, DataOutput } from "@types";
import { problems, languageOptions, javascriptCodeDefault } from "@constants";
import { useLocalStorage } from "@hooks";
import { defineTheme, safeEncodeTo64 } from "@utils";
import { getStatus, postCode } from "@api";
import axios from "axios";

const Home = () => {
  const [code, setCode] = useState<string>(javascriptCodeDefault);
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
      window.innerWidth > 600 ? setModalChecked(false) : setModalChecked(true);
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

  /** Send code to an API method POST */
  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const response = await postCode({ code, languageID: language.id });
      const data = response.data;
      console.log(data);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsProcessing(false);
    }
    //   const token = response.data.token;
    //   if (token) console.log(token);
    //   // checkStatus(token);
    // });
    // const token = response.data.token;
    // checkStatus(token);
  };

  const checkStatus = async (token: string) => {
    try {
      const response = await getStatus(token);
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

  const handleThemeChange = (theme: ThemeOption) => {
    //default themes
    if (["light", "vs-dark"].includes(theme.value)) {
      setThemeEditor(theme);
      return;
    }

    defineTheme(theme); //.then(console.log);
  };

  const handleThemePage = (themePage: ThemeOption) => {
    setThemePage(themePage);
    setThemeFromStorage(themePage); // the last theme selected
  };

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
      <input type='checkbox' id='my-modal' className='modal-toggle' />
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
      {/* main page */}
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
        className='flex flex-wrap md:flex-nowrap py-2 px-6 sm:px-0'
      >
        <ProblemDescription problem={problems[0]} />
        <div className='w-full'>
          <CodeEditorWindow
            code={code}
            onChange={(value) => setCode(value ?? "")}
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
            onClick={handleSubmit}
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
export default Home;
