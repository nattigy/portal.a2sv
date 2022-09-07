import React, { useState, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddStudentListItem, { StudentsInfo } from "./AddStudentListItem";
import { UserRoleType } from "../../types/user";
import { useGetUsersWithNoGroup, useUsersByGroupId } from "../../lib/hooks/useUsers";
import { LoaderSmall } from "../common/Loaders";
import SearchField from "../common/SearchField";

export type UserProps = {
  id?: number;
  fullname: string;
};

const AddStudentList = () => {
  // const students: Array<StudentsInfo> = [
  //   {
  //     id: 1,
  //     name: "Yidedya Kebede",
  //     photo: "/images/group-students-profile.svg",
  //     role: UserRoleType.STUDENT,
  //   },
  //   {
  //     id: 2,
  //     name: "Yidedya Kebede",
  //     photo: "/images/group-students-profile.svg",
  //     role: UserRoleType.STUDENT,
  //   },
  //   {
  //     id: 3,
  //     name: "Yidedya Kebede",
  //     photo: "/images/group-students-profile.svg",
  //     role: UserRoleType.STUDENT,
  //   },
  //   {
  //     id: 4,
  //     name: "Yidedya Kebede",
  //     photo: "/images/group-students-profile.svg",
  //     role: UserRoleType.HOE,
  //   },
  //   {
  //     id: 5,
  //     name: "Yidedya Kebede",
  //     photo: "/images/group-students-profile.svg",
  //     role: UserRoleType.HOA,
  //   },
  // ];

  const { data, loading, error, refetch } = useGetUsersWithNoGroup()
  const [students, setStudents] = useState<Array<StudentsInfo>>([])
  const [searchStudents, setSearchStudents] = useState<Array<StudentsInfo>>([])
  const [searchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    if (data) {
      setSearchStudents(data.users)
      setStudents(data.users)
    }
  }, [refetch])


  const [checkedState, setCheckedState] = useState(
    new Array(students.length).fill(false)
  );

  const countChecked = () => {
    var counter = 0;
    for (var i = 0; i < students.length; i++) {
      if (checkedState[i] === true) {
        counter++;
      }
    }
    return counter
  };

  useEffect(() => {

  }, [checkedState])

  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text)
  }

  let selectedStudent: Set<string> = new Set<string>();

  const handleStudentCheck = (id: string, type = "add") => {
    if (type === "add") {
      selectedStudent.add(id)
    } else {
      selectedStudent.delete(id)
    }
  }

  useEffect(() => {
    let searchedData = students
    if (searchQuery) {
      searchedData = students.filter(student => {
        return student.email.toLowerCase().includes(searchQuery.trim().toLowerCase())
      })
    }
    setSearchStudents(searchedData)

  }, [searchQuery])


  const handleSingleCheck = (position: any) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    console.log("checked", checkedState)
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Add Students <span className="font-light text-xs pl-1">{`${countChecked()}`}/{`${students.length}`}</span></h1>
        <button className="w-20 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm">
          Add
        </button>
      </div>
      <div className="w-full">
        <SearchField onChange={handleSearchQueryChange} placeholder="Search student" id="" className="" />
      </div>
      {
        loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) :
          searchStudents ? (
            searchStudents.map((student, index) => (
              <div className="hover:bg-[#5956E91F]" key={index}>
                <AddStudentListItem
                  handleChange={() => handleSingleCheck(index)}
                  studentProps={student}
                  handleStudentCheck={handleStudentCheck}
                />
              </div>
            ))
          ) : (
            <div className="h-full bg-red-400">
              <h1>No students yet!</h1>
            </div>
          )}
    </div>
  );
};

export default AddStudentList;
