import { Box } from '@mui/material'
import React from 'react'
import { WithChildren } from '../../types/common'
import CustomAppbar from './Appbar'
interface LayoutProps extends WithChildren {}

export default function BaseLayout({ children }: LayoutProps) {
  return (
    <Box>
      <CustomAppbar />
      <Box
        component="main"
        sx={{
          position: 'relative',
          flexGrow: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
