import { PlatformInfo } from "../components/problems/ProblemsTable";

export type ProblemsInfo = {
    id: number;
    name: string;
    difficulty: ProblemDifficultyType;
    status: ProblemStatus;
    platform: PlatformInfo;
  };
  
  export enum ProblemStatus {
    SOLVED = "Solved",
    NOT_SOLVED = "Not Solved",
    UNABLE_TO_SOLVE = "Unable to Solve",
  }
  
  export enum ProblemDifficultyType {
    EASY = "Easy",
    MEDIUM = "Medium",
    HARD = "Hard",
  }
  