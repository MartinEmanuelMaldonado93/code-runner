import { cardContent, cardContentList } from '@constants';
import { uuid } from '@utils';
import { Transition, Variant, VariantLabels, Variants, motion } from 'framer-motion';

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
			<div className='mt-8 text-base-200 flex gap-4 justify-center perspective p-8'>
				{cardContentList.map((item) => (
					<LittleCard
						key={uuid()}
						title={item.title}
						paragraph={item.paragraph}
					/>
				))}
			</div>
		</div>
	);
}
export default SolutionsSection;

function LittleCard(content: cardContent) {
	const springConfig : Transition = {
		type: 'spring',
		stiffness: 200,
		damping: 9,
	};

	return (
		<motion.div
			className='bg-base-100 text-info-content border rounded-md p-4 max-w-sm scale-90'
			transition={springConfig}
			whileHover={{ scale: 1.1 }}
		>
			<h4 className='text-xl'>{content.title}</h4>
			<p className='overflow-hidden text-ellipsis'>
				{content.paragraph}
			</p>
		</motion.div>
	);
}
