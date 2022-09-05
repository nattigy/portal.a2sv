import { PlatformInfo } from "../components/problems/ProblemsTable";

export type ProblemsInfo = {
  id: number;
  title: string;
  link: string;
  difficulty: ProblemDifficultyType;
  status: ProblemStatus;
  platform: string;
  tags: [];
  createdAt: string;
};

export enum ProblemStatus {
  SOLVED = "Solved",
  NOT_SOLVED = "Not Solved",
  UNABLE_TO_SOLVE = "Unable to Solve",
}

export enum ProblemDifficultyType {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
