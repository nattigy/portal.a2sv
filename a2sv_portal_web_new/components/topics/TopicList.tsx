import React, { useEffect } from "react";
import useGetAllTopicsBySeasonIdQuery from "../../lib/hooks/useTopics";
import useGetAllTopicsQuery from "../../lib/hooks/useTopics";
import { LoaderSmall } from "../common/Loaders";
import TopicItem from "./TopicItem";
import TopicStruggledItem from "./TopicStruggledItem";

type TopicListProps = {
  title: string;
  selectedSeason: any;
};

const TopicList = (props: TopicListProps) => {
  const [fetchUsers, { data, refetch, loading, }] = useGetAllTopicsBySeasonIdQuery(props.selectedSeason.value)

  useEffect(() => {
    fetchUsers()
  }, [refetch, props.selectedSeason])

  return (
    <>
      <p className="font-Poppins font-semibold text-[#565656] text-sm">
        {props.title}
      </p>
      {
        loading ? (
          <div className="w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) :
          <div className="grid grid-cols-3 gap-3 gap-x-12">{
            data && data.topics.map((topic: any) => (
              <>
                <TopicItem topic={topic} season={props.selectedSeason} key={topic.id} title={props.title} />
              </>
            )
            )}
          </div>
      }
    </>
  );
};

export default TopicList;
