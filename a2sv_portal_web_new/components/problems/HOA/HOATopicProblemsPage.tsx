import React, { useEffect, useState } from "react";
import { useApollo } from "../../../lib/apollo/apolloClient";
import { useGetAllTopics } from "../../../lib/hooks/useTopics";
import EmptyState from "../../common/EmptyState";
import { LoaderSmall } from "../../common/Loaders";
import TopicsList from "./TopicsList";

type Props = {};

const HOATopicProblemsPage = (props: Props) => {
  const [topicsData, setTopicsData] = useState([]);
  const apolloClient = useApollo(props);
  const { data, refetch, error, loading } = useGetAllTopics();

  useEffect(() => {
    if (data) {
      setTopicsData(data?.topics.items);
    }
  }, [refetch, data]);
  return (
    <div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoaderSmall color="#5956E9" />
        </div>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <>
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

export default HOATopicProblemsPage;
