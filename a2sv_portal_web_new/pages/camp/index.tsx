import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Camp Sidebar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Camp
            </div>
        </StudentLayout>
    )
}

export default IndexPage