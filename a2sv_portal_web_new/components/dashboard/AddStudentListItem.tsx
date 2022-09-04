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
  handleChange: any;
};

export type StudentsInfo = {
  id: number;
  name: string;
  photo: string;
  role: UserRoleType;
};

const AddStudentListItem = ({
  studentProps,
  checked,
  handleChange,
}: Props) => {
  return (
    <div onClick={handleChange} className={clsx(
      "flex gap-x-4 py-2 cursor-pointer",
      checked
        ? "bg-[#5956E91F]"
        : ""
    )}>
      <input
        className="w-4 rounded-md border-2 text-red-400"
        checked={checked}
        onChange={handleChange}
        value={studentProps.id}
        type="checkbox"
      />
      <div className="flex items-center gap-x-2">
        <img src={studentProps.photo} className="w-12" alt="" />
        <div className="flex flex-col justify-around">
          <span className="font-semibold text-sm">{studentProps.name}</span>
          <span className="font-light text-xs">{studentProps.role}</span>
        </div>
      </div>
    </div>
  );
};

export default AddStudentListItem;
