import React, { ReactNode, useState } from 'react'
import { Box, FormControl, MenuItem, Grid, Typography, Select } from '@mui/material'
import Image from 'next/image'
import Rectangle from './Rectangle'

type LayoutProps = {
  children: ReactNode
}
const Layout = (props: LayoutProps) => {
  const [language, setLanguage] = useState('Amh')
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        minHeight: '40vh',
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          bgcolor: 'primary.main',
          display: { sm: 'flex', xs: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Image src={'/assets/imgs/asset1.svg'} height={200} width={500} alt="asset1" />
          <Box
            sx={{
              mt: 8,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: 'secondary.main' }}>
              Quick Access
            </Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main' }}>
              Welcome A2SVians
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 10,
            }}
          >
            <Rectangle color="secondary.main" padx={1} pady={0.5} margin={0.5} borderRadius={2} />
            <Rectangle color="secondary.main" padx={0.5} pady={0.5} margin={0.5} borderRadius={2} />
            <Rectangle color="secondary.main" padx={0.5} pady={0.5} margin={0.5} borderRadius={2} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ p: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <FormControl sx={{ mx: 1, color: 'text.primary' }} size="small">
            <Select
              sx={{ color: 'text.primary' }}
              variant="standard"
              disableUnderline
              labelId="locale-select-label"
              id="locale"
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value)
              }}
            >
              <MenuItem sx={{ color: 'text.primary' }} value={'Amh'}>
                Am
              </MenuItem>
              <MenuItem sx={{ color: 'text.primary' }} value={'Eng'}>
                En
              </MenuItem>
              <MenuItem sx={{ color: 'text.primary' }} value={'Arb'}>
                Ar
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '80vh',
            minHeight: '55vh',
            my: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <Image src={'/assets/imgs/logo.svg'} height={60} width={150} alt="asset1" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              maxWidth: { xs: '90%', md: '75%', lg: '50%' },
              minHeight: '40vh',
              maxHeight: '50vh',
              mt: 8,
            }}
          >
            {props.children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Layout
