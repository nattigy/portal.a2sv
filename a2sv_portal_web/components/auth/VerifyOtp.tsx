import { Button, Grid, Typography, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import OtpInput from 'react-otp-input'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  const config = isMatch ? { width: 35, height: 35 } : { width: 50, height: 50 }

  const handleChange = (otpVal: string) => {
    setOtp(otpVal)
  }
  const handleSubmit = () => {
    if (otp.length < 6) {
      //implement code submission
      setOtpError(true)
      setOtp('')
    } else {
      router.push('/auth/reset-password')
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Forgot password</Typography>
      </Grid>
      <Grid item xs={12} >
        <Stack direction="column" justifyContent="center">

          <Typography sx={{ width: "100%", textAlign: 'center', }} variant="caption" align='center'>
            Please enter the verification code sent to the email{' '}
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <strong>user@example.com</strong>
          </Typography>
        </Stack>
      </Grid>
      <Grid my={2} item xs={12}>
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
<<<<<<< HEAD
            ...config,
=======
            width: 50,
            height: 50,
>>>>>>> 84bb93a (feat(web): setup tailwindcss)
            borderRadius: '5px',
            border: 'none',
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: '#DFDFDF',
            fontWeight: 'bold',
            fontSize: 16,
          }}
          focusStyle={{ border: 'none' }}
          hasErrored={otpError}
          errorStyle={{ border: otpError ? '1px solid #FF6060' : '' }}
        />
        {otpError ? (
          <Typography sx={{ color: '#FF6060' }}>
            please enter the code sent to you email address
          </Typography>
        ) : (
          <></>
        )}
      </Grid>
      <Grid my={2} item xs={12}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ boxShadow: '10', borderRadius: 2, height: "50px" }}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography>Did not receive the code?</Typography>
        <Typography sx={{ color: 'link.main', ml: 0.5 }}>
          <Link href="/auth/reset-password/verify">
            <a>Resend</a>
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VerifyOtp