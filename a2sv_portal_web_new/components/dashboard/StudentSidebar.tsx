import React, { useEffect, useState } from "react";
import { useGetUsersWithNoGroup } from "../../lib/hooks/useUsers";
import { GraphqlUserRole, UserRoleType } from "../../types/user";
import GroupStudentsSidebarItem, {
  GroupStudentsSidebarProps,
} from "./GroupStudentsSidebarItem";

type Props = {};

const student: GroupStudentsSidebarProps = {
  id: 1,
  name: "Natnael Bekele",
  photo: "/images/group-students-profile.svg",
  role: UserRoleType.HOE,
};

const StudentSidebar: React.FC<{ showStudentList: boolean }> = ({
  showStudentList,
}: {
  showStudentList: boolean;
}) => {
  const { data, loading, error, refetch } = useGetUsersWithNoGroup();
  useEffect(() => {}, [refetch, data]);

  return (
    <div className="flex flex-col gap-y-3 ">
      <GroupStudentsSidebarItem showStudentList={showStudentList} />
    </div>
  );
};


export default StudentSidebar;
