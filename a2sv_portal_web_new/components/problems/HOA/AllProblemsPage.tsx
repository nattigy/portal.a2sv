import React, { useEffect, useState } from "react";
import { useApollo } from "../../../lib/apollo/apolloClient";
import useAllProblems from "../../../lib/hooks/useAllProblems";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import ProblemModal from "../../modals/ProblemModal";
import ProblemsList from "./ProblemsList";

type Props = {};

const AllProblemsPage = (props: Props) => {
  const [problemsData, setProblemsData] = useState([]);
  const apolloClient = useApollo(props);
  const { data, refetch, error, loading } = useAllProblems();
  const [isProblemModalOpen, setIsProblemModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setProblemsData(data.problems?.items);
    }
  }, [refetch, data]);

  return (
    <>
      {isProblemModalOpen && (
        <ProblemModal
          isEditing={false}
          onClose={() => {
            setIsProblemModalOpen(false);
          }}
          newProblem={true}
        />
      )}
      <div className="flex flex-col items-end pb-4">
        <Button
          onClick={() => {
            setIsProblemModalOpen(true);
          }}
          text="Add New Problem"
          classname="bg-primary text-white text-xs"
        />
      </div>

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

export default AllProblemsPage;
