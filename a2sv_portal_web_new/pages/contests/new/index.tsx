import React, { useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import ContestInfoItem from "../../../components/newcontest/ContestInfoItem";
import NewContestSidebarItem from "../../../components/newcontest/NewContestSidebarItem";
import QuestionsItem, {
  NewContestQuestionProps,
} from "../../../components/newcontest/QuestionsItem";
import { ProblemDifficultyType } from "../../../types/problems";

type Props = {};

const IndexPage = () => {
  const Sidebar: React.FC = () => {
    return <NewContestSidebarItem />;
  };

  const questions: Array<NewContestQuestionProps> = [
    {
      id: 1,
      difficulty: ProblemDifficultyType.EASY,
      title: "Dima and Stairs Dima and Stairs Dima and Stairs",
      tags: [
        "Dynamic Prograaming",
        "Greedy",
        "Stack",
        "Queue",
        "Hash Table",
        "Stack",
        "Dynamic Programming",
      ],
    },
    {
      id: 2,
      difficulty: ProblemDifficultyType.MEDIUM,
      title: "Dima and Stairs",
      tags: ["Dynamic Prograaming", "Greedy"],
    },
    {
      id: 3,
      difficulty: ProblemDifficultyType.HARD,
      title: "Dima and Stairs",
      tags: ["Dynamic Prograaming", "Greedy"],
    },
  ];

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between py-2">
          <h1 className="font-bold text-2xl">Create New Contest</h1>
          <button className="p-2 px-8 bg-primary text-white rounded-md">
            Create
          </button>
        </div>
        <ContestInfoItem />
        <QuestionsItem questions={questions} />
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
