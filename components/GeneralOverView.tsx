import { useIntersectionObserver } from '@hooks';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

function GeneralOverView() {
	const ref = useRef<HTMLDivElement>(null);
	const entry = useIntersectionObserver(ref, {});
	const isVisible = entry?.isIntersecting;

	const variants: Variants = {
		hidde: { opacity: 0, scale: 0.5 },
		show: {
			opacity: 1,
			scale: 1,
			transition: { delay: 0.5, type: 'spring', stiffness: 60 },
		},
	};
	return (
		<div className='mx-8'>
			<article className='prose w-full max-w-3xl flex flex-col items-center mt-6'>
				<h1>The Perfect Practice Environment</h1>
				<p className='max-w-2xl'>
					Using a web platform that runs code can be a valuable tool when
					preparing for software engineering interviews. <br /> These platforms
					allow you to practice coding challenges and problems in an environment
					that simulates the actual coding experience, with real-time feedback
					on your code`&apos;`s correctness and efficiency.
				</p>
			</article>
			<motion.div
				variants={variants}
				initial={'hidde'}
				animate={isVisible && 'show'}
				ref={ref}
				className='p-6 perspective w-auto h-auto flex justify-center'
			>
				<Image
					className='transition-all duration-300 rotate-x hover:rotate-x-initial shadow-sm hover:shadow-lg hover:shadow-primary shadow-primary'
					alt='editor_example'
					height={500}
					width={500}
					src={'/leetcode.png'}
				/>
			</motion.div>
		</div>
	);
}
export default GeneralOverView;
