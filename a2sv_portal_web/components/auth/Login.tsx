import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { useFormik } from 'formik'
import Link from 'next/link'
import React from 'react'
import CustomTextField from './TextField'

interface FormValues {
  email: string
  password: string
}
const INITIAL_VALUE = {
  email: '',
  password: '',
} as FormValues

const FORM_VALIDATION = yup.object().shape({
  email: yup.string().required('Required').email('email should have the format user@example.com'),
  password: yup
    .string()
    .min(8)
    .required('Required')
    .min(8, 'Too Short!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
})

const LoginForm = () => {
  const formik = useFormik({
    initialValues: INITIAL_VALUE,
    validationSchema: FORM_VALIDATION,
    onSubmit: () => {},
  })
  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Log in</Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography>Do not have an account?</Typography>
          <Typography sx={{ color: 'link.main', ml: 1 }}>
            <Link href="/auth/">
              <a>Sign up</a>
            </Link>
          </Typography>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
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
              <Link href="/auth/forgot-password">
                <a>forgot password?</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ boxShadow: '10', borderRadius: 2 }}
              type="submit"
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LoginForm
