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
        lg={6}
        sx={{
          bgcolor: 'primary.main',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box>
          <Image src={'/assets/imgs/asset1.svg'} height={200} width={500} alt="asset1" />
          <Box
            sx={{
              mt: 5,
              width: 250,
              textAlign: 'center',
              mx: 'auto',
            }}
          >
            <Typography variant="h4" sx={{ color: 'secondary.main' }}>
              Quick Access
            </Typography>
            <Typography sx={{ color: 'secondary.main' }}>
              Get the most of your work by using simple search
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 3,
            }}
          >
            <Rectangle color="secondary.main" padx={2} pady={1} margin={1} borderRadius={2} />
            <Rectangle color="secondary.main" padx={1} pady={1} margin={1} borderRadius={2} />
            <Rectangle color="secondary.main" padx={1} pady={1} margin={1} borderRadius={2} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6} sx={{ p: 1 }}>
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
                am
              </MenuItem>
              <MenuItem sx={{ color: 'text.primary' }} value={'Eng'}>
                en
              </MenuItem>
              <MenuItem sx={{ color: 'text.primary' }} value={'Arb'}>
                ar
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
            minHeight: '45vh',
            my: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <Image src={'/assets/imgs/logo.svg'} height={60} width={150} alt="asset1" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              maxWidth: '50%',
              height: '50vh',
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
