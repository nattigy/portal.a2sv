import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'
import UserRank from '../../components/personal-status/UserRank'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            // <h1>Personal Status Sidebar</h1>
            <UserRank/>
        )
    }

    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Personal Status
            </div>
        </StudentLayout>
    )
}

export default IndexPage