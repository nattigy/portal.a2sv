import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type ProblemSolvedProps = {};

type Props = {
  problemSolvedProps: ProblemSolvedProps;
};

const ConsistencyDiagramItem = () => {
  var months = [];
  const height: Array<number> = [
    11, 14, 12, 15, 9, 11, 12, 2, 4, 8, 8, 9, 6, 10, 16, 5, 9, 10, 4, 2, 0, 2,
    4, 2, 0, 7, 5, 3, 4, 2,
  ];
  const maxi = height.reduce((a, b) => Math.max(a, b), -Infinity);
  for (var i = 0; i < 30; i++) {
    months.push(
      <div
        style={{
          height: `${Math.floor((height[i] / maxi) * 100)}px`,
        }}
        className={`w-2 rounded-md flex flex-none bg-[#5956E9]`}
        key={i}
      >
      </div>
    );
  }
  return (
    <div className="no-scrollbar w-1/2 h-56 flex flex-col justify-between bg-white rounded-md p-6">
      <div className="flex justify-between">
        <h1 className="font-semibold">Consistency Diagram</h1>
        <div className="flex">
          <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">2022</h1>
            <FaChevronRight />
          </div>
          <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">May</h1>
            <FaChevronRight />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-3 items-end overflow-x-auto no-scrollbar">
        {months}
      </div>
    </div>
  );
};

export default ConsistencyDiagramItem;
