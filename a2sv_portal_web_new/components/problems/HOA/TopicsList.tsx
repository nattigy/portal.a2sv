import React from "react";
import { Topic } from "../../../types/topic";
import { LoaderSmall } from "../../common/Loaders";
import TopicItem from "../../topics/TopicItem";
import TopicsItem from "./TopicsItem";

type Props = {
  topics: Topic[];
};

const TopicsList = ({ topics }: Props) => {
  return topics.length === 0 ? (
    <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 gap-x-12">
      {topics.map((topic, index) => {
        return <TopicsItem idx={index} key={index} topic={topic} />;
      })}
    </div>
  );
};

export default TopicsList;
