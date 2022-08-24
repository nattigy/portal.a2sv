import type { AppProps } from 'next/app'
import GlobalTheme from '../styles/global.mui'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import "../styles/globals.css"

const theme = GlobalTheme
function MyApp({ Component, pageProps }: AppProps) {


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default MyApp
