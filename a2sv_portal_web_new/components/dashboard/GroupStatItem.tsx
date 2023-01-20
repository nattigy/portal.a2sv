import React from "react";
import Image from "next/image";

export type GropStatItemProps = {
  count: number;
  name: string;
  path?: string;
};
const GroupStatItem = (props: GropStatItemProps) => {
  return (
    <div className="h-[70px] w-full flex gap-x-2 lg:gap-x-1 rounded-lg bg-white mt-2 px-2 md:px-1 items-center">
      <div className="w-[25%] h-11">
        <img src={props.path} className="w-full h-full" alt="" />
      </div>
      <div className="flex flex-col w-[50%]">
        <p className="font-semibold text-[#565656]">{props.count}</p>
        <p className="text-[#b1b1b1] font-medium text-xs">{props.name}</p>
      </div>
    </div>
  );
};

export default GroupStatItem;
