import React from "react";
import clsx from "clsx";
export type TopicStruggledProps = {
  votes: number;
  percent: number;
  name: string;
};

const TopicStruggledItem = (props: TopicStruggledProps) => {
  return (
    <div className="font-Poppins flex flex-col gap-y-2">
      <div className="flex flex-row justify-between w-full">
        <p className="text-xs font-medium">{props.name}</p>
        <p className="text-xs font-regular">{`${props.percent}%`}</p>
      </div>
      <div className="rounded-md bg-[#F6F6FC] w-full h-2">
        <div
          style={{
            width: `${props.percent}%`,
          }}
          className={`rounded-md bg-[#5956E9] h-2 items-center px-2`}
        ></div>
      </div>
      <p className="text-[#8F8F8F] text-xs">{props.votes} votes</p>
    </div>
  );
};

export default TopicStruggledItem;
