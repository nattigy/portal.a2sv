import React, { useEffect, useState } from "react";
import { useGetUsersWithNoGroup } from "../../lib/hooks/useUsers";
import GroupStudentsSidebarItem, {
  GroupStudentsSidebarProps,
} from "./GroupStudentsSidebarItem";

const StudentSidebar: React.FC<{
  groupId: string;
  showStudentList: boolean;
  groupHead: GroupStudentsSidebarProps;
}> = ({
  showStudentList,
  groupId,
  groupHead,
}: {
  showStudentList: boolean;
  groupId: string;
  groupHead: GroupStudentsSidebarProps;
}) => {
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