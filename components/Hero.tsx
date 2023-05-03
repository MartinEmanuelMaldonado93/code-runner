import { CodeEditorWindow } from '@components';

function Hero() {
	return (
		<div className='hero md:min-h-screen bg-base-200'>
			<div className='hero-content flex flex-wrap  h-full '>
				<div className='max-w-sm'>
					<h1 className='text-2xl md:text-5xl font-bold'>Getting into IT!</h1>
					<p className='py-6 max-w-[240px]'>
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<button className='btn btn-primary'>Get Started</button>
				</div>
				<div className=' md:mx-0 border border-neutral rounded-md bg-neutral new-pulse'>
					<div className='flex h-8  items-center bg-neutral px-2'>
						<div className='h-3 w-3 rounded-full bg-red-500'></div>
						<div className='h-3 w-3 rounded-full bg-green-300'></div>
						<div className='h-3 w-3 rounded-full bg-blue-500'></div>
					</div>
					<CodeEditorWindow className='overflow-y-hidden h-[200px] md:h-[400px] rounded-md' />
				</div>
			</div>
		</div>
	);
}
export default Hero;
