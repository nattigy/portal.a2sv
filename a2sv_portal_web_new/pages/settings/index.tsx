import React, { ReactNode } from 'react'
import BaseLayout from '../../components/common/BaseLayout'

const IndexPage = () => {
    const Sidebar: React.FC = () => {
        return (
            <h1>Settings Sidebar</h1>
        )
    }


    return (
        <BaseLayout sidebar={<Sidebar />}>
            <div>
                Settings
            </div>
        </BaseLayout>
    )
}

export default IndexPage