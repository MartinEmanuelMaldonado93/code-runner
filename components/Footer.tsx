import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
	return (
		<div className='flex justify-center w-full bg-neutral'>
			<footer className='footer items-center justify-items-center sm:items-start  p-4 max-w-7xl text-neutral-content'>
				<p>
					Martin Emanuel Maldonado © {new Date().getUTCFullYear()} - All right
					reserved
				</p>
				<div className='grid grid-flow-col gap-4'>
					<div>let&apos;s stay connected :</div>
					<a
						className='text-2xl duration-500 hover:scale-125 hover:text-white'
						href='https://twitter.com/LeLibert3'
						target={'_blank'}
						rel='noreferrer'
					>
						{/* twitter */}
						<BsTwitter />
					</a>
					<a
						className='text-2xl duration-500 hover:scale-125 hover:text-white'
						href='https://www.linkedin.com/in/martin-emanuel-maldonado93'
						target={'_blank'}
						rel='noreferrer'
					>
						{/* linkedin */}
						<BsLinkedin />
					</a>
					<a
						className='text-2xl duration-500 hover:scale-125 hover:text-white'
						href='https://github.com/MartinEmanuelMaldonado93'
						target={'_blank'}
						rel='noreferrer'
					>
						<BsGithub />
						{/* github */}
					</a>
				</div>
			</footer>
		</div>
	);
}

export { Footer };
