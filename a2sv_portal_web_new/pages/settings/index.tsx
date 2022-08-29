import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Settings Sidebar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Settings
            </div>
        </StudentLayout>
    )
}

export default IndexPage