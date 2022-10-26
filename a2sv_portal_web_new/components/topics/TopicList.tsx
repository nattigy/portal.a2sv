import React from "react";
import TopicItem from "./TopicItem";

type TopicListProps = {
  groupId?:number;
  title: string;
  season?: {id:number,name:string};
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
          {props.topics?.map((topic: any,idx:number) => (
            <>
              <TopicItem idx={idx} season={props.season} topic={topic} key={topic.id} title={props.title} groupId={props.groupId} />
            </>
          ))}
        </div>
      }
    </>
  );
};

export default TopicList;
