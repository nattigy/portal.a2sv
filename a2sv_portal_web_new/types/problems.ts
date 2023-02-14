export type ProblemType = {
  id: string;
  title: string;
  link: string;
  difficulty: ProblemDifficultyType;
  status: QuestionStatus;
  platform: string;
  tags: [
    {
      name: string;
      id: string;
    }
  ];
  updatedAt: string;
  createdAt: string;
};
export type UserProblem = {
  problem: ProblemType;
  status: QuestionStatus;
  numberOfAttempts: number;
  numberOfMinutes: number;
  solutionLink: string;
};

export enum ProblemStatus {
  SOLVED = "Solved",
  NOT_SOLVED = "Not Solved",
  UNABLE_TO_SOLVE = "Unable to Solve",
}
export enum QuestionStatus {
  SOLVED = "SOLVED",
  NOT_SOLVED = "NOT_SOLVED",
  UNABLE_TO_SOLVE = "UNABLE_TO_SOLVE",
}

export enum ProblemDifficultyType {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
