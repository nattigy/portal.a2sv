import Link from 'next/link'
import React from 'react'
import { WithChildren } from '../../types/common'


interface LayoutProps extends WithChildren {
    href: string
}

const CustomLink = (props: LayoutProps) => {
    return (
        <Link className='cursor-pointer' href={props.href}>
            {props.children}
        </Link>
    )
}

export default CustomLink