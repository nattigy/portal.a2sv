import React, { useEffect } from "react";
import useGetAllTopicsBySeasonIdQuery from "../../lib/hooks/useTopics";
import useGetAllTopicsQuery from "../../lib/hooks/useTopics";
import { LoaderSmall } from "../common/Loaders";
import TopicItem from "./TopicItem";
import TopicStruggledItem from "./TopicStruggledItem";

type TopicListProps = {
  title: string;
  season: string;
  topics: [];
};

const TopicList = (props: TopicListProps) => {
  return (
    <>
      <p className="font-Poppins font-semibold text-[#565656] text-sm">
        {props.title}
      </p>
      {
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 gap-x-12">
          {props.topics?.map((topic: any) => (
            <>
              <TopicItem season={props.season} topic={topic} key={topic.id} title={props.title} />
            </>
          ))}
        </div>
      }
    </>
  );
};

export default TopicList;
