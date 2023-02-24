import React, { useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import ContestForm from "../../../components/contests/ContestForm";
import NewContestSidebarItem from "../../../components/newcontest/NewContestSidebarItem";
import { ProblemType } from "../../../types";

const IndexPage = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<ProblemType>
  >([]);
  const [selectedQuestionsId, setSelectedQuestionsId] = useState<Set<string>>(
    new Set()
  );

  const Sidebar: React.FC = () => {
    return (
      <NewContestSidebarItem
        setSelectedQuestions={setSelectedQuestions}
        setSelectedQuestionsId={setSelectedQuestionsId}
        selectedQuestionsId={selectedQuestionsId}
      />
    );
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      <ContestForm
        setSelectedQuestions={setSelectedQuestions}
        setSelectedQuestionsId={setSelectedQuestionsId}
        selectedQuestions={selectedQuestions}
      />
    </BaseLayout>
  );
};

export default IndexPage;
