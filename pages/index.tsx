import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
	
} from '@components';
import { LanguageData, ThemeOption, DataOutput } from '@types';
import {
	problems,
	languageOptions,
	defaultJavascriptCode,
	defaultWhiteTheme,
	defaultDarkTheme,
} from '@constants';
import { useLocalStorage } from '@hooks';
import { defineTheme, safeEncodeTo64 } from '@utils';
import { getStatus, postCode } from '@api';
import { useStoreLanguage, useStoreThemeCode, useStoreThemePage } from '@store';
import NavbarSelect from 'components/NavbarRunner';

const Home = () => {
	const [themePageStorage, setThemeFromStorage] = useLocalStorage(
		'themePage',
		defaultDarkTheme
	);
	const [code, setCode] = useState<string>(defaultJavascriptCode);
	const stateLang = useStoreLanguage();
	const stateThemePage = useStoreThemePage();
	const stateThemeCode = useStoreThemeCode();

	const [themeEditor, setThemeEditor] =
		useState<ThemeOption>(defaultWhiteTheme);

	const [outputData, setOutputData] = useState<DataOutput>();
	const [isProcessing, setIsProcessing] = useState<boolean>();
	const [modalChecked, setModalChecked] = useState<boolean>();

	useEffect(
		() => {
			/** setThemePage to avoid hydration errors*/
			// setThemePage(themePageStorage);
			stateThemePage.setTheme(themePageStorage);
			window.innerWidth > 600
				? setModalChecked(false)
				: setModalChecked(true);
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
			const response = await postCode({
				code,
				languageID: stateLang.language.id,
			});
			const data = response.data;
			console.log(data);
			checkStatus(data.token);
		} catch (error: any) {
			console.error(error.response.data);
		} finally {
			setIsProcessing(false);
		}
	};

	const checkStatus = async (token: string) => {
		try {
			const response = await getStatus(token);
			const compilationResult: DataOutput = response.data;
			const statusId = compilationResult.status.id;

			if ([1, 2].includes(statusId)) {
				setTimeout(() => {
					checkStatus(token);
				}, 1000);
				return;
			}

			setIsProcessing(false);

			statusId === 3
				? showSuccessToast('Compiled Successfully!')
				: showErrorToast();

			setOutputData(compilationResult);
		} catch (err) {
			setIsProcessing(false);
			showErrorToast('Error in request');
			console.log('err', err);
		}
	};

	const handleThemePage = (themePage: ThemeOption) => {
		// setThemePage(themePage);
		setThemeFromStorage(themePage); // the last theme selected
	};

	return (
		<div
			data-theme={stateThemePage.theme.label ?? 'light'}
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
			<NavbarSelect />
			<div
				id='editorSection'
				className='flex flex-wrap md:flex-nowrap py-2 px-6 sm:px-0'
			>
				<ProblemDescription problem={problems[0]} />
				<div className='w-full'>
					<CodeEditorWindow
						code={code}
						onChange={(value) => setCode(value ?? '')}
						language={stateLang.language.value}
						theme={stateThemeCode.themeCode.key}
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
						{isProcessing ? 'Processing...' : 'Submit'}
					</button>
				</div>
				{outputData ? <OutputDetails outputDetails={outputData} /> : null}
			</div>
			<Footer />
		</div>
	);
};
export default Home;

function Wrapper({ children }: { children: JSX.Element[] | JSX.Element }) {
	return <div>{children}</div>;
}
 