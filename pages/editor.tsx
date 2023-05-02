import {
	ProblemDescription,
	CodeEditorWindow,
	ConsoleDetails,
	OutputDetails,
} from '@components';
import { problems } from '@constants';
import { DataOutput } from '@types';
import { useState } from 'react';

function EditorComponent() {
	const [outputData, setOutputData] = useState<DataOutput>();
	const [isProcessing, setIsProcessing] = useState<boolean>();
	const [modalChecked, setModalChecked] = useState<boolean>();

	const handleSubmit = async () => {
		setIsProcessing(true);
		// try {
		// 	const response = await postCode({
		// 		'nmkkk',
		// 		languageID: stateLang.language.id,
		// 	});
		// 	const data = response.data;
		// 	console.log(data);
		// 	checkStatus(data.token);
		// } catch (error: any) {
		// 	console.error(error.response.data);
		// } finally {
		// 	setIsProcessing(false);
		// }
	};

	return (
		<>
			<div
				id='editorSection'
				className='flex flex-wrap md:flex-nowrap py-2 px-6 sm:px-0'
			>
				<ProblemDescription problem={problems[0]} />
				<div className='w-full'>
					<CodeEditorWindow />
				</div>
			</div>
			<div id='outputSection'>
				<div className='flex justify-end gap-9 my-2'>
					<input type='checkbox' id='my-modal-4' className='modal-toggle' />
					<label htmlFor='my-modal-4' className='modal cursor-pointer'>
						<label className='modal-box relative' htmlFor=''>
							<ConsoleDetails outputData={outputData} />
						</label>
					</label>
					<label className='btn btn-active' htmlFor='my-modal-4'>
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
		</>
	);
}
export default EditorComponent;
