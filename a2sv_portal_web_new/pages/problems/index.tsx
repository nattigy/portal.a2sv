import React, { ReactNode } from 'react'
import StudentLayout from '../../components/common/StudentLayout'
import ProblemsTable from '../../components/problems/ProblemsTable'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Dashboard Sidebar</h1>
        )
    }


    return (
        <StudentLayout sidebar={<Sidebar />}>
            <div>
                
                <ProblemsTable/>
            </div>
        </StudentLayout>
    )
}

export default IndexPage