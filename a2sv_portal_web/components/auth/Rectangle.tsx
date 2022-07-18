import { Box, SxProps } from '@mui/material'

type Props = {
  color: string
  padx: number
  pady: number
  margin: number
  borderRadius: number
}

const Rectangel = (myProps: Props) => {
  const props: SxProps = {
    bgcolor: myProps.color,
    px: myProps.padx,
    py: myProps.pady,
    m: myProps.margin,
    borderRadius: myProps.borderRadius,
  }
  return <Box sx={{ ...props }}></Box>
}

export default Rectangel
