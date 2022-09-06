import React, { useEffect, useState } from "react";
import { ProblemDifficultyType } from "../../types/problems";
import { UserRoleType } from "../../types/user";
import StudentLayout from "../common/StudentLayout";
import ConsistencyDiagramItem, {
  ProblemSolvedProps,
} from "./ConsistencyDiagram";
import DashboardRankItem, { DashboardRankItemProps } from "./DashboardRankItem";
import DashboardStruggledItem from "./DashboardStruggledItem";
import DashboardTopicItem, {
  DashboradTopicItemProps,
} from "./DashboardTopicItem";
import HOAAcceptanceRate from "./HOAAcceptanceRate";
import HOAChart from "./HOAChart";
import HOAContestRating, { HOAContestInfo } from "./HOAContestRating";
import { HOEAcceptanceInfo } from "./HOEAcceptanceRate";
import ProblemSolvedItem from "./ProblemSolvedItem";
import RadialBar from "./RadialBar";
import TotalRadialBar from "./TotalRadialBar";

type Props = {};
const DashboradTopic: DashboradTopicItemProps[] = [
  {
    questions: 10,
    topicName: "Dynamic Programming",
  },
  {
    questions: 20,
    topicName: "Sliding Window",
  },
  {
    questions: 34,
    topicName: "Bit Manipulation",
  },
  {
    questions: 15,
    topicName: "Queue",
  },
];
const strugglingWith: { percent: number; name: string }[] = [
  { percent: 10, name: "Dynamic Programming" },
  { percent: 20, name: "Sliding Window" },
  { percent: 34, name: "Bit Manipulation" },
  { percent: 5, name: "Queue" },
];
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
  {
    rankType: "Overall",
    totalStudents: 30,
    userRank: 5,
    activeColor: "#5956E9",
    inactiveColor: "#E9E3FE99",
  },
];

const HOADashboard = (props: Props) => {


  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col gap-y-3">
        <p className="text-[#565656] font-semibold text-lg">Topics Covered</p>
        <div className="flex flex-row justify-between text-[#B2B2B2] text-xs">
          <p>Topic</p>
          <p>Questions</p>
        </div>
        {DashboradTopic.map((item, index) => (
          <DashboardTopicItem {...item} key={index} />
        ))}
        <p className="text-[#565656] font-semibold text-lg mt-5">
          Topics Struggling with
        </p>
        {strugglingWith.map((item, index) => (
          <DashboardStruggledItem {...item} key={index} />
        ))}
      </div>
    );
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const userList: Array<HOEAcceptanceInfo> = [
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

  const contestUserList: Array<HOAContestInfo> = [
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

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4 w-full">
        <p className="text-[rgb(103,103,103)] font-semibold">Group #</p>
        <div className="flex flex-row gap-x-3 w-full">
          {rankList.map((item, index) => (
            <DashboardRankItem key={index} {...item} />
          ))}
        </div>
        <div className="rounded-lg items-center w-full flex flex-row gap-4">
          <div className="bg-white rounded-lg items-start flex w-2/3 flex-col p-3">
            <h2 className="font-semibold">Submission Report</h2>
            <HOAChart />
          </div>
          <div className="flex flex-col w-1/3 bg-white rounded-lg justify-start p-4 items-center gap-y-4">
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
      <div className="flex w-full gap-x-4 my-4">
        <div className="w-1/2">
          <HOAAcceptanceRate acceptanceInfo={userList} />
        </div>
        <div className="w-1/2">
          <HOAContestRating contestInfo={contestUserList} />
        </div>
      </div>
    </StudentLayout>
  );
};

export default HOADashboard;
