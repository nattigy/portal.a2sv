import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SuccessCard = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/')
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image src={'/assets/imgs/success.png'} alt="Success" width={150} height={180} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Password successfully changed</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          fullWidth
          sx={{ boxShadow: '10', borderRadius: 2 }}
          onClick={handleClick}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  )
}

export default SuccessCard
