import React from 'react'
import { Box, Modal } from '@mui/material'
import { Authenticator } from '@aws-amplify/ui-react'
import { ThemeProvider as AmplifyThemeProvider } from '@aws-amplify/ui-react'

// // Define your custom Amplify theme
// const amplifyTheme = {
//   name: 'MyCustomTheme',
//   tokens: {
//     colors: {
//       background: {
//         primary: { value: '#ffffff' }, // Background color
//       },
//       font: {
//         primary: { value: '#333333' }, // Font color
//         secondary: { value: '#6C63FF' }, // Secondary font color
//       },
//       border: {
//         primary: { value: '#333333' }, // Border color
//       },
//     },
//     components: {
//       button: {
//         primary: {
//           backgroundColor: { value: '#6C63FF' }, // Button background color
//           color: { value: '#ffffff' }, // Button text color
//           borderRadius: { value: '8px' }, // Button border radius
//         },
//       },
//     },
//   },
// }

const amplifyTheme = {
  name: 'MyCustomTheme',
  tokens: {
    fonts: {
      default: {
        variable: { value: "'Roboto', sans-serif" },
        static: { value: "'Roboto', sans-serif" },
      },
    },
    colors: {
      background: {
        primary: { value: '#fffffe' },
      },
      font: {
        interactive: { value: '#333333' },
        secondary: { value: '#333333' },
      },
    },
    radii: {
      medium: { value: '16px' },
    },
    components: {
      authenticator: {
        router: {
          boxShadow: { value: 'none' },
          borderWidth: { value: '0' },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: '#6C63FF' },
          _hover: {
            backgroundColor: { value: '#5A52CC' },
          },
          color: { value: '#ffffff' },
          borderRadius: { value: '{radii.medium.value}' },
        },
        link: {
          color: { value: '#333333' },
          _hover: {
            color: { value: '#333333' },
            backgroundColor: { value: 'none' },
          },
        },
      },
      tabs: {
        item: {
          color: { value: '#A9A9A9' },
          _hover: {
            color: { value: '#333333' },
          },
          _focus: {
            color: { value: '#333333' },
          },
        },
      },
      fieldcontrol: {
        borderRadius: { value: '{radii.medium.value}' },
      },
    },
  },
}

const AuthModal = ({ open, onClose, initialState, onAuthenticated }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="auth-modal"
      aria-describedby="authentication-dialog"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: (theme) => theme.spacing(2, 4, 0),
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
          borderRadius: (theme) => theme.spacing(2),
        }}
      >
        <AmplifyThemeProvider theme={amplifyTheme}>
          <Authenticator
            initialState={initialState}
            className="custom-authenticator"
          >
            {() => {
              onAuthenticated()
              return null
            }}
          </Authenticator>
        </AmplifyThemeProvider>
      </Box>
    </Modal>
  )
}

export default AuthModal
