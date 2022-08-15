import { Button, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import CustomTextField from './TextField'

interface EmailInputValue {
  email: string
}
const ForgotPassword = () => {
  const router = useRouter()
  const INITIAL_EMAIL = { email: '' } as EmailInputValue
  const EMAIL_FORM_VALIDATION = yup.object().shape({
    email: yup.string().required('Required').email('email should have the format user@example.com'),
  })

  const formik = useFormik({
    initialValues: INITIAL_EMAIL,
    validationSchema: EMAIL_FORM_VALIDATION,
    onSubmit: () => {
      router.push('/auth/reset-password/verify')
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Forgot password</Typography>
          <Typography variant="caption">
            We will send you an email to reset your password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="email"
            label="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ boxShadow: '10', borderRadius: 2 }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ForgotPassword
