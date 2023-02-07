import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
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
import { MdDelete } from "react-icons/md";
import DeletePopupModal from "../modals/DeletePopupModal";
import { REMOVE_STUDENTS_FROM_GROUP } from "../../lib/apollo/Mutations/groupsMutations";
import { CustomTooltip } from "../common/CustomTooltip";

type Props = {
  isAddStudentToGroupSidebarOpen: boolean;
  setIsAddStudentToGroupSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  groupData?: any;
  groupId: string;
};

export type StudentsInfo = {
  id: string;
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [removingStudentErrorMessage, setRemovingStudentErrorMessage] = useState("")
  const authUser = useReactiveVar<AuthUser | any>(authenticatedUser);
  const [removeStudentFromGroup, { data, loading: removingStudentFromGroup }] = useMutation(REMOVE_STUDENTS_FROM_GROUP)
  const [selectedStudentsId, setSelectedStudentsId] = useState<Set<string>>(new Set([]))

  const handleRemoveStudentFromGroup = async () => {
    await removeStudentFromGroup({
      variables: {
      },
      notifyOnNetworkStatusChange: true,
      refetchQueries: "active",
      onCompleted: (data) => {
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        setRemovingStudentErrorMessage((error as ApolloError).message);
      },
    });
  }

  return (
    <>
      {
        isDeleteModalOpen && (
          <DeletePopupModal
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={handleRemoveStudentFromGroup}
            isLoading={removingStudentFromGroup}
            title="You are about to remove students from the Group"
            description={`This action will remove students from the group`}
            errorMessage={removingStudentErrorMessage} />
        )
      }
      <div className="h-full w-full font-semibold text-[#565656]">
        <div className="flex justify-between items-center">
          <p className="text-[rgb(103,103,103)] font-semibold text-lg">
            {props.groupData?.group?.name}
          </p>

          <div className="flex flex-row items-center justify-end my-6 font-semibold text-xl text-[#565656] gap-x-2">
            <CustomTooltip show={selectedStudentsId.size < 1} message={selectedStudentsId.size < 1 ? "Please select at least one student" : ""}>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={selectedStudentsId.size < 1}
                text="Remove Student"
                icon={<MdDelete color="#ffffff" size={18} />}
                classname="px-4 py-2 bg-red-400 rounded-lg text-center text-white font-medium text-sm"
              />
            </CustomTooltip>
            {props.isAddStudentToGroupSidebarOpen ? (
              <Button
                text="Cancel"
                onClick={() => props.setIsAddStudentToGroupSidebarOpen(false)}
                classname="px-4 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm"
              />
            ) : (
              <Button
                onClick={() => props.setIsAddStudentToGroupSidebarOpen(true)}
                text="Add Student"
                icon={<BsPlus color="#ffffff" size={18} />}
                classname="px-4 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm"
              />
            )}
          </div>
        </div>
        {props.groupData?.users.length > 0 ? (
          <StudentTable
            selectedStudentsId={selectedStudentsId}
            setSelectedStudentsId={setSelectedStudentsId}
            students={props.groupData?.users}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};
export default GroupStudents;
