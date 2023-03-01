import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { getIcon } from "../../helpers/getReactIcon";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useGetUserGroupSeasonTopicProblems } from "../../lib/hooks/useProblems";
import { ProblemStatus, UserProblem } from "../../types/problems";
import { LoaderSmall } from "../common/Loaders";
import ProblemStatusModal from "../modals/ProblemStatusModal";
import { DifficultyChips } from "./DifficultyChips";
import { StatusChips } from "./StatusChips";

type Props = {
  seasonId: string;
  topicId: string;
};

const StudentProblemsTable = ({ seasonId, topicId }: Props) => {
  const { id: userId, groupId } = useReactiveVar(authenticatedUser) as AuthUser;
  const { data, loading, error } = useGetUserGroupSeasonTopicProblems(
    userId,
    topicId,
    seasonId,
    groupId
  );
  const [userProblems, setUserProblems] = useState<UserProblem[]>();
  const [openProblemStatusModal, setOpenProblemStatusModal] = useState(false);
  const [idx, setIdx] = useState<number>(0);

  useEffect(() => {
    setUserProblems(data?.userGroupSeasonTopic?.userGroupSeasonTopicProblems);
  }, [data]);

  return (
    <>
      {openProblemStatusModal && (
        <ProblemStatusModal
          onClose={() => setOpenProblemStatusModal(false)}
          errorMessage={error?.message}
          groupId = {groupId}
          topicId = {topicId}
          seasonId = {seasonId}
          userId = {userId}
          userProblem = {userProblems![idx]}
        />
      )}
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
        <div className="flex justify-between mx-3 my-2 font-semibold text-md text-[#565656]">
          <h2>Problem Set</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#979797] bg-white ">
            <tr>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Title</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Difficulty</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Platform</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Status</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Time</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Attempts</div>
              </th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <LoaderSmall />
              </div>
            ) : error ? (
              <p>Something went wrong</p>
            ) : (
              userProblems?.map((userProblem: UserProblem, index: number) => {
                console.log(userProblem)
                return (
                  <tr
                    className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                    key={userProblem.problem.id}
                  >
                    <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                      <a
                        className="text-primary"
                        href={userProblem.problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {userProblem.problem.title}
                      </a>
                    </td>
                    <td className="py-4 px-6">
                      <DifficultyChips
                        status={userProblem.problem.difficulty?.toUpperCase()}
                      />
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center flex-row gap-x-2 capitalize">
                        {getIcon(userProblem.problem.platform?.toUpperCase())}
                        {userProblem.problem.platform?.toLowerCase()}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="w-full">
                        <StatusChips status={userProblem.status} />
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="w-full">
                        {userProblem.numberOfMinutes}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="w-full">
                        {userProblem.numberOfAttempts}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="pl-4">
                        <MdContentPaste
                          color="#5956e9"
                          onClick={() => {
                            setOpenProblemStatusModal(true);
                            setIdx(index);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentProblemsTable;
