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
import {
  ContestDetail,
  ContestProblem,
  ContestProblemsInfo,
} from "../../types/contest";
import { authenticatedUser } from "../../lib/constants/authenticated";
import { useReactiveVar } from "@apollo/client";
import { getStatusColor, StatusChips } from "./StatusChips";

type Props = {
  contestProblems: ContestProblem[];
};

const SingleContestProblems = ({ contestProblems }: Props) => {
  const authUser = useReactiveVar(authenticatedUser);
  const [selected, setSelected] = useState<ContestProblem>(contestProblems[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <ContestDetailModal
          userId={(authUser as any).id}
          contestProblemData={selected}
          onClose={() => setIsModalOpen(false)}
        />
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
                    <div className="text-[#979797]"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {contestProblems ? (
                  contestProblems.map(
                    (contestProblem: ContestProblem, index: number) => {
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
                            <h2>{contestProblem.problem.title}</h2>
                            {/* <CustomLink href="">{problem.name}</CustomLink> */}
                          </td>
                          <td className="py-4 px-6">
                            <DifficultyChips
                              status={contestProblem.problem.difficulty}
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="w-full">
                              <StatusChips status={contestProblem.status} />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {contestProblem.numberOfMinutes
                              ? contestProblem.numberOfMinutes
                              : "-||-"}
                          </td>
                          <td className="py-4 px-6">
                            <a
                              href="#"
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              <div className="pl-4">
                                <MdContentPaste
                                  onClick={() => {
                                    handleModalOpen();
                                    setSelected(contestProblem);
                                  }}
                                />
                              </div>
                            </a>
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

export default SingleContestProblems;
