import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomConsistencyChart from "../consistency/CustomConsistencyChart";

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
      ></div>
    );
  }
  return (
    <div className="no-scrollbar w-full h-full flex flex-row-reverse flex-col  justify-between bg-white rounded-md p-6">
      <div className="flex flex-col">
        <h1 className="font-semibold">Consistency Chart</h1>
        <div className="flex justify-end py-2">
          {/* <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">2022</h1>
            <FaChevronRight />
          </div> */}
          {/* <div className="flex items-center gap-x-2">
            <FaChevronLeft />
            <h1 className="font-semibold text-sm text-[#787878]">May</h1>
            <FaChevronRight />
          </div> */}
          <div className="flex flex-col justify-end items-end">
            <div className="flex items-center gap-x-2 ">
              <div className="text-sm  w-3 h-3 relative flex flex-col bg-primary rounded-sm items-center group"></div>
              <p className="text-xs">Total Submissions</p>
            </div>
            <p className="text-2xl font-semibold">1882</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-3 items-end no-scrollbar">
        {/* <ConsistencyDiagramItem /> */}
        <CustomConsistencyChart />
      </div>
    </div>
  );
};

export default ConsistencyDiagramItem;
