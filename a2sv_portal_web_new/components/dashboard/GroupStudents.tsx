import React, { ReactNode, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ProblemModalDetail from "../../components/modals/ProblemDetailModal";
import { getNationality } from "../../helpers/getNationalityFlag";

export type StudentsInfo = {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  residence: string;
  dateJoined: string;
};

const ProblemsTable = () => {
  const students: Array<StudentsInfo> = [
    {
      id: 1,
      name: "Hanna Samuel",
      dateJoined: "Oct 12/2019",
      residence: "Addis Ababa",
      nationality: "Ethiopia",
      photo: "images/group-students-profile.svg",
    },
    {
      id: 2,
      name: "Kaleb Mesfin",
      dateJoined: "Oct 12/2019",
      residence: "Accra",
      nationality: "Ghana",
      photo: "images/group-students-profile.svg",
    },
    {
      id: 3,
      name: "Natnael Awel",
      dateJoined: "Oct 12/2019",
      residence: "Istanbul",
      nationality: "Turkey",
      photo: "images/group-students-profile.svg",
    },
    {
      id: 4,
      name: "Henok Adane",
      dateJoined: "Oct 12/2019",
      residence: "Kigali",
      nationality: "Rwanda",
      photo: "images/group-students-profile.svg",
    },
  ];

  // const [titleAscending, setTitleAscending] = useState(false)
  // const [titleDescending, setTitleDescending] = useState(false)
  // const [difficultyAscending, setDifficultyAscending] = useState(false)
  // const [difficultyDescending, setDifficultyDescending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(students.length).fill(false)
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
          <h1>Group 32</h1>
          {/* <div className="p-2 pl-2">
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
          </div> */}
        </div>
        <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
          <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
            <h2>All Students {`(${students.length})`}</h2>
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
                    <div className="text-[#979797]">Name</div>
                    <div className="flex flex-row">
                      <FaLongArrowAltUp className="-mr-2 pr-1" />
                      <FaLongArrowAltDown />
                    </div>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="flex flex-row gap-x-1">
                    <div className="text-[#979797]">Nationality</div>
                    <div className="flex flex-row">
                      <FaLongArrowAltUp className="-mr-2 pr-1" />
                      <FaLongArrowAltDown />
                    </div>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Residence</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]">Date Joined</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <div className="text-[#979797]"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {students ? (
                students.map((student: StudentsInfo, index: number) => {
                  return (
                    <tr
                      className="bg-white text-[#565656] hover:bg-gray-50 dark:hover:bg-[#E2E2E2]"
                      key={student.id}
                    >
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            name={`prob-${student.id}`}
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
                        <div className="flex flex-row items-center gap-x-2">
                          <img className="w-7" src={student.photo} alt="" />
                          <h1>{student.name}</h1>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="pl-8">
                          <img
                            src={getNationality(student.nationality)}
                            className="w-6 rounded-3xl"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">{student.residence}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-row gap-x-2">
                          {student.dateJoined}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <div className="pl-4">
                            <p>Details</p>
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h5>No Students yet!</h5>
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
