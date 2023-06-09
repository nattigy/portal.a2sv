import React, { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { getNationality } from "../../helpers/getNationalityFlag";
import { format } from "date-fns";

export type StudentsInfo = {
  id: number;
  email: string;
  userProfile: {
    firstName: string;
    lastName: string;
    photoUrl: string;
  },
  group: {
    country: string;
  }
  createdAt: string;
};

type Props = {
  students: Array<StudentsInfo>;
  selectedStudentsId: Set<string>,
  setSelectedStudentsId: React.Dispatch<React.SetStateAction<Set<string>>>
};

const StudentTable = (props: Props) => {
  const [checkedAll, setCheckedAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([])
  const allStudents = props.students.map(st => st.id.toString())
  const [checkedState, setCheckedState] = useState(
    new Array(props.students.length).fill(false)
  );

  const handleSingleCheck = (studentId: any) => {
    if (props.selectedStudentsId.has(studentId)) {
      props.selectedStudentsId.delete(studentId)
      props.setSelectedStudentsId(new Set([...props.selectedStudentsId].filter(st => st != studentId)))
    } else {
      props.setSelectedStudentsId(new Set([...props.selectedStudentsId, studentId]))
    }
    if (checkedAll && props.selectedStudentsId.size !== allStudents.length) setCheckedAll(false)
  };

  const handleAllCheck = () => {
    if (checkedAll) {
      props.setSelectedStudentsId(new Set())
    } else {
      props.setSelectedStudentsId(new Set(props.students.map(st => st.id.toString())))
    }
    setCheckedAll(prev => !prev)
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
                <div className="text-[#979797]">Country</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="flex flex-row gap-x-1">
                  <div className="text-[#979797]">Rank</div>
                  <div className="flex flex-row">
                    <FaLongArrowAltUp className="-mr-2 pr-1" />
                    <FaLongArrowAltDown />
                  </div>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Date Joined</div>
              </th>
              <th scope="col" className="py-3 px-6">
                <div className="text-[#979797]">Details</div>
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
                          checked={props.selectedStudentsId.has(student.id.toString())}
                          onChange={() => handleSingleCheck(student.id.toString())}
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
                    <td scope="row" className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-row items-center gap-x-2">
                        <img
                          className="w-7"
                          src={
                            // student.userProfile?.photoUrl
                            //   ? student.userProfile?.photoUrl
                              // : "/images/group-students-profile.svg"
                              "/images/group-students-profile.svg"
                          }
                          alt=""
                        />
                        <h1>
                          {student.userProfile ? student.userProfile.firstName + " " + student.userProfile.lastName : student.email}
                        </h1>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="pl-8">
                        {student.group?.country ? (
                          <img
                            src={getNationality(student.group.country)}
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
                    <td className="py-4 px-6">
                      <div className="flex flex-row gap-x-2">
                        1
                      </div>
                    </td>
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
                        View Stats
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
