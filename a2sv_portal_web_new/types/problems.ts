export type ProblemType = {
  id: string;
  title: string;
  link: string;
  difficulty: ProblemDifficultyType;
  status: ProblemStatus;
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
