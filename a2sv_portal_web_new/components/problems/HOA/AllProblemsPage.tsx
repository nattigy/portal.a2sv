import React, { useEffect, useState } from "react";
import { searchItems } from "../../../helpers/searchItems";
import { useApollo } from "../../../lib/apollo/apolloClient";
import { useAllProblems } from "../../../lib/hooks/useProblems";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import SearchField from "../../common/SearchField";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchProblems, setSearchProblems] =
    useState<Array<any>>(problemsData);

  useEffect(() => {
    setSearchProblems(problemsData);
  }, [problemsData]);

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const searchedData = searchItems(problemsData, searchQuery, "title");
    setSearchProblems(searchedData);
  }, [problemsData, searchQuery]);

  return (
    <>
      {isProblemModalOpen && (
        <ProblemModal
          isEditing={false}
          onClose={() => {
            setIsProblemModalOpen(false);
          }}
        />
      )}
      <div className="flex justify-end gap-x-4 pb-4">
        <SearchField
          placeholder="Search Problem"
          id="repo-problem"
          onChange={handleSearchQueryChange}
          className="rounded-md"
        />
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
            {searchProblems?.length > 0 ? (
              <ProblemsList problems={searchProblems} />
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
