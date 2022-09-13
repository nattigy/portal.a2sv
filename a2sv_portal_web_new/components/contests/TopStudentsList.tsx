import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { ContestInfo } from "../dashboard/ContestRating";

type Props = {
  contestStatus: Array<ContestInfo>;
};

const TopStudentsList = ({ contestStatus }: Props) => {
  return (
    <div className="w-full overflow-x-auto relative bg-white sm:rounded-lg">
      <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <thead className="text-[#979797] bg-white ">
          <tr>
            <th scope="col" className="py-3 px-3">
              <div className="flex flex-row"></div>
            </th>
            <th scope="col" className="p-3">
              <div className="flex flex-row gap-x-1">
                <div className="text-[#979797] font-semibold">Name</div>
              </div>
            </th>
            <th scope="col" className="p-3">
              <div className="flex flex-row gap-x-1">
                <div className="text-[#979797] font-semibold">Solved</div>
              </div>
            </th>
            <th scope="col" className="p-3">
              <div className="text-[#979797]"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {contestStatus ? (
            contestStatus.map(
              (contestRatingInfo: ContestInfo, index: number) => {
                return (
                  <tr
                    className="bg-white text-[#565656] font-semibold text-xs hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                    key={index}
                  >
                    <td scope="row" className="whitespace-nowrap py-2 ">
                      <img
                        src={contestRatingInfo.photo}
                        className="w-8"
                        alt=""
                      />
                    </td>
                    <td scope="row" className="p-3 whitespace-nowrap ">
                      <div>{contestRatingInfo.name}</div>
                    </td>
                    <td scope="row" className="p-3 whitespace-nowrap ">
                      <div>
                        {contestRatingInfo.solved}/{contestRatingInfo.total}
                      </div>
                    </td>
                    <td className="p-3">
                      {contestRatingInfo.currentRank >
                        contestRatingInfo.previousRank && (
                        <div className="bg-[#F5F5F5]">
                          <BiDownArrowAlt size={12} color="#FC3903" />
                        </div>
                      )}
                      {contestRatingInfo.currentRank <
                        contestRatingInfo.previousRank && (
                        <div className="bg-[#F5F5F5]">
                          <BiUpArrowAlt size={12} color="#00C853" />
                        </div>
                      )}
                      {contestRatingInfo.currentRank ===
                        contestRatingInfo.previousRank && (
                        <div className="bg-[#F5F5F5]">
                          <AiOutlineMinus size={12} color="#595959" />
                        </div>
                      )}
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

export default TopStudentsList;
