import React, { useState } from "react";

export type DashboardRankItemProps = {
  rankType: string;
  userRank: number;
  totalStudents: number;
  activeColor: string;
  inactiveColor: string;
};
const height = [24, 30, 34, 29, 24, 28, 22, 23, 22, 24];

const DashboardRankItem = (props: DashboardRankItemProps) => {
  const [clicked, setClickedIndex] = useState(height.length - 1);
  return (
    <div className="bg-white rounded-xl w-full h-16 flex flex-row p-3 py-4 gap-x- justify-around">
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-[#676767] text-[10px]">
          {props.rankType} rank
        </p>
        <p className="font-semibold text-[#5956E9] text-sm">{props.userRank}</p>
        <p className="font-medium text-[#B2B2B2] text-[9px]">{`of ${props.totalStudents} students`}</p>
      </div>
      <div className="flex flex-row gap-x-1 h-full items-end justify-end">
        {height.map((item, index) => (
          <div
            key={index}
            style={{
              height: item,
              background:
                index == clicked ? props.activeColor : props.inactiveColor,
            }}
            className="w-2 rounded-sm hover:mb-0.5"
            onClick={() => setClickedIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRankItem;
