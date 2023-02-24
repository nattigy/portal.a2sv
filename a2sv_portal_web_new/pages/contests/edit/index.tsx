import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import EmptyState from "../../../components/common/EmptyState";
import { LoaderSmall } from "../../../components/common/Loaders";
import ContestForm from "../../../components/contests/ContestForm";
import NewContestSidebarItem from "../../../components/newcontest/NewContestSidebarItem";
import { useGetContestDetails } from "../../../lib/hooks/useContests";
import { ProblemType } from "../../../types/problems";

const IndexPage = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<ProblemType>
  >([]);
  const [selectedQuestionsId, setSelectedQuestionsId] = useState<Set<string>>(
    new Set()
  );

  const router = useRouter();

  useEffect(() => {
    if (!router.query?.contestId) {
      router.push("/contests");
    }
  }, [router]);



  const { data, error, loading } = useGetContestDetails(
    router.query.contestId?.toString() || ""
  );

  useEffect(() => {
    setSelectedQuestions(data?.contest?.problems);
    setSelectedQuestionsId(new Set<string>(data?.contest?.problems.map((problem :ProblemType)=>problem.id)));

  }, [data])
  


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
      {loading ? (
        <div className="flex h-full items-center justify-center min-w-full min-h-full">
          <LoaderSmall />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <ContestForm
          contest={data.contest}
          setSelectedQuestions={setSelectedQuestions}
          setSelectedQuestionsId={setSelectedQuestionsId}
          selectedQuestions={selectedQuestions}
        />
      )}
    </BaseLayout>
  );
};

export default IndexPage;
