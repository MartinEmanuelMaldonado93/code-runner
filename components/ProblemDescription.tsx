import React, { FC } from "react";
import { ProblemData } from "types/ProblemData";
type props = {
  // children: React.ReactNode,
  problem: ProblemData,
};
// function ProblemDescription({children}:props) {
const ProblemDescription: FC<props> = ({ problem }) => {
  function difficultyBadge(problem: ProblemData) {
    switch (problem.difficulty) {
      case "easy":
        return "badge-success";
      case "medium":
        return "badge-warning";
      case "hard":
        return "badge-error";
    }
  }
  return (<>
    <div className="overflow-y-auto box-border h-fit max-h-[70vh] prose w-full  border rounded-md bg-base-300 p-3">
      <h2>{problem.title}<span className={`${difficultyBadge(problem)} rounded-full text-sm px-2 mx-2 font-normal`}>{problem.difficulty}</span>
      </h2>
      <p>{problem.description}</p>
      <div id="examples" className="rounded-sm">
        {problem.examples.map((ex, index) =>
        (
          <div key={Math.random()} className=" bg-base-100 p-2">
            <div>Example {index + 1}</div>
            <code>Input: {ex.input}</code>
            <code>Output: {String(ex.output)}</code>
          </div>)
        )}
      </div>
      <div>
        <h4>Constrains</h4>
        <ul>
          {problem.constrains.map((constrain) => (
            <li key={Math.random()}>{constrain}</li>
          ))}
        </ul>
      </div>
    </div>
  </>)
};

export default ProblemDescription;
