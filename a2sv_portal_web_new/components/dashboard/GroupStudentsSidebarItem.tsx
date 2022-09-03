import React, { ReactNode } from "react";
import clsx from "clsx";
import { MdContentPaste } from "react-icons/md";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import CustomLink from "../common/CustomLink";

export type GroupStudentsSidebarProps = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

type Props = {
  groupStudentSidebarItem: GroupStudentsSidebarProps;
};

const GroupStudentsSidebarItem = ({ groupStudentSidebarItem }: Props) => {
  return (
      <div className="flex flex-row justify-center items-center px-1 gap-1 text-sm hover:bg-[#F6F6FC]">
        <div className="flex flex-none justify-center w-4/12 py-2 items-center rounded-lg">
          <img src={groupStudentSidebarItem.photo} alt="" />
        </div>
        <div className="flex flex-col items-start justify-end w-8/12">
          <p className="font-semibold text-base truncate text-ellipsis">
            {groupStudentSidebarItem.name}
          </p>
          <p className="text-sm font-medium">{groupStudentSidebarItem.role}</p>
        </div>
      </div>
  );
};

export default GroupStudentsSidebarItem;
