import React, { useState } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserRoleType } from "../../types/user";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { getIcon } from "../../helpers/getReactIcon";
import { ProblemDifficultyType, ProblemStatus } from "../../types/problems";
import { DifficultyChips } from "../problems/DifficultyChips";
import clsx from "clsx";
import ContestDetailModal from "../modals/ContestDetailModal";

export type ProblemSolvedProps = {};

export type ContestProblemsInfo = {
  id: number;
  name: string;
  difficulty: ProblemDifficultyType;
  status: ProblemStatus;
  time?: number;
  tried: number;
};

type Props = {
  problemSolvedProps: ProblemSolvedProps;
};

const SingleContestProblems = (props: Props) => {
  const problems: Array<ContestProblemsInfo> = [
    {
      id: 1,
      name: "Min Cost Climbing Stairs",
      difficulty: ProblemDifficultyType.EASY,
      status: ProblemStatus.SOLVED,
      time: 23,
      tried: 2,
    },
    {
      id: 2,
      name: "Min Cost Falling Stairs",
      difficulty: ProblemDifficultyType.MEDIUM,
      status: ProblemStatus.SOLVED,
      time: 35,
      tried: 2,
    },
    {
      id: 3,
      name: "Min Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      status: ProblemStatus.SOLVED,
      time: 42,
      tried: 2,
    },
    {
      id: 4,
      name: "Max Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      status: ProblemStatus.SOLVED,
      tried: 2,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <ContestDetailModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className="w-full flex flex-col justify-between bg-white rounded-md overflow-x-auto">
        <div className="flex justify-between">
          <h1 className="font-semibold px-6 py-4 my-2">Contest Stat</h1>
        </div>
        <div className="flex flex-row">
          <div className="w-full relative bg-white sm:rounded-lg py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#979797] bg-white px-2">
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
                  <th scope="col" className="py-3 px-6">
                    <div className="text-[#979797]"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {problems ? (
                  problems.map(
                    (problem: ContestProblemsInfo, index: number) => {
                      return (
                        <tr
                          className={clsx(
                            "text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]",
                            index % 2 == 0 ? "bg-[#5956E914]" : "bg-white"
                          )}
                          key={problem.id}
                        >
                          <td
                            scope="row"
                            className="py-4 px-6 whitespace-nowrap "
                          >
                            <CustomLink href="#">{problem.name}</CustomLink>
                          </td>
                          <td className="py-4 px-6">
                            <DifficultyChips status={problem.difficulty} />
                          </td>
                          <td className="py-4 px-6">{problem.status}</td>
                          <td className="py-4 px-6">
                            {problem.time ? problem.time : "-||-"}
                          </td>
                          <td className="py-4 px-6">{problem.tried}</td>

                          <td className="py-4 px-6">
                            <a
                              href="#"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              <div className="pl-4">
                                <MdContentPaste onClick={handleModalOpen} />
                              </div>
                            </a>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <h5>Problems Not Found</h5>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleContestProblems;
