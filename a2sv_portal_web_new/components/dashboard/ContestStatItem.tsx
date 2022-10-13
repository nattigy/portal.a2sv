import React from "react";
import CustomLink from "../common/CustomLink";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { ProblemDifficultyType, ProblemStatus } from "../../types/problems";
import { DifficultyChips } from "../problems/DifficultyChips";

export type ProblemSolvedProps = {};

export type ContestProblemsInfo = {
  id: number;
  name: string;
  difficulty: ProblemDifficultyType;
  status: ProblemStatus;
  time?: number;
};

type Props = {
  problemSolvedProps: ProblemSolvedProps;
};

const ContestStatItem = () => {
  const problems: Array<ContestProblemsInfo> = [
    {
      id: 1,
      name: "Min Cost Climbing Stairs",
      difficulty: ProblemDifficultyType.EASY,
      status: ProblemStatus.SOLVED,
      time: 23,
    },
    {
      id: 2,
      name: "Min Cost Falling Stairs",
      difficulty: ProblemDifficultyType.MEDIUM,
      status: ProblemStatus.SOLVED,
      time: 35,
    },
    {
      id: 3,
      name: "Min Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      status: ProblemStatus.SOLVED,
      time: 42,
    },
    {
      id: 4,
      name: "Max Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      status: ProblemStatus.SOLVED,
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between bg-white rounded-md p-6">
      <div className="flex justify-between">
        <h1 className="font-semibold">Contest Stat</h1>
        <div className="flex">
          <div className="flex items-center gap-x-2">
            <FaChevronLeft color="#787878" />
            <h1 className="font-semibold text-sm text-[#787878]">2022</h1>
            <FaChevronRight color="#787878" />
          </div>
          <div className="flex items-center gap-x-2">
            <FaChevronLeft color="#787878" />
            <h1 className="font-semibold text-sm text-[#787878]">May</h1>
            <FaChevronRight color="#787878" />
          </div>
          <div className="flex items-center gap-x-2">
            <FaChevronLeft color="#787878" />
            <h1 className="font-semibold text-sm text-[#787878]">Contest 1</h1>
            <FaChevronRight color="#787878" />
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-full relative bg-white sm:rounded-lg p-4 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#979797] bg-white ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Title</div>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Difficulty</div>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Status</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Time</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Tried</div>
                </th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {problems ? (
                problems.map((problem: ContestProblemsInfo, index: number) => {
                  return (
                    <tr
                      className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                      key={problem.id}
                    >
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <CustomLink href="#">{problem.name}</CustomLink>
                      </td>
                      <td className="py-4 px-6">
                        <DifficultyChips status={problem.difficulty} />
                      </td>
                      <td className="py-4 px-6">{problem.status}</td>
                      <td className="py-4 px-6">
                        {problem.time ? problem.time : "-||-"}
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <div className="pl-4">
                            {/* <MdContentPaste onClick={handleModalOpen} /> */}
                            <MdContentPaste />
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h5>Problems Not Found</h5>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestStatItem;
