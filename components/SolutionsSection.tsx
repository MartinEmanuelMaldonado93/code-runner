import { cardContent, cardContentList } from '@constants';
import { uuid } from '@utils';

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
						title={item.title}
						paragraph={item.paragraph}
						key={uuid()}
					/>
				))}
			</div>
		</div>
	);
}
export default SolutionsSection;

function LittleCard(content: cardContent) {
	return (
		<div className='bg-base-100 text-info-content border rounded-md p-4 max-w-sm transition-all duration-500 
		  hover:scale-110'>
			<h4 className='text-xl'>{content.title}</h4>
			<p className='overflow-hidden text-ellipsis'>{content.paragraph}</p>
		</div>
	);
}
