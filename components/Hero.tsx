import { CodeEditorWindow } from '@components';
import Image from 'next/image';

function Hero() {
	return (
		<div className='hero min-h-screen bg-base-200'>
			<div className='hero-content flex h-full '>
				{/* <Image
					alt='_asda'
					src='/images/stock/photo-1635805737707-575885ab0820.jpg'
					className='max-w-sm rounded-lg shadow-2xl'
				/> */}
				<div>
					<h1 className='text-5xl font-bold'>Getting into IT!</h1>
					<p className='py-6'>
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
					<button className='btn btn-primary'>Get Started</button>
				</div>
				<div className='border border-neutral w-full rounded-md new-pulse'>
					<div className='flex h-8  items-center space-x-2 bg-neutral px-2'>
						<div className='h-3 w-3 rounded-full bg-red-500'></div>
						<div className='h-3 w-3 rounded-full bg-green-300'></div>
						<div className='h-3 w-3 rounded-full bg-blue-500'></div>
					</div>
					<CodeEditorWindow className='overflow-y-hidden h-[400px] ' />
				</div>
			</div>
		</div>
	);
}
export default Hero;
