import Image from "next/image";

function GeneralOverView() {
	return (
		<div className="mx-8">
		<article className="prose w-full max-w-3xl flex flex-col items-center mt-6">
			<h1>The Perfect Practice Environment</h1>
			<p className='max-w-2xl'>
				Using a web platform that runs code can be a valuable tool when
				preparing for software engineering interviews. <br/> These platforms allow you
				to practice coding challenges and problems in an environment that
				simulates the actual coding experience, with real-time feedback on your
				code`&apos;`s correctness and efficiency.
			</p>
		</article>
		<div className="p-6 perspective">
			<Image className="transition-all duration-300 rotate-x hover:rotate-x-initial  shadow-md shadow-primary" alt="editor_example" height={600} width={600} src={"/leetcode.png"}/>
		</div>
		</div>
	);
}
export default GeneralOverView;
