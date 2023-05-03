import { ThemeCodeSelect, ThemePage } from '@components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function NavbarLanding() {
	const [userName, setUserName] = useState('tincho');
	const userLogin = true;

	useEffect(() => {
		setUserName((userName) =>
			userName
				.split('')
				.sort((a, b) => (Math.random() > 0.5 ? -1 : 1))
				.join('')
		);
	}, []);

	return (
		<div className='min-h-[10rem] w-full'>
			<div className='navbar justify-center fixed sm:navbar-w z-10 bg-neutral text-neutral-content'>
				<div className='flex flex-wrap bg-neutral max-w-7xl w-full'>
					<div className='flex-1 w-full text-center'>
						<Link href='/' className='btn btn-ghost normal-case text-xl'>
							Code Runner {'</>'}
						</Link>
					</div>
					<div className='hidden sm:flex'>
						<span className='px-2 block text-center'>Themes 🔥</span>
						<ThemeCodeSelect />
						<ThemePage />
					</div>
					<div className='flex-none bg-neutral text-neutral-content w-full'>
						<ul className='menu menu-horizontal px-1 w-full flex items-center justify-center'>
							<li>
								<Link
									className='underline decoration-wavy'
									href='https://twitter.com'
									target='_blank'
									rel="noreferrer"
								>
									Tweet
								</Link>
							</li>
							<li>
								<Link
									className='hidden md:block'
									href='https://twitter.com'
									target='_blank'
									rel="noreferrer"
								>
									top 75
								</Link>
							</li>
							<li tabIndex={0}>
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
										<span className='w-16 rounded-full'>
											<img
												loading='lazy'
												alt='asd'
												src={`https://api.multiavatar.com/${userName}.svg`}
											/>
										</span>
										<ul className='bg-base-100 text-neutral  -translate-x-[50%] p-2 shadow rounded-box w-36'>
											<li>
												<a className='justify-between'>
													Profile
												</a>
											</li>
											<li>
												<a>
													Settings
												</a>
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
				</div>
			</div>
		</div>
	);
}
export default NavbarLanding;
