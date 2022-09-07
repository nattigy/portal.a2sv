import React, { ReactNode, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import GroupStudentsSidebarItem, {
  GroupStudentsSidebarProps,
} from "../../components/dashboard/GroupStudentsSidebarItem";
import NewGroupModal from "../../components/modals/NewGroupModal";
import { UserRoleType } from "../../types/user";

const IndexPage = () => {
  const student: GroupStudentsSidebarProps = {
    id: 1,
    name: "Natnael Bekele",
    photo: "images/group-students-profile.svg",
    role: UserRoleType.HOE,
  };

  const Sidebar: React.FC = () => {
    return (
      // <GroupStudentsSidebarItem
      //   clicked={true}
      //   groupStudentSidebarItem={student}
      // />
      <h1>Contests Sidebar</h1>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      Contests
    </BaseLayout>
  );
};

export default IndexPage;
