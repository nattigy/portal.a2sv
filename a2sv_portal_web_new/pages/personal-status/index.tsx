import React, { ReactNode } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import PersonalRankItem, {
  PersonalRankItemProps,
} from "../../components/personal-status/PersonalRankItem";
import PersonalStruggledItem from "../../components/personal-status/PersonalStruggledItem";
import PersonalTopicItem, {
  PersonalTopicItemProps,
} from "../../components/personal-status/PersonalTopicItem";
import ConsistencyDiagramItem from "../../components/dashboard/ConsistencyDiagram";
import ContestStatItem from "../../components/dashboard/ContestStatItem";
import ProblemSolvedItem, {
  ProblemSolvedProps,
} from "../../components/dashboard/ProblemSolvedItem";
const personalTopic: PersonalTopicItemProps[] = [
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

const rankList: PersonalRankItemProps[] = [
  { rankType: "Daily", totalStudents: 30, userRank: 2 },
  { rankType: "Weekly", totalStudents: 30, userRank: 1 },
  { rankType: "Monthly", totalStudents: 30, userRank: 3 },
  { rankType: "Overall", totalStudents: 30, userRank: 5 },
];
const IndexPage = () => {
  const Sidebar: React.FC = () => {
    return (
      <div className="flex flex-col gap-y-3">
        <p className="text-[#565656] font-semibold text-lg">Topics Covered</p>
        <div className="flex flex-row justify-between text-[#B2B2B2] text-xs">
          <p>Topic</p>
          <p>Questions</p>
        </div>
        {personalTopic.map((item, index) => (
          <PersonalTopicItem {...item} key={index} />
        ))}
        <p className="text-[#565656] font-semibold text-lg mt-5">
          Topics Struggling with
        </p>
        {strugglingWith.map((item, index) => (
          <PersonalStruggledItem {...item} key={index} />
        ))}
      </div>
    );
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <p className="text-[#676767] font-semibold">Student Stats</p>
        <div className="flex flex-row gap-x-3">
          {rankList.map((item, index) => (
            <PersonalRankItem key={index} {...item} />
          ))}
        </div>
        <div className="flex gap-x-2 my-4">
          <ConsistencyDiagramItem />
          <ProblemSolvedItem problemSolvedProps={problemStat} />
        </div>
        <ContestStatItem />
      </div>
    </StudentLayout>
  );
};

export default IndexPage;
