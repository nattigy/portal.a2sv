import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { ContestInfo } from "../dashboard/ContestRating";

export type LeaderboardProps = {
  id: number;
  photo: string;
  name: string;
  solved: number;
  total: number;
  time: string;
};

type Props = {
  contestStatus: Array<LeaderboardProps>;
};

const Leaderboard = ({ contestStatus }: Props) => {
  return (
    <div className="w-full overflow-x-auto relative bg-white sm:rounded-lg">
      <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className="text-[#979797] bg-white ">
          <tr>
            <th scope="col" className="p-1">
              <div className="flex flex-row">
                <div className="text-[#979797] font-semibold">No</div>
              </div>
            </th>
            <th scope="col" className="p-3">
              <div className="flex flex-row"></div>
            </th>
            <th scope="col" className="p-1">
              <div className="flex flex-row gap-x-1">
                <div className="text-[#979797] font-semibold">Name</div>
              </div>
            </th>
            <th scope="col" className="p-1">
              <div className="flex flex-row gap-x-1">
                <div className="text-[#979797] font-semibold">Solved</div>
              </div>
            </th>
            <th scope="col" className="p-1">
              <div className="text-[#979797]">Time</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {contestStatus ? (
            contestStatus.map(
              (contestLeaderboard: LeaderboardProps, index: number) => {
                return (
                  <tr
                    className="bg-white text-[#565656] font-semibold text-xs hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                    key={index}
                  >
                    <td scope="row" className="p-1 whitespace-nowrap ">
                      <div>{index + 1}</div>
                    </td>
                    <td scope="row" className="whitespace-nowrap py-2 ">
                      <img
                        src={contestLeaderboard.photo}
                        className="w-8"
                        alt=""
                      />
                    </td>
                    <td scope="row" className="pl-2 whitespace-nowrap ">
                      <div>{contestLeaderboard.name}</div>
                    </td>
                    <td scope="row" className="pl-2 whitespace-nowrap ">
                      <div>
                        {contestLeaderboard.solved}/{contestLeaderboard.total}
                      </div>
                    </td>
                    <td scope="row" className="pl-2 whitespace-nowrap ">
                      <div>{contestLeaderboard.time}</div>
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
  );
};

export default Leaderboard;
