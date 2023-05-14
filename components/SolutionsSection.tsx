import { cardContent, cardContentList } from '@constants';
import { Transition, motion } from 'framer-motion';
import { uuid } from '@utils';
import { RefObject, useRef } from 'react';

function SolutionsSection() {
	return (
		<div className='w-full mx-8 py-10 px-4 md:px-24 bg-base-content'>
			<article className='prose max-w-3xl flex flex-col mt-6'>
				<h2 className='text-base-100 text-4xl'>
					There exist multiple solutions and a variety of
					approaches
				</h2>
				<p className='max-w-xl text-base-300'>
					To grasp the fundamental concept, it can be
					beneficial to explore various solutions for a
					given question. Experiment with diverse approaches
					and then compare your solution to the provided
					ones.
				</p>
			</article>
			<motion.div
				className='flex flex-wrap md:flex-nowrap gap-8 justify-center px-8 py-20 text-secondary'
				variants={{
					hidden: { opacity: 0 },
					show: {
						opacity: 1,
						transition: {
							delayChildren: 0.3,
							staggerChildren: 0.28,
						},
					},
				}}
				initial={'hidden'}
				whileInView={'show'}
			>
				{cardContentList.map((item) => (
					<LittleCard
						key={uuid()}
						title={item.title}
						paragraph={item.paragraph}
					/>
				))}
			</motion.div>
		</div>
	);
}
export default SolutionsSection;

function LittleCard(content: cardContent) {
	const springConfig: Transition = {
		type: 'spring',
		stiffness: 50,
	};
	const item = {
		hidden: { opacity: 0, translateY: '50%' },
		show: { opacity: 1, translateY: 0 },
	};
	return (
		<motion.div
			className='bg-base-100 border rounded-md text-secondary-content p-4 max-w-[250px] aspect-video 
			scale-90 transition-shadow duration-300 hover:shadow-primary hover:shadow-lg'
			transition={springConfig}
			variants={item}
		>
			<h4 className='text-xl'>{content.title}</h4>
			<p className='overflow-hidden text-ellipsis'>
				{content.paragraph}
			</p>
		</motion.div>
	);
}
