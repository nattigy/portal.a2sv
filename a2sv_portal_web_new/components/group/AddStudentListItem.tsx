import React, { ChangeEventHandler } from "react";
import CustomLink from "../common/CustomLink";
import { BsThreeDotsVertical } from "react-icons/bs";
import { UserRoleType } from "../../types/user";
import clsx from "clsx";

export type UserProps = {
  id?: number;
  fullname: string;
};

type Props = {
  studentProps: StudentsInfo;
  checked: boolean;
  handleStudentCheck: () => void,
  handleChange: any;
};

export type StudentsInfo = {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: UserRoleType;
};

const AddStudentListItem = ({
  studentProps,
  handleStudentCheck,
  handleChange,
}: Props) => {
  return (
    <div onClick={handleChange} className={clsx(
      "flex gap-x-4 py-2 cursor-pointer",
      // ? "bg-[#5956E91F]"
      // : ""
    )}>
      <input
        className="w-4 rounded-md border-2 text-red-400"
        // onChange={(val) => handleStudentCheck(val, "add")}
        value={studentProps.id}
        type="checkbox"
      />
      <div className="flex items-center gap-x-2">
        <img src="/images/group-students-profile.svg" className="w-12" alt="" />
        <div className="flex flex-col justify-around">
          <span className="font-semibold text-sm truncate w-40">{studentProps.email}</span>
          <span className="font-light text-xs">{studentProps.role}</span>
        </div>
      </div>
    </div>
  );
};

export default AddStudentListItem;
