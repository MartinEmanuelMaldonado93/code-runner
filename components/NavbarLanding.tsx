import { ThemeCodeSelect, ThemePage } from '@components';
import { Variants, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import multiavatar from '@multiavatar/multiavatar';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollDirection } from '@hooks';

function NavbarLanding() {
	const userLogin = true;
	let avatarData = 'random user name';
	let svgCode = multiavatar(avatarData);

	const [isOpen, setIsOpen] = useState(false);
	const [scrolledToTop, setScrolledToTop] = useState(true);

	const direction = 'up'; //useScrollDirection({ initialDirection: 'up'});

	const handleScroll = () => {
		const { scrollY, pageYOffset } = window;
		console.log('scrolling', scrollY, pageYOffset);
		// setScrolledToTop(window.scrollY < 50);
	};

	useEffect(() => {
		console.log('efect');
		// const page = document.getElementById('home');
		const page = window.document;
		page &&
			page.addEventListener<'scroll'>('scroll', handleScroll);

		return () => {
			page && page.removeEventListener<'scroll'>('scroll', handleScroll);
		};
	}, []);

	const itemVariants: Variants = {
		open: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 300, damping: 24 },
		},
		closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
	};
	const container: Variants = {
		hidde: {
			opacity: 0,
			translateY: '-100%',
		},
		show: {
			opacity: 1,
			translateY: '0',
		},
	};
	return (
		<motion.div
			variants={container}
			initial='show'
			animate={'show'}
			className='nav-sticky w-full z-10 bg-neutral text-neutral-content'
		>
			<div className='flex flex-wrap justify-evenly bg-neutral max-w-7xl w-full'>
				<div className='flex-1 md:flex-grow-0 w-full text-center my-1'>
					<Link href='/' className='btn btn-ghost normal-case'>
						Code Runner
					</Link>
				</div>
				<div className='hidden sm:flex items-center'>
					<span className=' px-2 sm:block text-center'>Themes 🔥</span>
					<ThemeCodeSelect />
					<ThemePage />
				</div>
				<div className='flex-none bg-neutral text-neutral-content md:w-auto'>
					<ul className='menu menu-horizontal px-1 w-full flex items-center justify-center'>
						<li>
							<Link
								className='underline decoration-wavy'
								href='https://twitter.com'
								target='_blank'
								rel='noreferrer'
							>
								Tweet
							</Link>
						</li>
						<li>
							<Link
								className='hidden md:block'
								href='https://twitter.com'
								target='_blank'
								rel='noreferrer'
							>
								top 75
							</Link>
						</li>
						<li tabIndex={0} className='hidden md:block'>
							<a>
								News
								<svg
									className='fill-current'
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
								>
									<path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
								</svg>
							</a>
							<ul className='bg-base-100 text-neutral p-2'>
								<li>
									<a>News 1</a>
								</li>
								<li>
									<a>News 2</a>
								</li>
							</ul>
						</li>
						{!!userLogin && (
							<div className='menu menu-horizontal rounded-box'>
								<li tabIndex={0} className=''>
									<span
										className='w-16 rounded-full avatar'
										dangerouslySetInnerHTML={{ __html: svgCode }}
									></span>
									<ul className='bg-base-100 text-neutral  -translate-x-[50%] p-2 shadow rounded-box w-36'>
										<li>
											<a className='justify-between'>Profile</a>
										</li>
										<li>
											<a>Settings</a>
										</li>
										<li>
											<a>Logout</a>
										</li>
									</ul>
								</li>
							</div>
						)}
					</ul>
				</div>
				<motion.div
					className='py-2 sm:hidden'
					initial={false}
					animate={isOpen ? 'open' : 'closed'}
				>
					<motion.div
						className='flex justify-evenly text-center'
						whileTap={{ scale: 0.95 }}
						onClick={() => setIsOpen(!isOpen)}
					>
						<motion.div
							className='text-white'
							variants={{
								open: { rotate: 180 },
								closed: { rotate: 0 },
							}}
							transition={{ duration: 0.2 }}
							style={{ originX: '50%' }}
						>
							<svg fill='white' width='25' height='25' viewBox='0 0 20 20'>
								<path d='M0 7 L 20 7 L 10 16' />
							</svg>
						</motion.div>
					</motion.div>
					<motion.div
						layout
						className='sm:flex items-center'
						variants={{
							open: {
								clipPath: 'inset(0% 0% 0% 0% round 10px)',
								height: '8.5rem',
								transition: {
									type: 'spring',
									bounce: 0.4,
									// duration: 0.7,
									delayChildren: 0.3,
									staggerChildren: 0.05,
								},
							},
							closed: {
								clipPath: 'inset(10% 50% 90% 50% round 10px)',
								height: '0px',
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.3,
								},
							},
						}}
					>
						<span className='hidden px-2 sm:block text-center'>Themes 🔥</span>
						<motion.div variants={itemVariants}>
							<ThemeCodeSelect />
						</motion.div>
						<motion.div variants={itemVariants}>
							<ThemePage />
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</motion.div>
	);
}
export default NavbarLanding;
