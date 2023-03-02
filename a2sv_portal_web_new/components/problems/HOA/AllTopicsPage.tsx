import React, { useEffect, useState } from "react";
import { searchItems } from "../../../helpers/searchItems";
import { useApollo } from "../../../lib/apollo/apolloClient";
import { useGetAllTopics } from "../../../lib/hooks/useTopics";
import { Topic } from "../../../types/topic";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import SearchField from "../../common/SearchField";
import TopicModal from "../../modals/TopicModal";
import RepositoryTopicItem from "../../topics/RepositoryTopicItem";

type Props = {};

const AllTopicsPage = (props: Props) => {
  const [topicsData, setTopicsData] = useState([]);
  const { data, refetch, error, loading } = useGetAllTopics();
  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setTopicsData(data?.topics.items);
    }
  }, [refetch, data]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchTopics, setSearchTopics] = useState<Array<any>>(topicsData);

  useEffect(() => {
    setSearchTopics(topicsData);
  }, [topicsData]);

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const searchedData = searchItems(topicsData, searchQuery, "name");
    setSearchTopics(searchedData);
  }, [topicsData, searchQuery]);

  return (
    <div>
      {isTopicModalOpen && (
        <TopicModal
          isEditing={false}
          onClose={() => {
            setIsTopicModalOpen(false);
          }}
        />
      )}
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoaderSmall color="#5956E9" />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <>
          <div className="flex justify-end gap-x-4 pb-4">
            <SearchField
              placeholder="Search Topic"
              id="repo-topics"
              onChange={handleSearchQueryChange}
              className="rounded-md"
            />
            <Button
              onClick={() => {
                setIsTopicModalOpen(true);
              }}
              text="Add New Topic"
              classname="bg-primary text-white text-xs"
            />
          </div>
          {searchTopics?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-x-12">
              {searchTopics.map((topic: Topic, idx: number) => (
                <RepositoryTopicItem idx={idx} key={idx} topic={topic} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default AllTopicsPage;
