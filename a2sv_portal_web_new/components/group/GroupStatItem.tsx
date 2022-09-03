import React from "react";

export type GropStatItemProps = {
  count: number;
  name: string;
  path?: string;
};
const GroupStatItem = (props: GropStatItemProps) => {
  return (
    <div className="h-[70px] pl-3 flex w-52 rounded-lg gap-x-3 bg-white m-3 items-center">
      <div className="w-11 h-11">
        <img src={props.path} className="w-full h-full" alt="" />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-[#565656]">{props.count}</p>
        <p className="text-[#b1b1b1] font-medium text-xs">{props.name}</p>
      </div>
    </div>
  );
};

export default GroupStatItem;
