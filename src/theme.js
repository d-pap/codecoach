import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // for buttons, active links/tabs
      light50: '#f8fafc',
      light100: '#f1f5f9',
      light200: '#e2e8f0',
      light300: '#cbd5e1',
      light400: '#94a3b8',
      light500: '#64748b',
      light600: '#475569',
      light700: '#334155',
      light800: '#1e293b',
      main: '#0f172a',
      darker: '#0D0B20',
      darkest: '#0F0716',
      error: {
        main: '#dc2626',
        light: '#ef4444',
      },
    },
    text: {
      primary: '#0f172a',
      white: '#f0f0f0',
    },
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
      fontSize: '3rem',
      lineHeight: '3rem',
      color: '#0f172a',
      letterSpacing: '-0.012em',
    },
    h2: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
      color: '#0f172a',
    },
    h3: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: '2rem',
      color: '#0f172a',
    },
    h4: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      color: '#0f172a',
    },
    h5: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: '2rem',
      color: '#0f172a',
    },
    h6: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      color: '#0f172a',
    },
    h7: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontSize: '1rem',
      color: '#000000',
      letterSpacing: '0.01071em',
      lineHeight: '1.75rem', //! new
    },
    subtitle1: {
      // for section subtitles
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#334155',
      lineHeight: '1.75rem', //! new
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      // for card subtitles (smaller subtitles)
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 500,
      color: '#64748b',
      fontSize: '0.875rem',
      lineHeight: '1.25rem', //! new
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      color: '#0f172a',
      lineHeight: '1.75rem', //! new
    },
    body2: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem', //! new
      lineHeight: '1.25rem', //! new
      color: '#64748b',
      letterSpacing: '0.01071em',
    },
    small: {
      fontFamily: 'Helvetica, Roboto, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      color: '#0f172a',
    },
    code: {
      // for code output window Box
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      fontSize: '0.889rem', // match ace editor font size
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
