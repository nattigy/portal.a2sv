import React, { ReactNode, useState } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import NewUserModal from "../../components/modals/NewUserModal";
import NewProblemModal from "../../components/modals/NewProblemModal";
import NewTopicModal from "../../components/modals/NewTopicModal";
import ProblemModalDetail from "../../components/modals/ProblemDetailModal";
import GroupStudentsSidebarItem, { GroupStudentsSidebarProps } from "../../components/dashboard/GroupStudentsSidebarItem";
import GroupStudents from "../../components/dashboard/GroupStudents";
import { UserRoleType } from "../../types/user";

const IndexPage = () => {
  const student:GroupStudentsSidebarProps = {
    id: 1,
    name: "Natnael Bekele",
    photo: "images/group-students-profile.svg",
    role: UserRoleType.HOE
  }

  const Sidebar: React.FC = () => {
    return (
      <GroupStudentsSidebarItem clicked={true} groupStudentSidebarItem={student}/>
      // <h1>Contests Sidebar</h1>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      {/* {isModalOpen && (
                <NewUserModal onClose={() => setIsModalOpen(false)} />
            )} */}
      {/* Contests */}
      <GroupStudents/>
      {/* <div >
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white" onClick={handleModalOpen}>Open Modal</button>
            </div> */}
    </StudentLayout>
  );
};

export default IndexPage;
