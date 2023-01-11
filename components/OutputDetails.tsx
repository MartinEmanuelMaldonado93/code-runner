import { DataOutput } from "types/dataOutput";
type props = {
	outputDetails?: DataOutput;
};
const OutputDetails = ({ outputDetails }: props) => {

	return (
		<div className='grid stats shadow'>
			<span className='stat place-items-center'>
				<div className='stat-title'>Memory:</div>
				<span className='stat-value'>{outputDetails?.memory}</span>
			</span>
			<span className='stat place-items-center'>
				<div className='stat-title'>Status:</div>
				<span className='stat-value text-success'>
					{outputDetails?.status.description}
				</span>
			</span>
			<span className='stat place-items-center'>
				<div className='stat-title'>Time :</div>
				<span className='stat-value '>{outputDetails?.time}</span>
			</span>
		</div>
	);
};

export default OutputDetails;
