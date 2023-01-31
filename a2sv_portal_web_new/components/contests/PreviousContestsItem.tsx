import { useReactiveVar } from "@apollo/client";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { number } from "yup/lib/locale";
import { authenticatedUser } from "../../lib/constants/authenticated";
import WithPermission from "../../lib/Guard/WithPermission";
import {
  useGetAllContestsForStudent,
  useGetAllGroupContests,
} from "../../lib/hooks/useAllContests";
import {
  ContestDetail,
  ContestStatus,
  GroupContestDetail,
} from "../../types/contest";
import { GraphqlUserRole } from "../../types/user";
import CustomLink from "../common/CustomLink";
import { AttendedChips } from "./AttendedChips";

type Props = {
  items: Array<ContestDetail>;
};

const PreviousContestsItem = () => {
  const authUser = useReactiveVar(authenticatedUser);
  const [loadStudentContests, { loading, data, error, refetch }] =
    useGetAllContestsForStudent((authUser as any).id);
  const [
    loadGroupContests,
    {
      loading: groupLoading,
      data: groupData,
      error: groupError,
      refetch: groupRefetch,
    },
  ] = useGetAllGroupContests((authUser as any).groupId);

  const [userContests, setUserContests] = useState([]);
  const [groupContests, setGroupContests] = useState([]);

  useEffect(() => {
    if ((authUser as any).role === GraphqlUserRole.STUDENT) {
      loadStudentContests();
    } else {
      loadGroupContests();
    }
  }, [authUser, groupRefetch, loadGroupContests, loadStudentContests, refetch]);

  useEffect(() => {
    if (data) {
      const fetchedContests = data.userContests.items.map((item: any) => {
        return {
          ...item,
          totalProblems: item.userContestProblems.length,
        };
      });
      setUserContests(fetchedContests);
    }
    if (groupData) {
      const fetchedContests = groupData.groupContests.items.map((item: any) => {
        return {
          ...item,
          totalProblems: item.contest.problems.length,
        };
      });
      setGroupContests(fetchedContests);
    }
  }, [data, groupData]);

  return (
    <div className="flex flex-col">
      <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
        <h2 className="font-semibold text-md">Previous Contests</h2>
      </div>
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border">
        <WithPermission
          allowedRoles={[
            GraphqlUserRole.HEAD_OF_EDUCATION,
            GraphqlUserRole.HEAD_OF_ACADEMY,
          ]}
        >
          <table className="w-full text-sm text-left font-semibold text-gray-500 dark:text-gray-400 pl-2">
            <thead className="text-xs text-[#979797] bg-white h-16 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Title</div>
                    {/* <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div> */}
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Division</div>
                    {/* <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div> */}
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Questions</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Date</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Attended</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {groupContests ? (
                groupContests.map(
                  (groupContest: GroupContestDetail, index: number) => {
                    return (
                      <Link
                        href={`contests/${groupContest.contest.id}`}
                        key={index}
                      >
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
                            {groupContest.contest.name}
                          </td>
                          <td className="py-4 px-6">
                            <div className="bg-[#F2F1FD] w-fit p-1 px-2 rounded-md">
                              <h2 className="text-[#5956E9]">{`Div ${groupContest.contest.div}`}</h2>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {`${groupContest.totalProblems}`}
                          </td>
                          <td className="py-4 px-6">
                            {format(
                              new Date(groupContest.contest.startTime),
                              "MMM dd, yyyy"
                            )}
                          </td>
                          <td className="py-4 px-6">
                            {groupContest.contestAttendance}
                          </td>
                        </tr>
                      </Link>
                    );
                  }
                )
              ) : (
                <h5>Contests Not Found</h5>
              )}
            </tbody>
          </table>
        </WithPermission>
        <WithPermission allowedRoles={[GraphqlUserRole.STUDENT]}>
          <table className="w-full text-sm text-left font-semibold text-gray-500 dark:text-gray-400 pl-2">
            <thead className="text-xs text-[#979797] bg-white h-16 ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Title</div>
                    {/* <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div> */}
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Division</div>
                    {/* <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div> */}
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Solved</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Date</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Attended</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Time Spent</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {userContests ? (
                userContests.map(
                  (userContest: ContestDetail, index: number) => {
                    return (
                      <CustomLink
                        href={`contests/${userContest.contest.id}`}
                        key={index}
                      >
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
                            {userContest.contest.name}
                          </td>
                          <td className="py-4 px-6">
                            <div className="bg-[#F2F1FD] w-fit p-1 px-2 rounded-md">
                              <h2 className="text-[#5956E9]">{`Div ${userContest.contest.div}`}</h2>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            {`${userContest.problemsSolved}/${userContest.totalProblems}`}
                          </td>
                          <td className="py-4 px-6">
                            {format(
                              new Date(userContest.contest.startTime),
                              "MMM dd, yyyy"
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <AttendedChips
                              status={userContest.contestAttended}
                            />
                          </td>
                          <td className="py-4 px-6">{userContest.timeSpent}</td>
                        </tr>
                      </CustomLink>
                    );
                  }
                )
              ) : (
                <h5>Contests Not Found</h5>
              )}
            </tbody>
          </table>
        </WithPermission>
      </div>
    </div>
  );
};

export default PreviousContestsItem;
