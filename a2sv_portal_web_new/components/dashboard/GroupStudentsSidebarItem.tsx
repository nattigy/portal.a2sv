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
  groupHead?: GroupStudentsSidebarProps;
  showStudentList?: boolean;
  groupId: number;
};

const GroupStudentsSidebarItem = ({
  groupHead,
  groupId,
  showStudentList,
}: Props) => {
  const { data, loading, error, refetch } = useGetUsersWithNoGroup();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (data) {
      setStudents(data.users);
    }
  }, [refetch, students]);

  return (
    <div className={clsx("h-full flex flex-col gap-y-2 justify-between")}>
      <div className={clsx("flex flex-col gap-y-2 transition-all")}>
        <div className="flex flex-row justify-start items-center gap-3 text-sm hover:bg-[#F6F6FC]">
          <div className="flex justify-center w-3/12 py-2 items-center rounded-lg">
            <img src={groupHead?.photo} alt="" />
          </div>
          <div className="flex flex-col w-7/12 items-start justify-end">
            <p className="w-full font-semibold text-md truncate text-ellipsis">
              {groupHead ? groupHead?.name : "No Name"}
            </p>
            <p className="text-xs font-medium">Head of Education</p>
          </div>
        </div>
        <div className={clsx(showStudentList ? "flex flex-col" : "hidden")}>
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <LoaderSmall />
            </div>
          ) : (
            <AddStudentList groupId={groupId || 0} students={data.users} />
          )}
        </div>
      </div>
      <div className="flex flex-col pb-4">
        <img className={clsx(showStudentList ? "hidden" : "")} src="/images/group-students.svg" alt="" />
        <p className={clsx(showStudentList ? "text-center text-xs" : "hidden")}>
          Here‘s the list of all students that are not assigned a group yet!
        </p>
      </div>
    </div>
  );
};

export default GroupStudentsSidebarItem;
