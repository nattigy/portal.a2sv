import React from "react";
import TopicItem from "./TopicItem";

type TopicListProps = {
  groupId?: string;
  title: string;
  season?: { id: string; name: string };
  topics: any[];
};

const TopicList = (props: TopicListProps) => {
  return (
    <>
      {
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {props.topics?.map((item: any, idx: number) => (
            <>
              <TopicItem
                idx={idx}
                topic={item}
                key={idx}
              />
            </>
          ))}
        </div>
      }
    </>
  );
};

export default TopicList;
