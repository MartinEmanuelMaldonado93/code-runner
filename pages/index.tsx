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
import axios, { AxiosResponse } from "axios";
import { javascriptCodeDefault } from "constants/javascriptCodeDefault";
import OutputResults from "@components/OutputResults";
import CustomInput from "@components/CustomInput";
import { Status } from "types/Status";
import ProblemDescription from "@components/ProblemDescription";
import Footer from "@components/Footer";

const Landing = () => {
  const [code, setCode] = useState<string>(javascriptCodeDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState<boolean>();
  const [theme, setTheme] = useState<ThemeOption>({
    key: "vs-dark",
    value: "vs-dark",
    label: "vs-dark",
  });
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

  const onChange: OnChange = (codeStr, event) => {
    console.log("onchange from index");
    console.log(codeStr, event);
    // switch (action) {
    //   case "code": {
    //     console.log(data);
    //     // setCode(data);
    //     break;
    //   }
    //   default: {
    //     console.warn("case not handled!", action, data);
    //   }
    // }
  };
  /** Send code to an API method POST */
  const handleCompile = () => {
    setProcessing(true);

    const options = {
      method: "POST",
      // url: process.env.REACT_APP_RAPID_API_URL,
      // params: { base64_encoded: "true", fields: "*" },
      "Access-Control-Allow-Origin": "https://localhost:3000",
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d",
      },
      body: `{
        "language_id": ${language.id},
        "source_code": ${String(Buffer.from(code, "base64"))} ,
        "stdin": ${String(Buffer.from(customInput, "base64"))}
      }`,
    };
    const url =
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*";
    fetch(url, options)
      .then((response) => {
        console.log(response)

      })
      // .then(response => console.log(response))
      .catch((err) => console.error(err));
    // axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log("res.data", response.data);
    //     console.log("url ", process.env.REACT_APP_RAPID_API_URL);
    //     // const token = response.data.token;
    //     // checkStatus(token);
    //   })
    //   .catch((err) => {
    //     let error = err.response ? err.response.data : err;
    //     setProcessing(false);
    //     console.log(err);
    //   });
  };

  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      const statusReceived = response.data.status as Status;
      const statusId = statusReceived.id;
      // let statusId = response.data.status?.id as number;

      // Processed - we have a result
      if ([1, 2].includes(statusId)) {
        // still processing
        setTimeout(() => {
          // checkStatus(token);
        }, 2000);
        return;
      }

      // setProcessing(false);
      // setOutputDetails(response.data);
      showSuccessToast(`Compiled Successfully!`);
      // console.log('response.data', response.data);
      return;
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast("err");
    }
  };
  // callback function
  function handleThemeChange(theme: ThemeOption) {
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
      return;
    }

    // console.log("theme from ThemeDropDown ", theme);
    defineTheme(theme).then(() => {
      // console.log("defined  Theme")
    });
  }

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
  // luxury, dracula
  return (
		<div data-theme='dracula' className='h-screen flex flex-col'>
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
			{/* <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> */}
			<div className='navbar text-xl normal-case gap-2 bg-base-200'>
				<div className='grow'>Code runner ⚡</div>
				<LanguagesDropdown onSelectChange={setLanguage} />
				<ThemeDropdown handleThemeChange={handleThemeChange} />
			</div>
			<div id='editorSection' className='grow flex px-4 py-2'>
				<div id='description '>
					<ProblemDescription>
						\/** * Problem: Binary Search: Search a sorted array for
						a target value. */
					</ProblemDescription>
					<div className='rating'>
						<input
							type='radio'
							name='rating-1'
							className='mask mask-star'
						/>
						<input
							type='radio'
							name='rating-1'
							className='mask mask-star'
							checked
						/>
						<input
							type='radio'
							name='rating-1'
							className='mask mask-star'
						/>
						<input
							type='radio'
							name='rating-1'
							className='mask mask-star'
						/>
						<input
							type='radio'
							name='rating-1'
							className='mask mask-star'
						/>
					</div>
				</div>
				<CodeEditorWindow
					code={code}
					onChange={onChange}
					language={language.value}
					theme={theme.key}
				/>
			</div>
			<div id='outputSection' className=''>
				{/* <OutputResults outputDetails={outputDetails} /> */}
				<div className='flex flex-col items-end'>
					{/* <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            /> */}
          <div>
            {}
          </div>
					<button
						onClick={handleCompile}
						// disabled={!code}
						className={`btn btn-primary
                ${!code ? "opacity-50" : ""}`}
					>
						{processing ? "Processing..." : "Compile and Execute"}
					</button>
        </div>
        
				{/* {outputDetails ?
          <OutputResults outputDetails={outputDetails} /> : null} */}
			</div>
			<Footer />
		</div>
  );
};
export default Landing;
