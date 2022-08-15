import { createTheme, ThemeOptions } from '@mui/material'

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
      primary: '#656565',
      secondary: '#656565',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: 12,
    },
  },
})

export default GlobalTheme
