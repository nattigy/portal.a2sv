import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useGetAllFilteredProblems } from "../../lib/hooks/useAllProblems";
import { ProblemDifficultyType } from "../../types/problems";
import { QuestionsInfo } from "./AddQuestionListItem";
import AddQuestionsList from "./AddQuestionsList";

type Props = {
  selectedQuestionsId: Set<string>;
  handleSelect: (question:any) => void;
};

const NewContestSidebarItem = ({selectedQuestionsId, handleSelect}: Props) => {
  const { data, loading, error, refetch } = useGetAllFilteredProblems();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.problems?.items?.filter((item:any) => {
        return !selectedQuestionsId.has(item.id)
      }));
    }
  }, [refetch, data, selectedQuestionsId]);


  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <AddQuestionsList handleSelect={handleSelect} questions={questions} />
      </div>
    </div>
  );
};

export default NewContestSidebarItem;
