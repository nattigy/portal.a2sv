import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Topics Sidebar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Topics Page
            </div>
        </StudentLayout>
    )
}

export default IndexPage