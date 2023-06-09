import React, { ChangeEventHandler } from "react";
import { UserRoleType } from "../../types/user";
import clsx from "clsx";

export type UserProps = {
  id?: number;
  fullname: string;
};

type Props = {
  studentProps: StudentsInfo;
  handleStudentCheck: (id: number) => void;
};

export type StudentsInfo = {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: UserRoleType;
};

const AddStudentListItem = ({ studentProps, handleStudentCheck }: Props) => {
  return (
    <div className={clsx("flex gap-x-4 py-2 cursor-pointer")}>
      <input
        id={studentProps.id.toString()}
        className="w-4 rounded-md border-2 text-red-400"
        onChange={() => handleStudentCheck(studentProps.id)}
        value={studentProps.id}
        type="checkbox"
      />
      <label
        className="w-full cursor-pointer"
        htmlFor={studentProps.id.toString()}
      >
        <div className="flex items-center gap-x-2">
          <img
            src="/images/group-students-profile.svg"
            className="w-12"
            alt=""
          />
          <div className="flex flex-col justify-around">
            <span className="w-32 font-semibold text-xs truncate">
              {studentProps.email}
            </span>
            <span className="font-light text-xs">{studentProps.role}</span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default AddStudentListItem;
