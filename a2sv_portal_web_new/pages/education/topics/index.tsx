import React, { ReactNode } from 'react'
import StudentLayout from '../../../components/common/StudentLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Topics Side bar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Topics
            </div>
        </StudentLayout>
    )
}

export default IndexPage