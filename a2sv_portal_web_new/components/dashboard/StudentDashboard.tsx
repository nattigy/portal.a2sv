import React, { useState } from 'react'
import StudentLayout from '../common/StudentLayout'
import UserRank from '../personal-status/UserRank'
import UsersFilter from './UsersFilter'
import UsersList from './UsersList'

type Props = {}

const StudentDashboard = (props: Props) => {
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
                <UsersList />
            </div>
        </StudentLayout>
    )
}

export default StudentDashboard