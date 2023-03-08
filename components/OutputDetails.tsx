import { DataOutput } from "types/DataOutput";
import { safeDeEncodeFrom64 } from "@utils";

type props = {
  outputDetails?: DataOutput;
};
const OutputDetails = ({ outputDetails }: props) => {
  if (outputDetails === undefined)
    return <div className='grid stats shadow'></div>;

  const isError = outputDetails.status.id > 3;
  console.log(outputDetails);
  return (
    <>
      {isError ? (
        <div
          tabIndex={0}
          className='collapse collapse-plus border border-base-300 bg-base-100 rounded-box'
        >
          <div className='collapse-title text-xl font-medium'>Console</div>
          <div className='collapse-content'>
            <p>
              {outputDetails.compile_output
                ? safeDeEncodeFrom64(outputDetails.compile_output)
                : null}
            </p>
          </div>
        </div>
      ) : null}
      <div className='grid stats shadow'>
        <span className='stat place-items-center'>
          <div className='stat-title'>Memory:</div>
          <span className='stat-value'>
            {isError ? " - - " : outputDetails.memory}kb
          </span>
        </span>
        <span className='stat place-items-center'>
          <div className='stat-title'>Status:</div>
          <span
            className={`stat-value ${isError ? "text-error" : "text-success"} `}
          >
            {outputDetails.status.description}
          </span>
        </span>
        <span className='stat place-items-center'>
          <div className='stat-title'>Time :</div>
          <span className='stat-value '>
            {isError ? "- - " : outputDetails.time}ms
          </span>
        </span>
      </div>
    </>
  );
};

export { OutputDetails };
