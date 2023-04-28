export type ProblemData = {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  examples: Examples[];
  constraints: string[];
};
/**
 * @field `output` is the expected result
 */
type Examples = {
  input: string;
  output: unknown;
};
