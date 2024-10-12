import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // for buttons, active links/tabs
      main: '#0f172a',
      highlighted: '#f1f5f9',
    },
    background: {
      default: '#fffffe',
      paper: '#fffffe', // card background, etc.
    },
    text: {
      primary: '#0f172a',
      white: '#f0f0f0',
    },
    divider: '#0000001f',
  },
  shape: {
    borderRadius: 8, // border radius
  },
  spacing: 8, // default spacing unit
  typography: {
    fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
    fontSize: 14, // default font size
    lineHeight: 1.6,
    letterSpacing: 0,
    h1: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2.027rem',
      color: '#0f172a',
    },
    h2: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.802rem',
      color: '#0f172a',
    },
    h3: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.602rem',
      color: '#0f172a',
    },
    h4: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.424rem',
      color: '#0f172a',
    },
    h5: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1.266rem',
      color: '#0f172a',
    },
    h6: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      color: '#0f172a',
    },
    subtitle1: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#0f172a',
    },
    body1: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#0f172a',
    },
    body2: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.889rem',
      color: '#64748b ',
    },
    code: {
      // for code output window Box
      fontFamily: 'monospace',
      fontSize: '14', // match ace editor font size
    },
    button: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.889rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
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
          //padding: '8px 24px', // button padding
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16, // select border radius
          fontSize: '0.889rem',
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
          fontSize: '0.889rem',
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
          color: '#0f172a',
          '& .MuiTypography-root': {
            fontSize: '0.889rem',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.889rem',
        },
      },
    },
  },
})

export default theme
