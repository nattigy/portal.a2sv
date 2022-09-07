import React from "react";
import DashboardStruggledItem from "./DashboardStruggledItem";
import DashboardTopicItem, {
  DashboardTopicItemProps,
} from "./DashboardTopicItem";

type Props = {};

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

const StatSidebar: React.FC = (props: Props) => {
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

export default StatSidebar;
