import { ProblemDifficultyType, ProblemStatus } from "./problems";

export type GroupContestDetail = {
    contestId: string;
    contestAttendance: number;
    totalProblems: number;
    contest: GroupContest;
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

export type GroupContest = {
    id: string;
    name: string;
    link: string;
    div: number;
    startTime: string;
    endTime: string;
};


export type Contest = {
    id: string;
    name: string;
    link: string;
    div: number;
    startTime: string;
    endTime: string;
};

export type ContestProblem = {
    contestId: string;
    problem: ContestProblemsInfo;
    status: ContestStatus;
    numberOfMinutes: number;
    numberOfAttempts: number;  
}

export type ContestProblemsInfo = {
    id: number;
    title: string;
    difficulty: ProblemDifficultyType;
    status: ProblemStatus;
    time?: number;
    tried: number;
  };  

export enum ContestStatus {
    NOT_SOLVED = "NOT_SOLVED",
    SOLVED_AFTER_CONTEST = "SOLVED_AFTER_CONTEST",
    SOLVED_IN_CONTEST = "SOLVED_IN_CONTEST",
    UNABLE_TO_SOLVE = "UNABLE_TO_SOLVE"
}
  
