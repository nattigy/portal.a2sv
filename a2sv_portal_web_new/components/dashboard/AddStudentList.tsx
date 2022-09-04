import React, { useState, useEffect } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddStudentListItem, { StudentsInfo } from "./AddStudentListItem";
import { UserRoleType } from "../../types/user";

export type UserProps = {
  id?: number;
  fullname: string;
};

const AddStudentList = () => {
  const students: Array<StudentsInfo> = [
    {
      id: 1,
      name: "Yidedya Kebede",
      photo: "/images/group-students-profile.svg",
      role: UserRoleType.STUDENT,
    },
    {
      id: 2,
      name: "Yidedya Kebede",
      photo: "/images/group-students-profile.svg",
      role: UserRoleType.STUDENT,
    },
    {
      id: 3,
      name: "Yidedya Kebede",
      photo: "/images/group-students-profile.svg",
      role: UserRoleType.STUDENT,
    },
    {
      id: 4,
      name: "Yidedya Kebede",
      photo: "/images/group-students-profile.svg",
      role: UserRoleType.HOE,
    },
    {
      id: 5,
      name: "Yidedya Kebede",
      photo: "/images/group-students-profile.svg",
      role: UserRoleType.HOA,
    },
  ];

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

  useEffect(()=>{

  }, [checkedState])

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
      <div className="w-full p-2 mt-2 border rounded-md">
        <h1>Search</h1>
      </div>
      {students ? (
        students.map((student, index) => (
          <div className="hover:bg-[#5956E91F]" key={index}>
            <AddStudentListItem
              handleChange={() => handleSingleCheck(index)}
              studentProps={student}
              checked={checkedState[index]}
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
