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
    constraints: ["1 <= nums.length <= 105", "-109 <= nums[i] <= 109"],
  },
  {
    "title": "345. Reverse Vowels of a String",
    "description": "Given a string s, reverse only all the vowels in the string and return it.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "s = 'hello'",
        "output": "'holle'"
      },
      {
        "input": "s = 'leetcode'",
        "output": "'leotcede'"
      },
      {
        "input": "s = 'aA'",
        "output": "'Aa'"
      }
    ],
    "constraints": ["1 <= s.length <= 105", "s consists of printable ASCII characters."]
  },
  {
    "title": "128. Longest Consecutive Sequence",
    "description": "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.",
    "difficulty": "hard",
    "examples": [
      {
        "input": "nums = [100,4,200,1,3,2]",
        "output": "4"
      },
      {
        "input": "nums = [0,3,7,2,5,8,4,6,0,1]",
        "output": "9"
      }
    ],
    "constraints": ["0 <= nums.length <= 105", "-109 <= nums[i] <= 109"]
  },
  {
    "title": "238. Product of Array Except Self",
    "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    "difficulty": "medium",
    "examples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]"
      },
      {
        "input": "nums = [-1,1,0,-3,3]",
        "output": "[0,0,9,0,0]"
      }
    ],
    "constraints": ["2 <= nums.length <= 105", "-109 <= nums[i] <= 109"]
  },
  {
    "title": "169. Majority Element",
    "description": "Given an array nums of size n, return the majority element.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "nums = [3,2,3]",
        "output": "3"
      },
      {
        "input": "nums = [2,2,1,1,1,2,2]",
        "output": "2"
      }
    ],
    "constraints": ["1 <= nums.length <= 105", "-109 <= nums[i] <= 109"]
  },
  {
    "title": "283. Move Zeroes",
    "description": "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]"
      },
      {
        "input": "nums = [0]",
        "output": "[0]"
      }
    ],
    "constraints": ["1 <= nums.length <= 104", "-231 <= nums[i] <= 231 - 1"]
  },
  {
    "title": "LeetCode 190. Reverse Bits",
    "description": "Reverse bits of a given 32 bits unsigned integer.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "00000010100101000001111010011100",
        "output": "00111001011110000010100101000000"
      },
      {
        "input": "11111111111111111111111111111101",
        "output": "10111111111111111111111111111111"
      }
    ],
    "constraints": ["The input must be a binary string of length 32"]
  },
  {
    "title": "LeetCode 118. Pascal's Triangle",
    "description": "Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "numRows = 5",
        "output": [
          [1],
          [1, 1],
          [1, 2, 1],
          [1, 3, 3, 1],
          [1, 4, 6, 4, 1]
        ]
      },
      {
        "input": "numRows = 1",
        "output": [
          [1]
        ]
      }
    ],
    "constraints": ["0 <= numRows <= 30"]
  },
  {
    "title": "LeetCode 561. Array Partition I",
    "description": "Given an integer array nums of 2n integers, group these integers into n pairs (a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) for all i is maximized. Return the maximized sum.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "nums = [1,4,3,2]",
        "output": 4
      },
      {
        "input": "nums = [6,2,6,5,1,2]",
        "output": 9
      }
    ],
    "constraints": ["1 <= n <= 104", "-104 <= nums[i] <= 104"]
  },
  {
    "title": "LeetCode 167. Two Sum II - Input array is sorted",
    "description": "Given an array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "numbers = [2,7,11,15], target = 9",
        "output": [1, 2]
      },
      {
        "input": "numbers = [2,3,4], target = 6",
        "output": [1, 3]
      }
    ],
    "constraints": ["2 <= numbers.length <= 3 * 104", "-1000 <= numbers[i] <= 1000", "numbers is sorted in non-decreasing order", "-1000 <= target <= 1000"]
  },
  {
    "title": "155. Min Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n\n- `MinStack()` initializes the stack object.\n- `void push(val)` pushes the element val onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\n**Constraints:**\n\n- `-2^31 <= val <= 2^31 - 1`\n- Methods `pop`, `top`, and `getMin` operations will always be called on **non-empty** stacks.\n- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.",
    "difficulty": "easy",
    "examples": [
      {
        "input": "['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin']\n[[], [-2], [0], [-3], [], [], [], []]",
        "output": "[null, null, null, null, -3, null, 0, -2]"
      },
      {
        "input": "['MinStack', 'push', 'getMin', 'push', 'getMin', 'push', 'getMin', 'pop', 'getMin']\n[[], [0], [], [1], [], [2], [], [], []]",
        "output": "[null, null, 0, null, 0, null, 0, null, 1]"
      }
    ],
    "constraints": [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin operations will always be called on non-empty stacks.",
      "At most 3 * 10^4 calls will be made to push, pop, top and getMin."
    ]
  }
];
