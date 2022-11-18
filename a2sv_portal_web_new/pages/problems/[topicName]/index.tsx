import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BaseLayout from "../../../components/common/BaseLayout";
import EmptyState from "../../../components/common/EmptyState";
import { LoaderSmall } from "../../../components/common/Loaders";
import HOAAllProblemsPage from "../../../components/problems/HOA/HOAAllProblemsPage";
import ProblemsList from "../../../components/problems/HOA/ProblemsList";
import { useGetAllProblemsByTags } from "../../../lib/hooks/useAllProblems";

const IndexPage = () => {
  const [problemsData, setProblemsData] = useState([]);
  const router = useRouter();
  console.log(router.query)
  const { data, refetch, error, loading } = useGetAllProblemsByTags([
    router.query.topicName?.toString().toUpperCase() || "",
  ]);

  useEffect(() => {
    if (data) {
      setProblemsData(data.problems?.items);
    }
  }, [refetch, data]);

  // const Sidebar: React.FC = () => {
  //   return (
  //     <div className="flex flex-col justify-between h-full">
  //     </div>
  //   );
  // };

  return (
    <BaseLayout>
      <div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoaderSmall color="#5956E9" />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : (
          <>
            {problemsData?.length > 0 ? (
              <ProblemsList problems={problemsData} />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default IndexPage;
