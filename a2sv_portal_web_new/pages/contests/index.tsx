import React, { ReactNode, useState } from "react";
import StudentLayout from "../../components/common/StudentLayout";
import NewUserModal from "../../components/modals/NewUserModal";
import NewProblemModal from "../../components/modals/NewProblemModal";
import NewTopicModal from "../../components/modals/NewTopicModal";
import ProblemModalDetail from "../../components/modals/ProblemDetailModal";
import GroupStudentsSidebarItem, {
  GroupStudentsSidebarProps,
} from "../../components/group/GroupStudentsSidebarItem";
import NewGroupModal from "../../components/modals/NewGroupModal";
import { UserRoleType } from "../../types/user";
import ProblemSolvedItem, {
  ProblemSolvedProps,
} from "../../components/dashboard/ProblemSolvedItem";
import ConsistencyDiagramItem from "../../components/dashboard/ConsistencyDiagram";
import ContestStatItem from "../../components/dashboard/ContestStatItem";

const IndexPage = () => {
  const student: GroupStudentsSidebarProps = {
    id: 1,
    name: "Natnael Bekele",
    photo: "images/group-students-profile.svg",
    role: UserRoleType.HOE,
  };

  const problemStat: ProblemSolvedProps = {
    problems: 389,
    wrong: 459,
    minutes: 4554,
    easy: 239,
    medium: 104,
    hard: 46,
  };

  const Sidebar: React.FC = () => {
    return (
      <GroupStudentsSidebarItem
        clicked={true}
        groupStudentSidebarItem={student}
      />
      // <h1>Contests Sidebar</h1>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      {/* {isModalOpen && <NewGroupModal onClose={() => setIsModalOpen(false)} />} */}
      {/* Contests */}
      {/* <GroupStudents/> */}
      <div className="flex gap-x-2 my-4">
        <ConsistencyDiagramItem />
        <ProblemSolvedItem problemSolvedProps={problemStat} />
      </div>
      <ContestStatItem />
      {/* <div>
        <button
          className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          onClick={handleModalOpen}
        >
          Open Modal
        </button>
      </div> */}
    </StudentLayout>
  );
};

export default IndexPage;
