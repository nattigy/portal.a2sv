import React, { useState } from 'react'
import { useFormik } from 'formik'
import {
  Button,
  FormLabel,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import * as yup from 'yup'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import SuccessModal from './SuccessModal'

interface FormValues {
  username: string
  fullName: string
  email: string
  country: string
  biography: string
  work_status: string
  mentor: string
  curr_education_status: string
}

const validationSchema = yup.object({
  username: yup.string().required('User name is required'),
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  country: yup.string().required('Country is required'),
  biography: yup.string().required('Biography is required'),
  work_status: yup.string().required('Work status is required'),
  mentor: yup.string().required('Work status is required'),
  curr_education_status: yup.string().required('Education status is required'),
  tshirt_size: yup.string().required('T-shirt size is required'),
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

const ProfileForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      username: '',
      country: '',
      mentor: '',
      biography: '',
      work_status: '',
      curr_education_status: '',
      tshirt_size: '',
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
                  htmlFor="fullName"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Full Name
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  size="small"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="email"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Email
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  sx={{}}
                  id="email"
                  size="small"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="username"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Username
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  sx={{}}
                  id="username"
                  size="small"
                  name="username"
                  placeholder="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          // backgroundColor: "blue",
                          height: '100%',
                          // width: "100%"
                        }}
                      >
                        ait/
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="country"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Country
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  sx={{
                    minWidth: '150px',
                  }}
                  id="country"
                  size="small"
                  name="country"
                  placeholder="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                  select
                >
                  {[
                    {
                      value: '',
                      label: 'Select',
                    },
                    {
                      value: 'ethiopia',
                      label: 'Ethiopia',
                    },
                    {
                      value: 'kenya',
                      label: 'Kenya',
                    },
                    {
                      value: 'tanzania',
                      label: 'Tanzania',
                    },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="biography"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Biography
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  multiline
                  rows={4}
                  id="biography"
                  size="small"
                  name="biography"
                  placeholder="biography"
                  value={formik.values.biography}
                  onChange={formik.handleChange}
                  error={formik.touched.biography && Boolean(formik.errors.biography)}
                  helperText={formik.touched.biography && formik.errors.biography}
                ></CustomTextField>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="work_status"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Work Status
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  sx={{}}
                  id="work_status"
                  size="small"
                  name="work_status"
                  placeholder="Work Status"
                  value={formik.values.work_status}
                  onChange={formik.handleChange}
                  error={formik.touched.work_status && Boolean(formik.errors.work_status)}
                  helperText={formik.touched.work_status && formik.errors.work_status}
                  select
                >
                  {[
                    {
                      value: 'student',
                      label: 'Student',
                    },
                    {
                      value: 'employed',
                      label: 'Employed',
                    },
                    {
                      value: 'unemployed',
                      label: 'Unemployed',
                    },
                    {
                      value: 'retired',
                      label: 'Retired',
                    },
                    {
                      value: 'other',
                      label: 'Other',
                    },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="curr_education_status"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Current Education <br /> Status
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  sx={{}}
                  id="curr_education_status"
                  size="small"
                  name="curr_education_status"
                  placeholder="Work Status"
                  value={formik.values.curr_education_status}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.curr_education_status &&
                    Boolean(formik.errors.curr_education_status)
                  }
                  helperText={
                    formik.touched.curr_education_status && formik.errors.curr_education_status
                  }
                  select
                >
                  {[
                    {
                      value: 'year1',
                      label: 'Year 1',
                    },
                    {
                      value: 'year2',
                      label: 'Year 2',
                    },
                    {
                      value: 'year3',
                      label: 'Year 3',
                    },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="mentor"
                >
                  <Typography color="CaptionText" variant="subtitle1">
                    Mentor
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  fullWidth
                  sx={{}}
                  id="mentor"
                  size="small"
                  name="mentor"
                  placeholder="mentor"
                  value={formik.values.mentor}
                  onChange={formik.handleChange}
                  error={formik.touched.mentor && Boolean(formik.errors.mentor)}
                  helperText={formik.touched.mentor && formik.errors.mentor}
                />
              </Box>
            </Stack>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box width="30%">
                <FormLabel
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.secondary',
                  }}
                  htmlFor="tshirt_size"
                >
                  <Typography
                    color="CaptionText"
                    variant="subtitle1"
                    sx={
                      {
                        // fontWeight: "bold",
                      }
                    }
                  >
                    T-shirt Size
                  </Typography>
                </FormLabel>
              </Box>
              <Box width="70%">
                <CustomTextField
                  sx={{
                    minWidth: '150px',
                  }}
                  id="tshirt_size"
                  size="small"
                  name="tshirt_size"
                  placeholder="T-shirt Size"
                  value={formik.values.tshirt_size}
                  onChange={formik.handleChange}
                  error={formik.touched.tshirt_size && Boolean(formik.errors.tshirt_size)}
                  helperText={formik.touched.tshirt_size && formik.errors.tshirt_size}
                  select
                >
                  {[
                    {
                      value: 'small',
                      label: 'S',
                    },
                    {
                      value: 'medium',
                      label: 'M',
                    },
                    {
                      value: 'large',
                      label: 'L',
                    },
                    {
                      value: 'xlarge',
                      label: 'XL',
                    },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomTextField>
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

export default ProfileForm
