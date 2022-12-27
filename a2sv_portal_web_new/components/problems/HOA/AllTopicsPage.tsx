import React, { useEffect, useState } from "react";
import { useApollo } from "../../../lib/apollo/apolloClient";
import { useGetAllTopics } from "../../../lib/hooks/useTopics";
import Button from "../../common/Button";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import TopicModal from "../../modals/TopicModal";
import TopicsList from "./TopicsList";

type Props = {};

const AllTopicsPage = (props: Props) => {
  const [topicsData, setTopicsData] = useState([]);
  const apolloClient = useApollo(props);
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
          newTopic={true}
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
            <TopicsList topics={topicsData} />
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </div>
  );
};

export default AllTopicsPage;
