import React from "react";
import { titleToIcon } from "../topics/TopicItem";
export type PersonalTopicItemProps = {
  topicName: string;
  questions: number;
};
const PersonalTopicItem = (props: PersonalTopicItemProps) => {
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

export default PersonalTopicItem;
