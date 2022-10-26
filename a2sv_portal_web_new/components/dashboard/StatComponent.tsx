import React from "react";
import { ProblemDifficultyType } from "../../types/problems";
import AcceptanceRate, { AcceptanceInfo } from "./AcceptanceRate";
import Chart from "./Chart";
import { ProblemSolvedProps } from "./ConsistencyDiagram";
import ContestRating, { ContestInfo } from "./ContestRating";
import DashboardRankItem, { DashboardRankItemProps } from "./DashboardRankItem";
import RadialBar from "./RadialBar";
import TotalRadialBar from "./TotalRadialBar";

type Props = {
  groupData: any;
};

const problemStat: ProblemSolvedProps = {
  problems: 389,
  wrong: 459,
  minutes: 4554,
  easy: 239,
  medium: 104,
  hard: 46,
};

const rankList: DashboardRankItemProps[] = [
  {
    rankType: "Daily",
    totalStudents: 30,
    userRank: 2,
    activeColor: "#8A70D6",
    inactiveColor: "#E9E3FE99",
  },
  {
    rankType: "Weekly",
    totalStudents: 30,
    userRank: 1,
    activeColor: "#579BE4",
    inactiveColor: "#E4F2FF",
  },
  {
    rankType: "Monthly",
    totalStudents: 30,
    userRank: 3,
    activeColor: "#FCAB5E",
    inactiveColor: "#FFF0E1",
  },

];

const userList: Array<AcceptanceInfo> = [
  {
    id: 1,
    name: "Hanna Samuel",
    photo: "/images/group-students-profile.svg",
    acceptance: 95,
    currentRank: 1,
    previousRank: 3,
  },
  {
    id: 2,
    name: "Yidedya Kebede",
    photo: "/images/group-students-profile.svg",
    acceptance: 92,
    currentRank: 2,
    previousRank: 1,
  },
  {
    id: 3,
    name: "Emre Varol",
    photo: "/images/group-students-profile.svg",
    acceptance: 85,
    currentRank: 3,
    previousRank: 2,
  },
  {
    id: 4,
    name: "Kaleb Mesfin",
    photo: "/images/group-students-profile.svg",
    acceptance: 84,
    currentRank: 4,
    previousRank: 4,
  },
];

const contestUserList: Array<ContestInfo> = [
  {
    id: 1,
    name: "Hanna Samuel",
    photo: "/images/group-students-profile.svg",
    solved: 24,
    total: 26,
    contestRating: 1854,
    currentRank: 1,
    previousRank: 3,
  },
  {
    id: 2,
    name: "Kaleb Mesfin",
    photo: "/images/group-students-profile.svg",
    solved: 23,
    total: 26,
    contestRating: 1829,
    currentRank: 2,
    previousRank: 2,
  },
  {
    id: 3,
    name: "Emre Varol",
    photo: "/images/group-students-profile.svg",
    solved: 22,
    total: 26,
    contestRating: 1811,
    currentRank: 3,
    previousRank: 1,
  },
  {
    id: 4,
    name: "Yididiya Kebede",
    photo: "/images/group-students-profile.svg",
    solved: 20,
    total: 26,
    contestRating: 1786,
    currentRank: 4,
    previousRank: 4,
  },
];

const StatComponent = (props: Props) => {
  return (
    <div className="">
      <div className="flex flex-col gap-y-4 w-full">
        <p className="text-[rgb(103,103,103)] font-semibold text-lg">
          {props.groupData?.group.name}
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          {rankList.map((item, index) => (
            <DashboardRankItem key={index} {...item} />
          ))}
        </div>
        <div className="rounded-lg items-center w-full flex flex-col lg:flex-row gap-4">
          <div className="bg-white rounded-lg items-start flex w-full lg:w-2/3 flex-col p-3 relative overflow-auto">
            <h2 className="font-semibold">Submission Report</h2>
            <Chart />
          </div>
          <div className="flex flex-col w-full lg:w-1/3 bg-white rounded-lg justify-start p-4 items-center gap-y-4">
            <p className="text-[#454343] font-semibold">Solved Problems</p>
            <TotalRadialBar />
            <p className="text-[#454343] font-bold">220/300</p>
            <p className="text-[#B2B2B2] text-[10px] font-semibold">
              Acceptance Rate
            </p>
            <div className="flex flex-row gap-x-2">
              <RadialBar
                difficulty={ProblemDifficultyType.EASY}
                solvedProblems={147}
                totalProblems={220}
              />
              <RadialBar
                difficulty={ProblemDifficultyType.MEDIUM}
                solvedProblems={37}
                totalProblems={120}
              />
              <RadialBar
                difficulty={ProblemDifficultyType.HARD}
                solvedProblems={37}
                totalProblems={420}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full my-4">
        <div className="w-full lg:w-1/2">
          <AcceptanceRate acceptanceInfo={userList} />
        </div>
        <div className="w-full lg:w-1/2">
          <ContestRating contestInfo={contestUserList} />
        </div>
      </div>
    </div>
  );
};

export default StatComponent;
