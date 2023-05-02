import { Features } from '@constants';
import { uuid } from '@utils';

function ListFeatures() {
	return (
		<div className='mx-8 mt-4 w-full px-24 bg-base-300'>
			<article className='prose max-w-3xl flex flex-col mt-6'>
				<h2 className='text-info-content text-4xl'>
					Interactive Code Editor To Solve Problems In Real
					Time
				</h2>
				<p className='max-w-xl info-content'>
					Introducing the all-new interactive code editor
					window like in VSCode! With this cutting-edge
					concept, coding feels just like you're working on
					your trusty desktop machine. And that's not all -
					the editor comes packed with a host of powerful
					benefits, including:
				</p>
				{Features.map((item) => (
					<div key={uuid()} className='flex gap-2 mt-4'>
						<div className='form-control inline'>
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
						<span className='mx-4'>{item}</span>
					</div>
				))}
			</article>
		</div>
	);
}
export default ListFeatures;
