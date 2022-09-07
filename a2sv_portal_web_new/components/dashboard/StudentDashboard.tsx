import React, { useEffect, useState } from "react";
import { UserRoleType } from "../../types/user";
import BaseLayout from "../common/BaseLayout";
import ConsistencyDiagramItem from "./ConsistencyDiagram";
import ContestStatItem from "./ContestStatItem";
import DashboardRankItem, { DashboardRankItemProps } from "./DashboardRankItem";
import DashboardStruggledItem from "./DashboardStruggledItem";
import DashboardTopicItem, { DashboardTopicItemProps } from "./DashboardTopicItem";
import ProblemSolvedItem, { ProblemSolvedProps } from "./ProblemSolvedItem";

type Props = {};

const StudentDashboard = (props: Props) => {

  const DashboardTopic: DashboardTopicItemProps[] = [
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
      activeColor: "#5956E9",
      inactiveColor: "#E9E3FE99",
    },
    {
      rankType: "Weekly",
      totalStudents: 30,
      userRank: 1,
      activeColor: "#5956E9",
      inactiveColor: "#E9E3FE99",
    },
    {
      rankType: "Monthly",
      totalStudents: 30,
      userRank: 3,
      activeColor: "#5956E9",
      inactiveColor: "#E9E3FE99",
    },
    {
      rankType: "Overall",
      totalStudents: 30,
      userRank: 5,
      activeColor: "#5956E9",
      inactiveColor: "#E9E3FE99",
    },
  ];
  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col gap-y-3">
        <p className="text-[#565656] font-semibold text-lg">Topics Covered</p>
        <div className="flex flex-row justify-between text-[#B2B2B2] text-xs">
          <p>Topic</p>
          <p>Questions</p>
        </div>
        {DashboardTopic.map((item, index) => (
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

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <p className="text-[#676767] font-semibold text-xl">Student Stats</p>
        <div className="flex flex-row gap-x-3">
          {rankList.map((item, index) => (
            <DashboardRankItem key={index} {...item} />
          ))}
        </div>
        <div className="flex gap-x-2 my-4">
          <ConsistencyDiagramItem />
          <ProblemSolvedItem p={problemStat} />
        </div>
        <ContestStatItem />
      </div>
    </BaseLayout>
  );
};

export default StudentDashboard;
