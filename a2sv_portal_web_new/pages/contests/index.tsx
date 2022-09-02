import React, { ReactNode, useState } from 'react'
import StudentLayout from '../../components/common/StudentLayout'
import NewUserModal from '../../components/modals/NewUserModal'
import ProblemModalDetail from '../../components/modals/ProblemDetailModal'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Contests Sidebar</h1>
        )
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    return (
        <StudentLayout sidebar={<Sidebar />}>
            {/* {isModalOpen && (
                <NewUserModal onClose={() => setIsModalOpen(false)} />
            )} */}
            Contests
            {/* <div >
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white" onClick={handleModalOpen}>Open Modal</button>
            </div> */}
        </StudentLayout>
    )
}

export default IndexPage