import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Notfound from '../components/common/Notfound'

type Props = {}

function NotFoundPage({ }: Props) {

    return (
        <div>
            <Notfound />
        </div>
    )
}

export default NotFoundPage