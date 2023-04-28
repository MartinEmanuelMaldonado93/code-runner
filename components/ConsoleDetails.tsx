import { type DataOutput } from "@types";
import { safeDeEncodeFrom64 } from "@utils";

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
    // id > 3 has an error
    if (outputData.status_id > 3) {
      return (
        safeDeEncodeFrom64(outputData.message!) +
        "\n" +
        safeDeEncodeFrom64(outputData.stderr!)
      );
    }

    return safeDeEncodeFrom64(outputData.stdout || "");
  };

  type errorStatusId = typeof outputData.status_id;
  /** @returns Tailwind classes based on the error type */
  const classError = (error: errorStatusId) => {
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
