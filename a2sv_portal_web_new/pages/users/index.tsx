import React, { useEffect, useState } from 'react'
import StudentLayout from '../../components/common/StudentLayout';
import UserRank from '../../components/dashboard/UserRank';
import UsersFilter from '../../components/dashboard/UsersFilter';
import UsersList from '../../components/dashboard/UsersList';
import NewUserModal from '../../components/modals/NewUserModal';
import useAllUsers from '../../lib/hooks/useUsers';

type Props = {}

const UsersPage = (props: Props) => {
    const [filter, setFilter] = useState("all")
    const { loading, data, error, refetch } = useAllUsers()
    const [usersData, setUsersData] = useState([])
    useEffect(() => {
        if (data) {
            console.log("data is ", data)
            setUsersData(data.users)
        }
    }, [refetch, data])

    const Sidebar: React.FC = () => {
        return <UserRank />;
    };
    const [tabIndex, setTabIndex] = useState(0);
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
            <div>
                <h1 className="text-2xl font-bold mb-2">Users 1</h1>
                <UsersFilter handleModalOpen={handleModalOpen} handleTabChange={handleTabChange} activeIndex={tabIndex} />
                {
                    loading ? (
                        <h1>Loading</h1>
                    ) : (
                        <>
                            {
                                usersData && usersData.length > 0 ? (
                                    <UsersList users={usersData} />
                                ) : (
                                    <h1>No Users</h1>
                                )
                            }
                        </>
                    )
                }
            </div>
        </StudentLayout>
    )
}

export default UsersPage