import React from "react";

export type ProblemSolvedProps = {
  problems: number;
  wrong: number;
  minutes: number;
  easy: number;
  medium: number;
  hard: number;
};

type Props = {
  p: ProblemSolvedProps;
};

const ProblemSolvedItem = ({ p: problemSolvedProps }: Props) => {
  return (
    <div className="w-1/2 h-56 border-red-100 bg-white flex flex-col font-medium justify-between rounded-lg p-6 text-sm">
      <div className="flex w-full">
        <div className="w-3/5 flex flex-col gap-y-1">
          <h1>{problemSolvedProps.problems} Problems Solved</h1>
          <h1>{problemSolvedProps.wrong} Wrong Submissions</h1>
          <h1>{problemSolvedProps.minutes} Minutes Dedicated</h1>
        </div>
        <div className="w-2/5 flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <div className="bg-[#3DAB3DB3] w-4 h-4 rounded-sm"></div>
            <h1>{problemSolvedProps.easy} Problems</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-[#FCBD5EE6] w-4 h-4 rounded-sm"></div>
            <h1>{problemSolvedProps.medium} Problems</h1>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-[#5956E9E6] w-4 h-4 rounded-sm"></div>
            <h1>{problemSolvedProps.hard} Problems</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex gap-x-1 py-2">
          <div
            style={{
              width: `${Math.floor(
                (problemSolvedProps.easy / problemSolvedProps.problems) * 100
              )}%`,
            }}
            className="h-2 bg-[#3DAB3DB3] rounded-md"
          ></div>
          <div
            style={{
              width: `${Math.floor(
                (problemSolvedProps.medium / problemSolvedProps.problems) * 100
              )}%`,
            }}
            className="h-2 bg-[#FCBD5EE6] rounded-md"
          ></div>
          <div
            style={{
              width: `${Math.floor(
                (problemSolvedProps.hard / problemSolvedProps.problems) * 100
              )}%`,
            }}
            className="h-2 bg-[#5956E9E6] rounded-md"
          ></div>
        </div>
        <div className="flex gap-x-6 py-1">
          <div className="flex items-center gap-x-1">
            <div className="bg-[#3DAB3DB3] w-4 h-4"></div>
            <span>Easy</span>
          </div>
          <div className="flex items-center gap-x-1">
            <div className="bg-[#FCBD5EE6] w-4 h-4"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-x-1">
            <div className="bg-[#5956E9E6] w-4 h-4"></div>
            <span>Hard</span>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col p-4">
        <div className="flex justify-between">
          <h1>389 Problems Solved</h1>
          <div className="flex items-center gap-x-2">
            <div className="bg-[#3DAB3DB3] w-4 h-4"></div>
            <h1>124 Problems</h1>
          </div>
        </div>
        <div className="flex justify-between">
          <h1>459 Wrong Submissions</h1>
          <div className="flex items-center gap-x-2">
            <div className="bg-[#FCBD5EE6] w-4 h-4"></div>
            <h1>94 Problems</h1>
          </div>
        </div>
        <div className="flex justify-between">
          <h1>4554 minutes dedicated</h1>
          <div className="flex items-center gap-x-2">
            <div className="bg-[#5956E9E6] w-4 h-4"></div>
            <h1>31 Problems</h1>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProblemSolvedItem;
