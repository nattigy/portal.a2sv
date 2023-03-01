import { ProblemDifficultyType, ProblemType } from "./problems";

export type GroupContestDetail = {
    contestAttendance: number;
    problemsStat: ProblemsStat[];
    group: any;
    totalProblems: number;
    contest: GroupContest;
}

export type GroupContest = {
    id: string;
    name: string;
    link: string;
    div: number;
    startTime: string;
    endTime: string;
    problems: ContestProblemsInfo[];
};

export type ProblemsStat = {
    numberOfStudents: number;
    problemId: String;
}

export type ContestDetail = {
    contestAttended: boolean;
    problemsSolved: number;
    wrongSubmissions: number;
    timeSpent: number;
    rank: number;
    totalProblems: number;
    contest: Contest;
    userContestProblems: ContestProblem[];
}  

export type Contest = {
    id: string;
    name: string;
    link: string;
    div: string;
    startTime: Date;
    endTime: Date;
    problems:ProblemType[];
};

export type ContestProblem = {
    contestId: string;
    problem: ContestProblemsInfo;
    status: ContestStatus;
    numberOfMinutes: number;
    numberOfAttempts: number;  
}

export type ContestProblemsInfo = {
    id: string;
    title: string;
    difficulty: ProblemDifficultyType;
    platform?: string;
    status: ContestStatus;
    time?: number;
    tried: number;
  };  

export enum ContestStatus {
    NOT_SOLVED = "NOT_SOLVED",
    SOLVED_AFTER_CONTEST = "SOLVED_AFTER_CONTEST",
    SOLVED_IN_CONTEST = "SOLVED_IN_CONTEST",
    UNABLE_TO_SOLVE = "UNABLE_TO_SOLVE"
}
  
