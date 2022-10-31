import React from "react";
import { LoaderSmall } from "../../common/Loaders";
import TopicsItem, { TopicProps } from "./TopicsItem";

type Props = {
  topics: TopicProps[];
};

const TopicsList = ({topics}: Props) => {
  return topics.length === 0 ? (
    <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
      <LoaderSmall />
    </div>
  ) : (
    <div>
      {topics.map((topic, index) => {
        return (
          <TopicsItem
            key={index}
            name={topic.name}
          />
        );
      })}
    </div>
  );
};

export default TopicsList;
