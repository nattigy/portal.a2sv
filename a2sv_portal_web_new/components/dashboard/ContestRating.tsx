import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";

export type ContestInfo = {
  id: number;
  name: string;
  photo: string;
  solved: number;
  total: number;
  contestRating: number;
  currentRank: number;
  previousRank: number;
};

type Props = {
  contestInfo: ContestInfo[];
};

const ContestRating = ({ contestInfo }: Props) => {
  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
        <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
          <h1>Top Students (Contest Rating)</h1>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#979797] bg-white ">
            <tr>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1"></div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Name</div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Solved</div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Contest Rating</div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {contestInfo ? (
              contestInfo.map(
                (contestRatingInfo: ContestInfo, index: number) => {
                  return (
                    <tr
                      className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                      key={index}
                    >
                      <td scope="row" className="py-2 px-2 whitespace-nowrap ">
                        <img
                          src={contestRatingInfo.photo}
                          className="w-10"
                          alt=""
                        />
                      </td>
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <div>{contestRatingInfo.name}</div>
                      </td>
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <div>
                          {contestRatingInfo.solved}/{contestRatingInfo.total}
                        </div>
                      </td>
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <h1>{contestRatingInfo.contestRating}</h1>
                      </td>
                      <td className="py-4 px-6">
                        {contestRatingInfo.currentRank >
                          contestRatingInfo.previousRank && (
                          <div className="bg-[#F5F5F5]">
                            <BiDownArrowAlt size={24} color="#FC3903" />
                          </div>
                        )}
                        {contestRatingInfo.currentRank <
                          contestRatingInfo.previousRank && (
                          <div className="bg-[#F5F5F5]">
                            <BiUpArrowAlt size={24} color="#00C853" />
                          </div>
                        )}
                        {contestRatingInfo.currentRank ===
                          contestRatingInfo.previousRank && (
                          <div className="bg-[#F5F5F5]">
                            <AiOutlineMinus size={24} color="#595959" />
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
    </div>
  );
};

export default ContestRating;
