import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import problems from "../../pages/problems";
import { ProblemsInfo } from "../../types/problems";
import { DifficultyChips } from "../problems/DifficultyChips";

export type HOEAcceptanceInfo = {
  id: number;
  name: string;
  photo: string;
  acceptance: number;
  currentRank: number;
  previousRank: number;
};

type Props = {
  acceptanceInfo: HOEAcceptanceInfo[];
};

const HOEAcceptanceRate = ({ acceptanceInfo }: Props) => {
  return (
    <div>
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 w-full ">
        <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
          <h1>Top Students (Acceptance Rate)</h1>
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
                  <div className="text-[#979797]">Acceptance Rate</div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {acceptanceInfo ? (
              acceptanceInfo.map(
                (userAcceptanceInfo: HOEAcceptanceInfo, index: number) => {
                  return (
                    <tr
                      className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                      key={index}
                    >
                      <td scope="row" className="py-2 px-2 whitespace-nowrap ">
                        <img
                          src={userAcceptanceInfo.photo}
                          className="w-10"
                          alt=""
                        />
                      </td>
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <div>{userAcceptanceInfo.name}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-x-1">
                          <div className="rounded-md bg-[#DEDEDE] w-full h-1">
                            <div
                              style={{
                                width: `${userAcceptanceInfo.acceptance}%`,
                              }}
                              className="rounded-md bg-[#8A70D6] h-1 px-2"
                            ></div>
                          </div>
                          <h1>{userAcceptanceInfo.acceptance}%</h1>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {userAcceptanceInfo.currentRank >
                          userAcceptanceInfo.previousRank && (
                          <div className="bg-[#F5F5F5]">
                            <BiDownArrowAlt size={24} color="#FC3903" />
                          </div>
                        )}
                        {userAcceptanceInfo.currentRank <
                          userAcceptanceInfo.previousRank && (
                          <div className="bg-[#F5F5F5]">
                            <BiUpArrowAlt size={24} color="#00C853" />
                          </div>
                        )}
                        {userAcceptanceInfo.currentRank ===
                          userAcceptanceInfo.previousRank && (
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

export default HOEAcceptanceRate;
function handleAllCheck(): void {
  throw new Error("Function not implemented.");
}

function handleSingleCheck(index: number): void {
  throw new Error("Function not implemented.");
}

function getIcon(arg0: any): React.ReactNode {
  throw new Error("Function not implemented.");
}
