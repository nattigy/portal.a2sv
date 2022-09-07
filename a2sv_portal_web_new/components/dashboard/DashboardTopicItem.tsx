import React from "react";
import { titleToIcon } from "../topics/TopicItem";
export type DashboardTopicItemProps = {
  topicName: string;
  questions: number;
};
const DashboardStatTopicItem = (props: DashboardTopicItemProps) => {
  return (
    <div className="flex flex-row text-[#787878] text-xs font-medium justify-between items-center">
      <div className="flex flex-row gap-x-2 items-center">
        <img
          src={titleToIcon[props.topicName].imgPath}
          className="w-7 h-7"
          alt=""
        />
        <p>{props.topicName}</p>
      </div>
      <p>{props.questions}</p>
    </div>
  );
};

export default DashboardStatTopicItem;
