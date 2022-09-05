import React from "react";

const PersonalStruggledItem = (props: { percent: number; name: string }) => {
  return (
    <div>
      <div
        style={{ width: `${props.percent}%` }}
        className="absolute rounded-lg bg-[#5956E912] h-7  w-10"
      ></div>
      <div className=" text-xs text-[#676767] items-center h-7 flex gap-x-4 pl-2 font-medium">
        <p>{`${props.percent}%`}</p>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default PersonalStruggledItem;
