import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Footer,
	GeneralOverView,
	NavbarLanding,
	Hero,
	ListFeatures,
} from '@components';
import { DataOutput } from '@types';
import { getStatus } from '@api';
import { useStoreLanguage, useStoreThemeCode, useStoreThemePage } from '@store';

const Home = () => {

	return (
		<div className='h-screen max-h-screen flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden'>
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
			<NavbarLanding />
			<Hero />
			<GeneralOverView />
			<ListFeatures />
			<Footer />
		</div>
	);
};
export default Home;
