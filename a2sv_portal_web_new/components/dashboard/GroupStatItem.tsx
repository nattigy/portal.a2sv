import React from "react";

export type GropStatItemProps = {
  count: number;
  name: string;
  path?: string;
};
const GroupStatItem = (props: GropStatItemProps) => {
  return (
    <div className="h-[70px] w-full flex rounded-lg bg-white mt-2 items-center">
      <div className="w-2/6 h-11">
        <img src={props.path} className="w-full h-full" alt="" />
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-semibold text-[#565656]">{props.count}</p>
        <p className="text-[#b1b1b1] font-medium text-xs">{props.name}</p>
      </div>
    </div>
  );
};

export default GroupStatItem;
