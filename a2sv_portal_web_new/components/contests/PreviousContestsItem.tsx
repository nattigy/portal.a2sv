import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import WithPermission from "../../lib/Guard/WithPermission";
import { GraphqlUserRole } from "../../types/user";
import { AttendedChips } from "./AttendedChips";

export type ContestDetail = {
  contestId: string;
  contestAttended: boolean;
  problemsSolved: number;
  timeSpent: number;
  contest: {
    id: string;
    name: string;
    link: string;
    div: number;
    startTime: string;
    endTime: string;
  };
  totalProblems: number;
};

type Props = {
  items: Array<ContestDetail>;
};

const PreviousContestsItem = ({ items }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
        <h2 className="font-semibold text-lg">Previous Contests</h2>
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
              {items ? (
                items.map((item: ContestDetail, index: number) => {
                  return (
                    <Link href={""} key={index}>
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
                          {item.contest.name}
                        </td>
                        <td className="py-4 px-6">
                          <div className="bg-[#F2F1FD] w-fit p-1 px-2 rounded-md">
                            <h2 className="text-[#5956E9]">{`Div ${item.contest.div}`}</h2>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {`${item.problemsSolved}/${item.totalProblems}`}
                        </td>
                        <td className="py-4 px-6">
                          {format(
                            new Date(item.contest.startTime),
                            "MMM dd, yyyy"
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <AttendedChips status={item.contestAttended} />
                        </td>
                      </tr>
                    </Link>
                  );
                })
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
              {items ? (
                items.map((item: ContestDetail, index: number) => {
                  return (
                    <tr
                      className={clsx(
                        "text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]",
                        index % 2 == 0 ? "bg-[#5956E914]" : "bg-white"
                      )}
                      key={index}
                    >
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        {item.contest.name}
                      </td>
                      <td className="py-4 px-6">
                        <div className="bg-[#F2F1FD] w-fit p-1 px-2 rounded-md">
                          <h2 className="text-[#5956E9]">{`Div ${item.contest.div}`}</h2>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {`${item.problemsSolved}/${item.totalProblems}`}
                      </td>
                      <td className="py-4 px-6">
                        {format(
                          new Date(item.contest.startTime),
                          "MMM dd, yyyy"
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <AttendedChips status={item.contestAttended} />
                      </td>
                      <td className="py-4 px-6">{item.timeSpent}</td>
                    </tr>
                  );
                })
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
