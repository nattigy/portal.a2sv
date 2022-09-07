import React, { ReactNode } from "react";
import clsx from "clsx";
import { MdContentPaste } from "react-icons/md";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import CustomLink from "../common/CustomLink";
import AddStudentList from "./AddStudentList";

export type GroupStudentsSidebarProps = {
  id: number;
  name: string;
  role: string;
  photo: string;
};

type Props = {
  groupStudentSidebarItem?: GroupStudentsSidebarProps;
  showStudentList?: boolean;
};

const GroupStudentsSidebarItem = ({
  groupStudentSidebarItem,
  showStudentList,
}: Props) => {
  return (
    <div className={clsx("h-full flex flex-col", showStudentList ? "justify-start" : "justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all duration-1000 ease-in-out delay-150 translate-y-80 translate-x-80", showStudentList ? "translate-x-0 translate-y-0 transform-none" : "hidden")}>
        <div className="flex flex-row justify-end items-center px-1 gap-2 text-sm hover:bg-[#F6F6FC]">
          <div className="flex flex-none justify-center w-3/12 py-2 items-center rounded-lg">
            <img src={groupStudentSidebarItem?.photo} alt="" />
          </div>
          <div className="flex flex-col items-start justify-end w-7/12">
            <p className="font-semibold text-lg truncate text-ellipsis">
              {groupStudentSidebarItem?.name}
            </p>
            <p className="text-sm font-medium">
              {groupStudentSidebarItem?.role}
            </p>
          </div>
        </div>
        <AddStudentList />
      </div>
      <div className="flex flex-col">
        <img src="images/group-students.svg" alt="" />
        <p className="text-center text-xs">
          Here‘s the list of all groups Here‘s the list of all groups Here‘s
          the list of all groups.
        </p>
      </div>
    </div>
  );
};

export default GroupStudentsSidebarItem;
