import { match } from "ts-pattern";
import { DataOutput } from "types/dataOutput";
import { safeEncodeTo64 } from "utils";

// match
const OutputResults = (outputDetails: DataOutput) => {

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;
    const outputStdout = safeEncodeTo64(outputDetails.stdout);
    // const outputCompile = safeEncodeTo64(outputDetails?.compile_output);
    const outputError = safeEncodeTo64(outputDetails?.stderr);

    // compilation error
    if (statusId === 6) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {}
        </pre>
      );
    }
    // accepted
    else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {outputStdout}
        </pre>
      );
    }
    // Time Limit Exceeded
    else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputError}
        </pre>
      );
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputResults;
