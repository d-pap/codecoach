import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // for buttons, active links/tabs
      main: '#6C63FF',
    },
    background: {
      default: '#fffffe',
      paper: '#fffffe', // card background, etc.
    },
    text: {
      primary: '#333333',
      //secondary: '#6C63FF', // search box bg, unactive tabs
    },
    divider: '#0000001f',
    caution: {
      // yellow card on home page
      main: '#856404', // font color
      bg: '#FFF3CD',
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
      color: '#333333', //TODO: update color
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
    code: {
      // for code output window Box
      fontFamily: 'monospace',
      fontSize: '14', // match ace editor font size
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16, // paper border radius
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // don't capitalize button text
          borderRadius: 16, // button border radius
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16, // select border radius
          fontSize: '0.875rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 16, // menu border radius
        },
      },
    },
    MuiInputBase: {
      // search box on icpc page
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 16, // list item border radius
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#333333',
          '& .MuiTypography-root': {
            fontSize: '0.875rem',
          },
        },
      },
    },
  },
})

// export theme:
export default theme
