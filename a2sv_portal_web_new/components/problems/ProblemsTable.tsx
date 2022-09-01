import React, { ReactNode, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { DifficultyChips } from "./DifficultyChips";
import { getIcon } from "../../helpers/getReactIcon";
import {
  ProblemsInfo,
  ProblemDifficultyType,
  ProblemStatus,
} from "../../types/problems";
import CustomLink from "../common/CustomLink";
import ProblemModalDetail from '../../components/modals/ProblemDetailModal'

export type PlatformInfo = {
  id: string;
  name: string;
};

const ProblemsTable = () => {
  const problems: Array<ProblemsInfo> = [
    {
      id: 1,
      name: "Min Cost Climbing Stairs",
      difficulty: ProblemDifficultyType.EASY,
      platform: {
        id: "leetcode",
        name: "Leetcode",
      },
      status: ProblemStatus.SOLVED,
    },
    {
      id: 2,
      name: "Min Cost Falling Stairs",
      difficulty: ProblemDifficultyType.MEDIUM,
      platform: {
        id: "hackerrank",
        name: "Hackerrank",
      },
      status: ProblemStatus.SOLVED,
    },
    {
      id: 3,
      name: "Min Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      platform: {
        id: "codeforces",
        name: "Codeforces",
      },
      status: ProblemStatus.SOLVED,
    },
    {
      id: 4,
      name: "Max Cost Tripping Stairs",
      difficulty: ProblemDifficultyType.HARD,
      platform: {
        id: "geeksforgeeks",
        name: "GeeksForGeeks",
      },
      status: ProblemStatus.SOLVED,
    },
  ];

  // const [titleAscending, setTitleAscending] = useState(false)
  // const [titleDescending, setTitleDescending] = useState(false)
  // const [difficultyAscending, setDifficultyAscending] = useState(false)
  // const [difficultyDescending, setDifficultyDescending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(problems.length).fill(false)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSingleCheck = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const handleAllCheck = () => {
    const updatedCheckedState = checkedState.map((item, index) =>
      checkedAll ? (item ? !item : item) : item ? item : !item
    );

    setCheckedState(updatedCheckedState);
    setCheckedAll(!checkedAll);
  };

  return (
    <>
      {isModalOpen && (
        <ProblemModalDetail onClose={() => setIsModalOpen(false)} />
      )}
      <div className="h-screen font-semibold text-[#565656]">
        <div className="flex flex-row items-center justify-between my-6 font-semibold text-xl text-[#565656]">
          <h1>Dynamic Programming</h1>
          <div className="p-2 pl-2">
            <label htmlFor="table-search" className="sr-only">
              Search a problem
            </label>
            <div className="relative flex items-center mt-1">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-white text-gray-400 font-medium text-sm rounded-full px-2  appearance-none  dark:appearance-none focus:ring-0 focus:border-none dark:border-transparent border-transparent block w-80 pl-10 p-2.5  dark:bg-white  dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-0 dark:focus:border-none"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search a problem"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
          <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
            <h2>Problem Set</h2>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-[#979797] bg-white ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      checked={checkedAll}
                      onChange={() => handleAllCheck()}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-white rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
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
                  <div className="text-[#979797]">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {problems ? (
                problems.map((problem: ProblemsInfo, index: number) => {
                  return (
                    <tr
                      className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                      key={problem.id}
                    >
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            name={`prob-${problem.id}`}
                            checked={checkedState[index]}
                            onChange={() => handleSingleCheck(index)}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td scope="row" className="py-4 px-6 whitespace-nowrap ">
                        <CustomLink href="#">{problem.name}</CustomLink>
                      </td>
                      <td className="py-4 px-6">
                        <DifficultyChips status={problem.difficulty} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-row gap-x-2">
                          {getIcon(problem.platform.name)}
                          {problem.platform.name}
                        </div>
                      </td>
                      <td className="py-4 px-6">{problem.status}</td>
                      <td className="py-4 px-6">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <div className="pl-4">
                            <MdContentPaste onClick={handleModalOpen} />
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h5>Problems Not Found</h5>
              )}
            </tbody>
          </table>
          {/* <nav
        className="flex justify-between items-center pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              href="#"
              className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              ...
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              100
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav> */}
        </div>
      </div>
    </>
  );
};
export default ProblemsTable;
