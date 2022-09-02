import React from 'react'
import { WithChildren } from '../../types/common'

interface TagProps extends WithChildren {
    value: string
}

const Tag = (props: TagProps) => {
    return (
        <div className='flex flex-row justify-between px-4 py-2 border rounded-full gap-x-2'>
            {props.children}
        </div>
    )
}

export default Tag