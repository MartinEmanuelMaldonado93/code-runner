import { DataOutput } from "@types";
import { safeDeEncodeFrom64 } from "utils";

type props = {
  outputData?: DataOutput;
};
function ConsoleDetails({ outputData }: props) {
  if (!outputData)
    return (
      <div className='mockup-code'>
        <pre>
          <code>Waiting for your code 🛠...</code>
        </pre>
      </div>
    );

  const output = () => {
    if (outputData.status_id > 3) {
      // some error
      return (
        safeDeEncodeFrom64(outputData.message!) +
        "\n" +
        safeDeEncodeFrom64(outputData.stderr!)
      );
    }
    return safeDeEncodeFrom64(outputData.stdout || "");
  };

  const classError = (error: typeof outputData.status_id) => {
    switch (error) {
      case 2:
        return "text-orange-500";
      case 3:
        return "text-green-500";
      default:
        return "text-red-500";
    }
  };

  return (
    <div className='mockup-code'>
      <pre data-prefix='>' className='p-4'>
        <code className={classError(outputData.status_id)}>{output()}</code>
      </pre>
    </div>
  );
}

export { ConsoleDetails };
