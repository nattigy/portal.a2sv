import { createTheme } from '@mui/material'

const GlobalTheme = createTheme({
  palette: {
    primary: {
      main: '#2766B5',
    },
    secondary: {
      main: '#fff',
    },
    link: { main: '#2766B5' },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    body1: {
      fontSize: 14,
    },
  },
})

export default GlobalTheme
