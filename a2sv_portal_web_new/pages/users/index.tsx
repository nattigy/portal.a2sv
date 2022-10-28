import React, { useEffect, useState } from "react";
import BaseLayout from "../../components/common/BaseLayout";
import EmptyState from "../../components/common/EmptyState";
import { LoaderSmall } from "../../components/common/Loaders";
import NewUserModal from "../../components/modals/NewUserModal";
import UserRank from "../../components/users/UserRank";
import UsersFilter from "../../components/users/UsersFilter";
import UsersList from "../../components/users/UsersList";
import { addApolloState, initializeApollo, useApollo } from "../../lib/apollo/apolloClient";
import { GET_FILTERED_USERS } from "../../lib/apollo/Queries/usersQueries";
import { useFilteredUsers } from "../../lib/hooks/useUsers";
import { GraphqlUserRole } from "../../types/user";

type Props = {};

type User = {
  email: string;
  id: string;
  role: GraphqlUserRole;
};

const UsersPage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const apolloClient = useApollo(props)
  const [loadUsers, { loading, data, error, refetch }] =
    useFilteredUsers(tabIndex);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
    setSelected("")
  }, [tabIndex, refetch]);

  useEffect(() => {
    if (data) {
      console.log("data is ", data.users[0]);
      setUsersData(data?.users);
      setSelected(data?.users[0]?.id);
    }
  }, [refetch, data]);

  const Sidebar: React.FC = () => {
    return (
      <div>
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <LoaderSmall />
          </div>
        ) : (
          selected && (
            <UserRank selected={selected} />
          )
        )}
      </div>
    );
  };
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <BaseLayout sidebar={<Sidebar />}>
      {isModalOpen && <NewUserModal onClose={() => setIsModalOpen(false)} />}
      <div className="flex flex-col relative">
        <h1 className="text-2xl font-bold mb-2">Users</h1>
        <UsersFilter
          handleModalOpen={handleModalOpen}
          handleTabChange={handleTabChange}
          activeIndex={tabIndex}
        />
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoaderSmall color="#5956E9" />
          </div>
        ) : error ? <p>Something went wrong</p> : (
          <>
            {usersData?.length > 0 && selected !== null ? (
              <UsersList
                selected={selected}
                setSelected={setSelected}
                users={usersData}
              />
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo({})

  await apolloClient.query({
    query: GET_FILTERED_USERS,
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default UsersPage;
