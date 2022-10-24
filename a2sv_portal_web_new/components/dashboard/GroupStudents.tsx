import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import {
  useUsersByGroupId,
  useUsersOfSingleGroup,
} from "../../lib/hooks/useUsers";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import StudentTable from "./StudentTable";

type Props = {
  isAddStudentToGroupSidebarOpen: boolean;
  setIsAddStudentToGroupSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  groupData?: any;
  groupId: number;
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
  const { data, refetch, loading, error } = useUsersOfSingleGroup(
    props.groupId
  );

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="h-full w-full font-semibold text-[#565656]">
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
              <Button
                onClick={() => props.setIsAddStudentToGroupSidebarOpen(true)}
                text="Add Student"
                icon={<BsPlus color="#ffffff" size={18} />}
              />
            )}
          </div>
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <LoaderSmall />
          </div>
        ) : error ? (
          <p>Something went wrong</p>
        ) : data && data.group.users.length > 0 ? (
          <StudentTable students={data.group.users} />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};
export default GroupStudents;
