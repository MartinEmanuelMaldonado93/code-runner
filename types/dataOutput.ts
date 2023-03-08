import { Status } from "./Status";

export type dataOutput = {
  source_code: String64;
  language_id: number;
  stdin: String64;
  expected_output: string | null;
  stdout: string | null;
  status_id:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;
  created_at: string;
  finished_at: unknown;
  time: string;
  memory: number;
  stderr: String64 | undefined;
  token: string;
  number_of_runs: number;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: number;
  stack_limit: number;
  max_processes_and_or_threads: number;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: number;
  compile_output: string | undefined;
  exit_code: number;
  exit_signal: any;
  message: String64 | undefined;
  wall_time: string;
  compiler_options: unknown | null;
  command_line_arguments: unknown | null;
  redirect_stderr_to_stdout: boolean;
  callback_url: unknown | null;
  additional_files: string | null;
  enable_network: boolean;
  status: Status;
  language: Language;
};

export type Submission = {
  language_id: number;
  stdout: string;
  status_id: 3;
  stderr: String64 | null;
  token: string;
};
export interface Language {
  id: number;
  name: string;
}

export type String64 = string;
