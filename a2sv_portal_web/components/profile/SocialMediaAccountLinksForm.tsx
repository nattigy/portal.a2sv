import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, FormLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import * as yup from 'yup'
import { Box } from '@mui/system'
import { styled } from '@mui/material/styles'
import SuccessModal from './SuccessModal'

interface IObjectKeys {
  [key: string]: string | number
}

interface FormValues extends IObjectKeys {
  telegram: string
  codeforces: string
  leetcode: string
  hackerrank: string
  geekforgeeks: string
  website: string
  github: string
  linkedin: string
  twitter: string
  instagram: string
  stackoverflow: string
}

const validationSchema = yup.object({
  telegram: yup.string().required('Telegram profile link is required'),
  leetcode: yup.string().required('Leetcode profile link is required'),
  codeforces: yup.string().required('Codeforces profile link is required'),
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

interface ISocialMediaAccount {
  label: string
  value: string
  domain: string
  id: string
  icon: string
}

const SocialMediaAccountLinksForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const initialValues: FormValues = {
    telegram: '',
    codeforces: '',
    leetcode: '',
    hackerrank: '',
    geekforgeeks: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    stackoverflow: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      console.log(values)
      setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
    },
  })

  const socialMediaAccounts: Array<ISocialMediaAccount> = [
    {
      label: 'Telegram',
      value: 'telegram',
      domain: 't.me/',
      icon: 'telegram',
      id: 'telegram',
    },
    {
      label: 'Codeforces',
      value: 'codeforces',
      domain: 'codeforces.com/',
      icon: 'codeforces',
      id: 'codeforces',
    },
    {
      label: 'Leetcode',
      value: 'leetcode',
      domain: 'leetcode.com/',
      icon: 'leetcode',
      id: 'leetcode',
    },
    {
      label: 'HackerRank',
      value: 'hackerrank',
      domain: 'hackerrank.com/',
      icon: 'hackerrank',
      id: 'hackerrank',
    },
    {
      label: 'Geeksforgeeks',
      value: 'geeksforgeeks',
      domain: 'geeksforgeeks.com/',
      icon: 'geeksforgeeks',
      id: 'geeksforgeeks',
    },
    {
      label: 'Website',
      value: 'website',
      domain: '',
      icon: 'website',
      id: 'website',
    },
    {
      label: 'Github',
      value: 'github',
      domain: 'github.com/',
      icon: 'github',
      id: 'github',
    },
    {
      label: 'Linkedin',
      value: 'linkedin',
      domain: 'linkedin.com/in/',
      icon: 'linkedin',
      id: 'linkedin',
    },
    {
      label: 'Twitter',
      value: 'twitter',
      domain: 'twitter.com/',
      icon: 'twitter',
      id: 'twitter',
    },
    {
      label: 'Instagram',
      value: 'instagram',
      domain: 'instagram.com/',
      icon: 'instagram',
      id: 'instagram',
    },
    {
      label: 'Stackoverflow',
      value: 'stackoverflow',
      domain: 'stackoverflow.com/',
      icon: 'stackoverflow',
      id: 'stackoverflow',
    },
  ]

  return (
    <Box>
      <SuccessModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} />
      <Box
        sx={{
          my: 4,
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
                sm: '10%',
              },
            }}
          >
            {socialMediaAccounts.map((smAccount) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    gap: '10px',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                  }}
                  key={smAccount.id}
                >
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                        sm: '30%',
                      },
                    }}
                  >
                    <FormLabel
                      sx={{
                        fontWeight: 'bold',
                        color: 'text.secondary',
                      }}
                      htmlFor="username"
                    >
                      <Stack sx={{}} direction="row" spacing={1} alignItems="center">
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          width="25px"
                          height="25px"
                        >
                          <img
                            width="100%"
                            height="100%"
                            src={`/assets/imgs/icons/${smAccount.icon}.svg`}
                            alt={smAccount.label}
                          />
                        </Box>
                        <Typography color="CaptionText" variant="subtitle1">
                          {smAccount.label}
                        </Typography>
                      </Stack>
                    </FormLabel>
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                        sm: '70%',
                      },
                    }}
                  >
                    <CustomTextField
                      fullWidth
                      sx={{}}
                      id={smAccount.id}
                      size="small"
                      name={smAccount.value}
                      placeholder={smAccount.value}
                      value={formik.values[smAccount.value]}
                      onChange={formik.handleChange}
                      error={
                        formik.touched[smAccount.value] && Boolean(formik.errors[smAccount.value])
                      }
                      helperText={formik.touched[smAccount.value] && formik.errors[smAccount.value]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{
                              height: '100%',
                            }}
                          >
                            {smAccount.domain}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              )
            })}

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
    </Box>
  )
}

export default SocialMediaAccountLinksForm
