import React, { useEffect, useState } from "react";
import {useGetSeasonTopics } from "../../lib/hooks/useTopics";
import { LoaderSmall } from "../common/Loaders";
import TopicModal from "../modals/TopicModal";
import Button from "../common/Button";
import { useRouter } from "next/router";
import { Topic } from "../../types/topic";
import EmptyState from "../common/EmptyState";
import GlobalTopicItem from "./GlobalTopicItem";

const HOATopicsPage = () => {
  const router = useRouter();
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data, loading, error } = useGetSeasonTopics(
    router.query?.seasonId?.toString() || ""
  );
  

  useEffect(() => {
    if (data) {
      setTopics(data.seasonsTopics?.items.map((item: any) => item.topic));
    }
  }, [data]);

  return (
    <>
      {isNewTopicModalOpen && (
        <TopicModal
          isEditing={false}
          addToSeason={true}
          onClose={() => setIsNewTopicModalOpen(false)}
          seasonId={router.query?.seasonId?.toString()}
        />
      )}
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className=" justify-between flex items-center mb-2 gap-x-5 ">
          <h1 className="text-lg font-semibold text-gray-700">All Topics</h1>
        </div>

        <Button
          onClick={() => {
            setIsNewTopicModalOpen(true);
          }}
          text="Add Topic to Season"
          classname="bg-primary text-white text-xs"
        />
      </div>
      <div className="w-full flex flex-col gap-y-4">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : topics?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
            {topics.map((topic: Topic, idx: number) => (
              <GlobalTopicItem
                idx={idx}
                key={idx}
                season={{
                  id: router.query.seasonId?.toString() || "",
                  name: router.query.season?.toString() || "",
                }}
                topic={topic}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HOATopicsPage;
