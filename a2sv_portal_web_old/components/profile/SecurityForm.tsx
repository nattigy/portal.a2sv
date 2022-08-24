import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, FormLabel, Stack, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import SuccessModal from './SuccessModal'

interface FormValues {
  old_password: string
  new_password: string
  confirm_new_password: string
}

const validationSchema = yup.object({
  old_password: yup.string().required('Old Password is required'),
  new_password: yup
    .string()
    .required('Required!')
    .min(8, 'Too Short!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirm_new_password: yup
    .string()
    .required('Required!')
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
})

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#EFF3F9',
    '& fieldset': {},
    '&:hover fieldset': {},
    '&.Mui-focused fieldset': {
      borderColor: 'none',
    },
  },
  input: {
    py: '10px',
    color: 'black',
    borderRadius: '20px',
  },
})

const SecurityForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values)
      setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
    },
  })

  return (
    <>
      <SuccessModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '60%',
          },
          marginBottom: '100px',
          padding: {
            xs: '0 20px',
            md: '0 10px',
          },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            spacing={4}
            sx={{
              width: '100%',
              pl: {
                xs: '10px',
                md: '10%',
              },
            }}
          >
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                  }}
                  htmlFor="old_password"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Old Password
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  id="old_password"
                  name="old_password"
                  placeholder="Old Password"
                  size="small"
                  type="password"
                  value={formik.values.old_password}
                  onChange={formik.handleChange}
                  error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                  helperText={formik.touched.old_password && formik.errors.old_password}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                  }}
                  htmlFor="new_password"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    New Password
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  id="new_password"
                  name="new_password"
                  placeholder="New Password"
                  size="small"
                  type="password"
                  value={formik.values.new_password}
                  onChange={formik.handleChange}
                  error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                  helperText={formik.touched.new_password && formik.errors.new_password}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                  }}
                  htmlFor="confirm_new_password"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Confirm New Password
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  id="confirm_new_password"
                  name="confirm_new_password"
                  placeholder="Confirm Password"
                  size="small"
                  type="password"
                  value={formik.values.confirm_new_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirm_new_password &&
                    Boolean(formik.errors.confirm_new_password)
                  }
                  helperText={
                    formik.touched.confirm_new_password && formik.errors.confirm_new_password
                  }
                />
              </Box>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                sx={{
                  minWidth: '130px',
                  borderRadius: '8px',
                }}
                color="secondary"
                variant="contained"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  minWidth: '130px',
                  borderRadius: '8px',
                }}
                color="primary"
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default SecurityForm
