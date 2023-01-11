import React, { FC } from "react";
type props = {
	children: React.ReactNode;
};
// function ProblemDescription({children}:props) {
const ProblemDescription: FC<props> = ({ children }) => {
	return (
		<div className='w-full h-full  mockup-window border bg-base-300 p-2'>
			{children}
		</div>
	);
};

export default ProblemDescription;
