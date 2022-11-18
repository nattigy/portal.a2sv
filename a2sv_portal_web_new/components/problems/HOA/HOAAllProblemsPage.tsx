import React, { useEffect, useState } from "react";
import { useApollo } from "../../../lib/apollo/apolloClient";
import useAllProblems from "../../../lib/hooks/useAllProblems";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import ProblemsFilter from "./ProblemsFilter";
import ProblemsList from "./ProblemsList";

type Props = {};

const HOAAllProblemsPage = (props: Props) => {
  const [problemsData, setProblemsData] = useState([]);
  const apolloClient = useApollo(props);
  const { data, refetch, error, loading } = useAllProblems();

  useEffect(() => {
    if (data) {
      setProblemsData(data.problems?.items);
    }
  }, [refetch, data]);

  return (
    <>
      {/* {isAddTopicToGroupModalOpen && (
        <AddTopicToGroupModal
          onClose={() => setIsAddTopicToGroupModalOpen(false)}
          groupId={authUser?.headToGroup?.id}
          seasonId={1}
        />
      )} */}
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
    </>
  );
};

export default HOAAllProblemsPage;
