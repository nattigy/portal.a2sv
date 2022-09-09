import React, { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { getNationality } from "../../helpers/getNationalityFlag";
import { format } from "date-fns";

export type StudentsInfo = {
  id: number;
  name?: string;
  photo?: string;
  email: string;
  nationality?: string;
  country?: string;
  residence?: string;
  dateJoined?: string;
  group: {
    name: string;
    id: number;
    country: string;
  };
  createdAt: string;
};

type Props = {
  students: Array<StudentsInfo>;
};

const StudentTable = (props: Props) => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(props.students.length).fill(false)
  );

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
    <div>
      <div className="overflow-x-auto relative bg-white border-blue-100 shadow-md sm:rounded-lg border p-4 ">
        <div className="mx-3 my-2 font-semibold text-md text-[#565656]">
          <h2>All Students {`(${props.students.length})`}</h2>
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
                  <div className="text-[#979797]">Residence</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              {/* <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Residence</div>
              </th> */}
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Date Joined</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.students ? (
              props.students.map((student: StudentsInfo, index: number) => {
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
                        <h1>{student.email ?? "No Name"}</h1>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="pl-8">
                        {student.group?.country ? (
                          <img
                            src={getNationality("Ethiopia")}
                            className="w-6 rounded-3xl"
                            alt=""
                          />
                        ) : (
                          <img
                            src={getNationality("Ethiopia")}
                            className="w-6 rounded-3xl"
                            alt=""
                          />
                        )}
                      </div>
                    </td>
                    {/* <td className="py-4 px-6">{student.group?.country}</td> */}
                    <td className="py-4 px-6">
                      <div className="flex flex-row gap-x-2">
                        {format(new Date(student.createdAt), "MMM, d, u")}
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
      </div>
    </div>
  );
};

export default StudentTable;
