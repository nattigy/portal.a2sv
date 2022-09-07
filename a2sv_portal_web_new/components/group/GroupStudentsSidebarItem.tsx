import React, { ReactNode, useState, useEffect } from "react";
import clsx from "clsx";
import { MdContentPaste } from "react-icons/md";
import { getGoogleIcon } from "../../helpers/getGoogleIcon";
import CustomLink from "../common/CustomLink";
import AddStudentList from "./AddStudentList";
import { useGetUsersWithNoGroup } from "../../lib/hooks/useUsers";
import { StudentsInfo } from "./AddStudentListItem";
import { LoaderSmall } from "../common/Loaders";

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
  const { data, loading, error, refetch } = useGetUsersWithNoGroup()
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (data) {
      console.log(data, " is data")
      setStudents(data.users)
    }
  }, [refetch, students])


  return (
    <div className={clsx("h-full flex flex-col")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
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
        <div className={clsx(showStudentList ? "flex flex-col" : "hidden")}>
          {
            loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <LoaderSmall />
              </div>
            ) :
              <AddStudentList students={data.users} />
          }
        </div>
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
