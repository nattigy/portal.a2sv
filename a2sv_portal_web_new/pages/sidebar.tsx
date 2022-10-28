import React from 'react'
import SidebarLayout from '../components/common/SidebarLayout'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div>
            <SidebarLayout sidebarItems={<>hello</>} />
        </div>
    )
}

export default Sidebar