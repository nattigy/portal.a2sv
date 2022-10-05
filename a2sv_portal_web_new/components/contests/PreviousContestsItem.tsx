import clsx from "clsx";
import React from "react";
import { AttendedChips } from "./AttendedChips";

export type ContestDetail = {
  id: number;
  title: string;
  div: number;
  solved: number;
  totalQuestion: number;
  date: string;
  attended: boolean;
  timeSpent: string;
};

type Props = {
  contests: Array<ContestDetail>;
};

const PreviousContestsItem = ({ contests }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
        <h2 className="font-semibold text-lg">Previous Contests</h2>
      </div>
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border">
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
            {contests ? (
              contests.map((contest: ContestDetail, index: number) => {
                return (
                  <tr
                    className={clsx(
                      "text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]",
                      index % 2 == 0 ? "bg-[#5956E914]" : "bg-white"
                    )}
                    key={contest.id}
                  >
                    <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                      {contest.title}
                    </td>
                    <td className="py-4 px-6">
                      <div className="bg-[#F2F1FD] w-fit p-1 px-2 rounded-md">
                        <h2 className="text-[#5956E9]">{`Div ${contest.div}`}</h2>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {`${contest.solved}/${contest.totalQuestion}`}
                    </td>
                    <td className="py-4 px-6">{contest.date}</td>
                    <td className="py-4 px-6">
                      <AttendedChips status={contest.attended} />
                    </td>
                    <td className="py-4 px-6">{contest.timeSpent}</td>
                  </tr>
                );
              })
            ) : (
              <h5>Contests Not Found</h5>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreviousContestsItem;
