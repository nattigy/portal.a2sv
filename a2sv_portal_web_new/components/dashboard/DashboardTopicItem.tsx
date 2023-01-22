import React from "react";
import { titleToIcon } from "../topics/TopicItem";
export type DashboardTopicItemProps = {
  topicName: string;
  questions: number;
  comfortability: number;
};
const DashboardStatTopicItem = (props: DashboardTopicItemProps) => {
  return (
    <div className="flex flex-row text-[#787878] text-xs font-medium justify-between items-center bg-white p-4 drop-shadow-xl rounded-md ">
      <div className="flex flex-row gap-x-2 items-center">
        <img
          src={titleToIcon[props.topicName].imgPath}
          className="w-12 h-12"
          alt=""
        />
        <div>
          <p className="text-sm">{props.topicName}</p>
          <p className="text-xs text-slate-500/60 mt-1">
            Comfotability - {props.comfortability}%
          </p>
        </div>
      </div>
      <div className="bg-[#E4F2FF] p-3 rounded-md w-7 h-7 flex items-center justify-center">
        <p>{props.questions}</p>
      </div>
    </div>
  );
};

export default DashboardStatTopicItem;
