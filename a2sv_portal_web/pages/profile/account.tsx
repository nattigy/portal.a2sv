import { Typography } from '@mui/material'
import React from 'react'
import ProfileLayout from '../../components/profile/Layout'
import SocialMediaAccountLinksForm from '../../components/profile/SocialMediaAccountLinksForm'

const SmHandlesPage = () => {
  return (
    <ProfileLayout>
      <Typography
        variant="h4"
        sx={{
          px: 5,
          fontSize: {
            xs: '18px',
            lg: '20px',
          },
        }}
      >
        Add a link or handle to your social media/other accounts
      </Typography>
      <SocialMediaAccountLinksForm />
    </ProfileLayout>
  )
}

export default SmHandlesPage
