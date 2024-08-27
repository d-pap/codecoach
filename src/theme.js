import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  /**
   * TODO:
   * - fonts
   * - colors for button hover, links(?)
   * - divider color
   *
   */
  palette: {
    mode: 'light',
    primary: {
      // for buttons bg, active links
      main: '#6C63FF',
    },
    background: {
      default: '#fffffe', // main background color
      paper: '#fffffe', // card background, etc.
      caution: '#FFF3CD', // caution color
    },
    text: {
      primary: '#333333', // default font color
      secondary: '#6C63FF', // secondary font color
    },
    divider: '#0000001f', // default color
    caution: {
      main: '#856404', // caution font color
      bg: '#FFF3CD', // caution background color
    },
  },
  shape: {
    borderRadius: 8, // border radius
  },
  spacing: 8, // default spacing unit
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif', //TODO: update these fonts here and in index.css!
    fontSize: 14, // default font size
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '6rem',
      lineHeight: 1.167, // default h1 line height
      letterSpacing: '-0.01562em', // default h1 letter spacing
      color: '#000000', //TODO: update color
    },
    h2: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 300,
      fontSize: '3.75rem',
      letterSpacing: '-0.00833em', // default h2 letter spacing
    },
    h3: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '3rem',
    },
    h4: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '2.125rem',
    },
    h5: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5, // default body text line height
      letterSpacing: '0.00938em', // default body text letter spacing
      color: '#333333',
    },
    body2: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.43, // default body text line height
      letterSpacing: '0.01071em', // default body text letter spacing
      color: '#333333',
    },
    button: {
      //TODO: update this
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.75, // default button text line height
      letterSpacing: '0.02857em', // default button text letter spacing
      textTransform: 'none', //! dont capitalize button text?
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // don't capitalize button text
          borderRadius: 16, // button border radius
        },
      },
    },
  },
})

// export theme:
export default theme
