import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ProblemModalDetail from "../../components/modals/ProblemDetailModal";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { userUsersOfSingleGroup, useUsersByGroupId } from "../../lib/hooks/useUsers";
import { LoaderSmall } from "../common/Loaders";
import NewUserModal from "../modals/NewUserModal";
import AddStudentList from "./AddStudentList";
import GroupStudentsSidebarItem from "./GroupStudentsSidebarItem";
import StudentTable from "./StudentTable";

type Props = {
  isAddStudentToGroupSidebarOpen: boolean;
  setIsAddStudentToGroupSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  groupData?: any;
  groupId: number
};

export type StudentsInfo = {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  residence: string;
  dateJoined: string;
};

const GroupStudents = (props: Props) => {
  // const [titleAscending, setTitleAscending] = useState(false)
  // const [titleDescending, setTitleDescending] = useState(false)
  // const [difficultyAscending, setDifficultyAscending] = useState(false)
  // const [difficultyDescending, setDifficultyDescending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authUser = useReactiveVar<AuthUser | any>(authenticatedUser);

  // const groupId = props.groupData?.group?.id || 0
  const { data, refetch, loading } = userUsersOfSingleGroup(props.groupId);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* {isModalOpen && (
        <NewUserModal onClose={() => setIsModalOpen(false)} />
      )} */}
      <div className="h-screen font-semibold text-[#565656]">
        <div className="flex justify-between items-center">
          <p className="text-[rgb(103,103,103)] font-semibold text-lg">
            {props.groupData?.group?.name}
          </p>

          <div className="flex flex-row items-center justify-end my-6 font-semibold text-xl text-[#565656]">
            {props.isAddStudentToGroupSidebarOpen ? (
              <button
                onClick={() => props.setIsAddStudentToGroupSidebarOpen(false)}
                className="px-4 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => props.setIsAddStudentToGroupSidebarOpen(true)}
                className="px-4 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm"
              >
                + Add Student
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : data && data.group.users ? (
          <StudentTable students={data.group.users} />
        ) : (
          <h1>Empty</h1>
        )}
      </div>
    </>
  );
};
export default GroupStudents;
