import React from "react";
import TopicItem from "./TopicItem";

type TopicListProps = {
  groupId?:string;
  title: string;
  season?: {id:string,name:string};
  topics: any[];
};

const TopicList = (props: TopicListProps) => {
  return (
    <>
      <p className="font-Poppins font-semibold text-[#565656] text-sm ">
        {props.title}
      </p>
      {
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
          {props.topics?.map((item: any,idx:number) => (
            <>
              <TopicItem idx={idx} season={props.season} topic={item} key={idx} title={item.name} groupId={props.groupId} />
            </>
          ))}
        </div>
      }
    </>
  );
};

export default TopicList;
