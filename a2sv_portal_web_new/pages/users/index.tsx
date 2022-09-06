import React, { useEffect, useState } from "react";
import { LoaderSmall } from "../../components/common/Loaders";
import StudentLayout from "../../components/common/StudentLayout";
import NewUserModal from "../../components/modals/NewUserModal";
import UserRank from "../../components/users/UserRank";
import UsersFilter from "../../components/users/UsersFilter";
import UsersList from "../../components/users/UsersList";
import { useFilteredUsers } from "../../lib/hooks/useUsers";

type Props = {};

const UsersPage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [loadUsers, { loading, data, error, refetch }] = useFilteredUsers(tabIndex);
  
  useEffect(() => {
    loadUsers();
  }, [tabIndex]);

  useEffect(() => {
    if (data) {
      console.log("data is ", data);
      setUsersData(data.users);
    }
  }, [refetch, data]);

  const Sidebar: React.FC = () => {
    return <UserRank />;
  };
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <StudentLayout sidebar={<Sidebar />}>
      {isModalOpen && <NewUserModal onClose={() => setIsModalOpen(false)} />}
      <div className="flex flex-col relative">
        <h1 className="text-2xl font-bold mb-2">Users 1</h1>
        <UsersFilter
          handleModalOpen={handleModalOpen}
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        {loading ? (
          <div className="w-full flex justify-center">
            <LoaderSmall color="#5956E9" />
          </div>
        ) : (
          <>
            {usersData && usersData.length > 0 ? (
              <UsersList users={usersData} />
            ) : (
              <h1>No Users</h1>
            )}
          </>
        )}
      </div>
    </StudentLayout>
  );
};

export default UsersPage;
