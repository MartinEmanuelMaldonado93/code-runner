import { Features } from '@constants';
import { uuid } from '@utils';
import { Variant, Variants, motion } from 'framer-motion';

function ListFeatures() {
	const childVariant = {
		hidde: { translateX: '-60%', opacity: 0 },
		show: {
			translateX: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 9,
			},
		},
	};
	return (
		<div className='mx-8 mt-9 w-full px-24 py-10 bg-base-300'>
			<article className='prose max-w-3xl flex flex-col mt-6'>
				<h2 className='text-info-content text-4xl'>
					Interactive Code Editor To Solve Problems In Real
					Time
				</h2>
				<p className='max-w-xl info-content'>
					Introducing the all-new interactive code editor
					window like in VSCode! With this cutting-edge
					concept, coding feels just like you&apos;re
					working on your trusty desktop machine. And
					that&apos;s not all - the editor comes packed with
					a host of powerful benefits, including:
				</p>

				{Features.map((item) => (
					<motion.div
						variants={childVariant}
						initial='hidde'
						whileInView='show'
						key={uuid()}
						className='flex gap-2 mt-4'
					>
						<div className='form-control inline cursor-none'>
							<label className='label cursor-pointer inline'>
								<input
									type='checkbox'
									checked
									className='checkbox checkbox-primary pointer-events-none'
									readOnly
								/>
							</label>
						</div>
						<div className='badge badge-primary'>
							Frontend
						</div>
						<span className='mx-4 text-base-content font-bold'>
							{item}
						</span>
					</motion.div>
				))}
			</article>
		</div>
	);
}
export default ListFeatures;
