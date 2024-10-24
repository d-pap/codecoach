import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import theme from '../../theme'
import { useCookies } from 'react-cookie'

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false)
  const [cookies, setCookie] = useCookies(['userConsent', 'consentResponse'])

  // Calculate expiration dates
  const oneYearFromNow = new Date()
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

  //   const oneMonthFromNow = new Date()
  //   oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)

  useEffect(() => {
    const { userConsent, consentResponse } = cookies
    // log
    console.log('userConsent:', userConsent)
    if (!consentResponse) {
      if (userConsent === undefined) {
        // No consent given yet and no recent response, show banner
        setVisible(true)
      }
    }
    // If consentResponse exists, do not show the banner
  }, [cookies])

  const handleConsent = (consent) => {
    // Set the 'userConsent' cookie to 'true' or 'false' with a 1-year expiration
    setCookie('userConsent', consent.toString(), {
      path: '/',
      expires: oneYearFromNow,
      // secure: true, // Uncomment during build
      sameSite: 'Lax', // Helps protect against CSRF attacks
    })

    // Set the 'consentResponse' cookie to track that the user has responded
    setCookie('consentResponse', 'true', {
      path: '/',
      // secure: true, // Uncomment during build
      sameSite: 'Lax', // Helps protect against CSRF attacks
    })

    setVisible(false)
  }

  if (!visible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: theme.palette.primary.black,
        color: theme.palette.text.white,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1300, // Ensure it stays above other elements
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.primary,
          fontWeight: 500,
          marginBottom: { xs: theme.spacing(1), sm: 0 },
        }}
      >
        We use cookies to improve your experience. By continuing, you accept our
        use of cookies.
      </Typography>
      <Box sx={{ display: 'flex', gap: theme.spacing(2) }}>
        <Button
          variant="contained"
          onClick={() => handleConsent(true)}
          sx={{
            fontWeight: 700,
            color: theme.palette.primary,
            backgroundColor: theme.palette.primary.blue,
            '&:hover': {
              backgroundColor: theme.palette.primary.green,
            },
          }}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleConsent(false)}
          sx={{
            fontWeight: 700,
            color: theme.palette.text.white,
            borderColor: theme.palette.text.white,
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: theme.palette.primary.blue,
            },
          }}
        >
          Decline
        </Button>
      </Box>
    </Box>
  )
}

export default ConsentBanner
