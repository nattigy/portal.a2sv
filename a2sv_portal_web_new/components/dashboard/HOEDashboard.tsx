import React, { useState } from 'react'
import StudentLayout from '../common/StudentLayout'
import UserRank from '../personal-status/UserRank'
import UsersFilter from './UsersFilter'
import UsersList from './UsersList'

type Props = {}

const HOEDashboard = (props: Props) => {
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
                <h1 className="text-2xl font-bold mb-2">HOE Dashbaord</h1>

            </div>
        </StudentLayout>
    )
}

export default HOEDashboard