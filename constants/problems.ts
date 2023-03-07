import { ProblemData } from "types/ProblemData";

export const problems: ProblemData[] = [
  {
    title: "217. Contains Duplicate",
    description:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    difficulty: "easy",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: true,
      },
      {
        input: "nums = [1,2,3,4]",
        output: false,
      },
      {
        input: "nums = [1,1,1,3,3,4,3,2,4,2]",
        output: true,
      },
    ],
    constrains: ["1 <= nums.length <= 105", "-109 <= nums[i] <= 109"],
  },
];
