import { useReactiveVar } from "@apollo/client";
import React, { ReactNode, useEffect, useState } from "react";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import ProblemModalDetail from "../../components/modals/ProblemDetailModal";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";
import { useUsersByGroupId } from "../../lib/hooks/useUsers";
import { LoaderSmall } from "../common/Loaders";
import NewUserModal from "../modals/NewUserModal";
import AddStudentList from "./AddStudentList";
import GroupStudentsSidebarItem from "./GroupStudentsSidebarItem";
import StudentTable, { StudentsInfo } from "./StudentTable";

type Props = {

}


// export const students: Array<StudentsInfo> = [
//   {
//     id: 1,
//     name: "Hanna Samuel",
//     dateJoined: "Oct 12/2019",
//     residence: "Addis Ababa",
//     nationality: "Ethiopia",
//     photo: "images/group-students-profile.svg",
//   },
//   {
//     id: 2,
//     name: "Kaleb Mesfin",
//     dateJoined: "Oct 12/2019",
//     residence: "Accra",
//     nationality: "Ghana",
//     photo: "images/group-students-profile.svg",
//   },
//   {
//     id: 3,
//     name: "Natnael Awel",
//     dateJoined: "Oct 12/2019",
//     residence: "Istanbul",
//     nationality: "Turkey",
//     photo: "images/group-students-profile.svg",
//   },
//   {
//     id: 4,
//     name: "Henok Adane",
//     dateJoined: "Oct 12/2019",
//     residence: "Kigali",
//     nationality: "Rwanda",
//     photo: "images/group-students-profile.svg",
//   },
// ];

const GroupStudents = () => {
  // const [titleAscending, setTitleAscending] = useState(false)
  // const [titleDescending, setTitleDescending] = useState(false)
  // const [difficultyAscending, setDifficultyAscending] = useState(false)
  // const [difficultyDescending, setDifficultyDescending] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authUser = useReactiveVar<AuthUser | any>(authenticatedUser)
  const [loadStudents, { data, refetch, loading }] = useUsersByGroupId(((authUser) as AuthUser).groupId)
  useEffect(() => {
    loadStudents()
  }, [authUser, refetch])


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };




  return (
    <>
      {isModalOpen && (
        <NewUserModal onClose={() => setIsModalOpen(false)} />
      )}
      <div className="h-screen font-semibold text-[#565656]">
        <div className="flex flex-row items-center justify-end my-6 font-semibold text-xl text-[#565656]">
          <button onClick={handleModalOpen} className="px-4 py-2 bg-[#5956E9] rounded-lg text-center text-white font-medium text-sm">
            + New Student
          </button>
        </div>
        {
          loading ? (
            <div>
              <LoaderSmall />
            </div>
          ) :
            data && data.users ? (
              <StudentTable students={data.users} />
            ) : (
              <h1>
                Empty
              </h1>
            )
        }
      </div>
    </>
  );
};
export default GroupStudents;
