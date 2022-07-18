import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

type Props = {
  title?: string
  description?: string
  action?: () => void
  actionTitle?: string
}

const Notfound = (props: Props) => {
  const router = useRouter()
  const {
    title = 'Whoops!!',
    description = 'Looks like you are not connected to internet',
    action = () => {
      router.reload()
    },
    actionTitle = 'Reload',
  } = props

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
        }}
      >
        <Box rowGap={10} display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" justifyItems="center" alignItems="center">
            <Image
              objectFit="cover"
              height={300}
              width={800}
              src="/assets/imgs/404.svg"
              alt="not-found"
            />
          </Box>
          <Box
            display="flex"
            rowGap={2}
            flexDirection="column"
            justifyItems="center"
            alignItems="center"
          >
            <Typography fontWeight="bold" variant="h3">
              {title}
            </Typography>
            <Typography variant="h6" width={200} align="center">
              {description}
            </Typography>
            <Button color="primary" variant="contained" onClick={action}>
              {actionTitle}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Notfound
