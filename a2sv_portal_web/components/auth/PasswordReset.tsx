import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import Textfield from './TextField'
import Image from 'next/image'
import ButtonWrapper from './Button'
import OtpInput from 'react-otp-input'
import Link from 'next/link'

interface ButtonText {
  1: string
  2: string
  3: string
  4: string
}

const buttonText: ButtonText = {
  1: 'Send',
  2: 'Change password',
  3: 'Submit',
  4: 'Continue',
}

const PasswordResetForm = () => {
  const [id, setId] = useState(1)
  const buttonClick = () => {
    console.log(id)
    const _id = id + 1
    setId(_id)
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {id == 1 ? (
            <ResetForm1 handleClick={buttonClick} />
          ) : id === 2 ? (
            <ResetForm2 handleClick={buttonClick} />
          ) : id === 3 ? (
            <ResetForm3 handleClick={buttonClick} />
          ) : (
            <ResetForm4 />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

const ResetForm1 = (props: { handleClick: () => void }) => {
  const [INITIAL_VALUE_STATE, setValue] = useState({ email: '' })
  const FORM_VALIDATION = yup.object().shape({
    email: yup.string().required('Required'),
  })
  return (
    <Formik
      initialValues={INITIAL_VALUE_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={(value) => {
        props.handleClick()
        setValue(value)
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Forgot password</Typography>
            <Typography>We will send you an email to reset your password</Typography>
          </Grid>
          <Grid item xs={12}>
            <Textfield name="email" label="Enter your email" />
          </Grid>

          <Grid item xs={12}>
            <ButtonWrapper>{buttonText[1 as keyof ButtonText]}</ButtonWrapper>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

const ResetForm2 = (props: { handleClick: () => void }) => {
  const [INITIAL_VALUE_STATE, setValue] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const FORM_VALIDATION = yup.object().shape({
    newPassword: yup.string().required('Required'),
    confirmPassword: yup.string().required('Required'),
  })
  return (
    <Formik
      initialValues={INITIAL_VALUE_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={(value) => {
        props.handleClick()
        setValue(value)
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Change password</Typography>
          </Grid>
          <Grid item xs={12}>
            <Textfield name="newPassword" label="New password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <Textfield name="confirmPassword" label="Confirm new password" type="password" />
          </Grid>
          <Grid item xs={12}>
            <ButtonWrapper>{buttonText[2 as keyof ButtonText]}</ButtonWrapper>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

const ResetForm3 = (props: { handleClick: () => void }) => {
  const [otp, setOtp] = useState('')
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  const config = isMatch ? { width: 20, maxHeight: 30 } : { width: 35, height: 35 }

  const handleChange = (otpVal: string) => {
    setOtp(otpVal)
  }
  const handleSubmit = () => {
    //implement code submission
    if (otp.length == 6) {
      props.handleClick()
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Forgot password</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Please enter the verification code sent to the email user@example.com
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          isInputNum
          containerStyle={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          inputStyle={{
            ...config,
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#EFF3F3',
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          {buttonText[3 as keyof ButtonText]}
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography>Did not receive the code?</Typography>
        <Typography sx={{ color: 'link.main', ml: 0.5 }}>
          <Link href="/auth/password_reset">
            <a>Resend</a>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}
const ResetForm4 = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={'/assets/imgs/success.png'} alt="Success" width={60} height={70} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Password successfully changed</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" fullWidth>
          {buttonText[4 as keyof ButtonText]}
        </Button>
      </Grid>
    </Grid>
  )
}
export default PasswordResetForm
