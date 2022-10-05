import clsx from "clsx";
import React from "react";
import { ProblemDifficultyType } from "../../types/problems";
import { QuestionsInfo } from "./AddQuestionListItem";
import AddQuestionsList from "./AddQuestionsList";

type Props = {};

const questions:Array<QuestionsInfo> = [
    {
        id: 1,
        name: "Dima and Staircase",
        difficulty: ProblemDifficultyType.EASY
    }, 
    {
        id: 2,
        name: "Dima and Staircase",
        difficulty: ProblemDifficultyType.MEDIUM
    },
    {
        id: 3,
        name: "Dima and Staircase",
        difficulty: ProblemDifficultyType.HARD
    }
]

const NewContestSidebarItem = (props: Props) => {
  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <AddQuestionsList questions={questions} />
      </div>
    </div>
  );
};

export default NewContestSidebarItem;
