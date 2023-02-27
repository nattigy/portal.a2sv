import React, { useEffect, useState } from "react";
import { useApollo } from "../../../lib/apollo/apolloClient";
import { useGetAllTopics } from "../../../lib/hooks/useTopics";
import { Topic } from "../../../types/topic";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
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
          <div className="flex flex-col items-end pb-4">
            <Button
              onClick={() => {
                setIsTopicModalOpen(true);
              }}
              text="Add New Topic"
              classname="bg-primary text-white text-xs"
            />
          </div>

          {topicsData?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-x-12">
              {topicsData.map((topic: Topic, idx: number) => (
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
