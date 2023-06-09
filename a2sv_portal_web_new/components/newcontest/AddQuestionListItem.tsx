import React, { ChangeEventHandler } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserRoleType } from "../../types/user";
import clsx from "clsx";
import { ProblemDifficultyType } from "../../types/problems";
import { DifficultyChips } from "../problems/DifficultyChips";

export type QuestionsInfo = {
  id: number;
  title: string;
  difficulty: ProblemDifficultyType;
};

type Props = {
  questionProps: QuestionsInfo;
};

const AddQuestionListItem = ({ questionProps }: Props) => {
  return (
    <div
      className={clsx(
        "flex gap-x-4 py-2 cursor-pointer"
        // ? "bg-[#5956E91F]"
        // : ""
      )}
    >
      <label
        className="w-full cursor-pointer"
        htmlFor={questionProps.id.toString()}
      >
        <div className="w-full flex items-center justify-between gap-x-2">
          <div className="gap-x-2 flex items-center">
            <span className="w-4 text-center">{1}</span>
            <span className="font-semibold text-xs truncate">
              {questionProps.title}
            </span>
          </div>
          <DifficultyChips status={questionProps.difficulty} />
        </div>
      </label>
    </div>
  );
};

export default AddQuestionListItem;
