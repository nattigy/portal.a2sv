import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useGetAllFilteredProblems } from "../../lib/hooks/useProblems";
import { ProblemDifficultyType, ProblemType } from "../../types/problems";
import { QuestionsInfo } from "./AddQuestionListItem";
import AddQuestionsList from "./AddQuestionsList";

type Props = {
  selectedQuestionsId: Set<string>
  setSelectedQuestions: React.Dispatch<React.SetStateAction<ProblemType[]>>
  setSelectedQuestionsId: React.Dispatch<React.SetStateAction<Set<string>>>
};

const NewContestSidebarItem = ({
  selectedQuestionsId,setSelectedQuestions,setSelectedQuestionsId
}: Props) => {
  const { data, loading, error, refetch } = useGetAllFilteredProblems();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log(selectedQuestionsId)
    if (data) {
      setQuestions(
        data.problems?.items?.filter((item: any) => {
          return !selectedQuestionsId.has(item.id);
        })
      );
    }
  }, [refetch, data, selectedQuestionsId]);

  const handleSelectedQuestion = (question: any) => {
    setSelectedQuestions((prev) => {
      const name = [...prev, question];
      return name;
    });
    setSelectedQuestionsId((prev) => new Set([...prev, question.id]));
  };

  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <AddQuestionsList handleSelect={handleSelectedQuestion} questions={questions} />
      </div>
    </div>
  );
};

export default NewContestSidebarItem;
