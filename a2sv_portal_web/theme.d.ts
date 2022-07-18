import { PaletteColor, PaletteColorOptions, ThemeOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Pallete {
    link?: PaletteColor
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    link?: PaletteColorOptions
  }
}
