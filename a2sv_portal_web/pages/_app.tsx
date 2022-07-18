import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalTheme from '../styles/global.mui'
import { ThemeProvider } from '@mui/material/styles'

const theme = GlobalTheme
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
