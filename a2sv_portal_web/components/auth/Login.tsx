import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import TextField from './TextField'

const LoginForm = () => {
  const [INITIAL_STATE_VALUE, setValue] = useState({
    email: '',
    password: '',
  })

  const FORM_VALIDATION = yup.object().shape({
    email: yup.string().required('Required').email('Invalid'),
    password: yup.string().min(8).required('Required'),
  })
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Log in</Typography>
      </Box>

      <Formik
        initialValues={INITIAL_STATE_VALUE}
        validationSchema={FORM_VALIDATION}
        onSubmit={(value) => {
          setValue({ email: value.email, password: value.password })
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="email" label="Email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" label="Password" type="password" />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <FormControlLabel
                sx={{ m: 0 }}
                label="Remember me"
                control={<Checkbox size="small" />}
              />
              <Typography sx={{ color: 'link.main' }}>
                <Link href="/auth">
                  <a>forgot password?</a>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button fullWidth variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  )
}

export default LoginForm
