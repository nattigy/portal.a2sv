import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Educations Sidebar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                Education
            </div>
        </StudentLayout>
    )
}

export default IndexPage