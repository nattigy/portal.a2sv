import React, { useEffect, useState } from 'react'
import useAllUsers from '../../lib/hooks/useUsers'
import { UserRoleType } from '../../types/user'
import StudentLayout from '../common/StudentLayout'
import UserRank from '../personal-status/UserRank'
import { UserProps } from './UserItem'
import UsersFilter from './UsersFilter'
import UsersList from './UsersList'

type Props = {}

const StudentDashboard = (props: Props) => {
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

    return (
        <StudentLayout>
            <div>
                <h1 className="text-2xl font-bold mb-2">Users</h1>
                <UsersFilter handleTabChange={handleTabChange} activeIndex={tabIndex} />
                <UsersList users={usersData} />
            </div>
        </StudentLayout>
    )
}

export default StudentDashboard