import React, { useEffect, useState } from "react";
import { useGetUsersWithNoGroup } from "../../lib/hooks/useUsers";
import { GraphqlUserRole, UserRoleType } from "../../types/user";
import GroupStudentsSidebarItem, {
  GroupStudentsSidebarProps,
} from "./GroupStudentsSidebarItem";

type Props = {};

// const student: GroupStudentsSidebarProps = {
//   id: 1,
//   name: "Natnael Bekele",
//   photo: "/images/group-students-profile.svg",
//   role: UserRoleType.HOE,
// };

const StudentSidebar: React.FC<{
  groupId: number;
  showStudentList: boolean;
  groupHead: GroupStudentsSidebarProps;
}> = ({
  showStudentList,
  groupId,
  groupHead,
}: {
  showStudentList: boolean;
  groupId: number;
  groupHead: GroupStudentsSidebarProps;
}) => {
  const { data, loading, error, refetch } = useGetUsersWithNoGroup();
  useEffect(() => {}, [refetch, data]);

  return (
    <div className="h-full flex flex-col py-2">
      {groupHead.id ? (
        <GroupStudentsSidebarItem
          groupId={groupId}
          showStudentList={showStudentList}
          groupHead={groupHead}
        />
      ) : (
        <p>No Head of Education</p>
      )}
    </div>
  );
};

export default StudentSidebar;
