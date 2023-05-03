import { cardContent, cardContentList } from '@constants';
import { Transition, motion } from 'framer-motion';
import { uuid } from '@utils';
import { RefObject, useRef } from 'react';

function SolutionsSection() {
	return (
		<div className='mx-8 w-full px-24 py-10 bg-base-content'>
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
				className='flex gap-8 justify-center px-8 py-20 text-base-200'
				variants={{
					hidden: { opacity: 0 },
					show: {
						opacity: 1,
						transition: {
							delayChildren: 0.9,
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
		stiffness: 90,
	};
	const item = {
		show: { opacity: 1, translateX: 0 },
		hidden: { opacity: 0, translateX: '-50%' },
	};
	return (
		<motion.div
			className='bg-base-100 text-info-content border rounded-md p-4 max-w-[250px] aspect-video 
			scale-90 transition-shadow duration-300 hover:shadow-primary hover:shadow-lg '
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
