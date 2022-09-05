import React, { useState } from "react";

export type PersonalRankItemProps = {
  rankType: string;
  userRank: number;
  totalStudents: number;
};
const height = [24, 30, 34, 29, 24, 28, 22, 23, 22, 24];

const PersonalRankItem = (props: PersonalRankItemProps) => {
  const [clicked, setClickedIndex] = useState(height.length - 1);
  return (
    <div className="bg-white rounded-xl w-64 h-16 flex flex-row p-3 gap-x-3">
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
              background: index == clicked ? "#5956E9" : "#E9E3FE99",
            }}
            className="w-2 rounded-sm bg-[#E9E3FE99]"
            onClick={() => setClickedIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PersonalRankItem;
