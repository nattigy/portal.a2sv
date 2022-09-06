import React, { useEffect, useState } from "react";
import useAllUsers from "../../lib/hooks/useUsers";
import StudentLayout from "../common/StudentLayout";
import ConsistencyDiagramItem, {
  ProblemSolvedProps,
} from "./ConsistencyDiagram";
import DashboardRankItem, { DashboardRankItemProps } from "./DashboardRankItem";
import DashboardStruggledItem from "./DashboardStruggledItem";
import DashboardTopicItem, {
  DashboradTopicItemProps,
} from "./DashboardTopicItem";
import HOEChart from "./HOEChart";
import ProblemSolvedItem from "./ProblemSolvedItem";

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
  { rankType: "Daily", totalStudents: 30, userRank: 2 },
  { rankType: "Weekly", totalStudents: 30, userRank: 1 },
  { rankType: "Monthly", totalStudents: 30, userRank: 3 },
  { rankType: "Overall", totalStudents: 30, userRank: 5 },
];

const HOEDashboard = (props: Props) => {
  const [filter, setFilter] = useState("all");
  const { loading, data, error, refetch } = useAllUsers();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("data is ", data);
      setUsersData(data.users);
    }
  }, [refetch, data]);

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

  return (
    <StudentLayout>
      <div className="flex flex-col gap-y-4">
        <p className="text-[rgb(103,103,103)] font-semibold">Student Stats</p>
      </div>
      <div className="w-fit bg-white p-4">
        <h2 className="font-semibold">Submission Report</h2>
        <HOEChart />
      </div>
    </StudentLayout>
  );
};

export default HOEDashboard;
