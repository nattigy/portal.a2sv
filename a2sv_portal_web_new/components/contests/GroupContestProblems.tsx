import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import { DifficultyChips } from "../problems/DifficultyChips";
import clsx from "clsx";
import {
  ContestProblemsInfo,
  ProblemsStat,
} from "../../types/contest";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { useReactiveVar } from "@apollo/client";

type Props = {
  contestProblems: ContestProblemsInfo[];
  problemsStat: ProblemsStat[];
};

const GroupContestProblems = ({ contestProblems, problemsStat }: Props) => {
  const authUser = useReactiveVar(authenticatedUser);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* {isModalOpen && (
        <ContestDetailModal
          userId={(authUser as any).id}
          contestProblemData={selected}
          onClose={() => setIsModalOpen(false)}
        />
      )} */}
      <div className="w-full flex flex-col justify-between bg-white rounded-md overflow-x-auto">
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
                    <div className="text-[#979797]">Solved By</div>
                  </th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {contestProblems ? (
                  contestProblems?.map(
                    (contestProblem: ContestProblemsInfo, index: number) => {
                      return (
                        <tr
                          className={clsx(
                            "text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]",
                            index % 2 == 0 ? "bg-[#5956E914]" : "bg-white"
                          )}
                          key={index}
                        >
                          <td
                            scope="row"
                            className="py-4 px-6 whitespace-nowrap "
                          >
                            <h2>{contestProblem.title}</h2>
                            {/* <CustomLink href="">{problem.name}</CustomLink> */}
                          </td>
                          <td className="py-4 px-6">
                            <DifficultyChips
                              status={contestProblem.difficulty}
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="w-16 flex justify-center">
                              <div className="flex items-center text-primary gap-x-1">
                                <FaUserAlt />
                                <ProblemSolverCount
                                  contestProblemId={contestProblem.id}
                                  problemsStat={problemsStat}
                                />
                                {/* {JSON.stringify(problemsStat)} */}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <h5>Problems Not Found</h5>
                  // <h5>{JSON.stringify(contestProblems)}</h5>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupContestProblems;

const ProblemSolverCount = ({
  contestProblemId,
  problemsStat,
}: {
  contestProblemId: string;
  problemsStat: ProblemsStat[];
}) => {
  const filteredProblem: ProblemsStat[] = problemsStat?.filter(
    (singleProblemStat: ProblemsStat) => {
      return singleProblemStat.problemId === contestProblemId;
    }
  );

  return filteredProblem.length > 0 ? (
    <span className="text-sm">x{filteredProblem[0].numberOfStudents}</span>
  ) : (
    <span className="text-sm">x0</span>
  );
};
