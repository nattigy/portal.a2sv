import { Button, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CustomTextField from './TextField'
import { useRouter } from 'next/router'

interface ChangePasswordValues {
  newPassword: string
  confirmPassword: string
}
const INITIAL_PASSWORD_VALUE = {
  newPassword: '',
  confirmPassword: '',
} as ChangePasswordValues

const ResetPasswordForm = () => {
  const router = useRouter()

  const PASSWORD_FORM_VALIDATION = yup.object().shape({
    newPassword: yup
      .string()
      .required('Required!')
      .min(8, 'Too Short!')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: yup
      .string()
      .required('Required!')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  })
  const formik = useFormik({
    initialValues: INITIAL_PASSWORD_VALUE,
    validationSchema: PASSWORD_FORM_VALIDATION,
    onSubmit: () => {
      router.push('/auth/reset-password/success')
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Change password</Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="newPassword"
            label="New password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ boxShadow: '10', borderRadius: 2 }}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ResetPasswordForm
