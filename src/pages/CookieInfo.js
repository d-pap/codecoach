import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  CardContent,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import { useCookies } from 'react-cookie'
import { useTheme } from '@mui/material/styles'
import CookieIcon from '@mui/icons-material/Cookie'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  boxShadow: theme.shadows[6],
  backgroundColor: theme.palette.background.paper,
}))

const CookieInfo = () => {
  const theme = useTheme()
  const [cookies, setCookie, removeCookie] = useCookies(['userConsent'])
  const [cookiesEnabled, setCookiesEnabled] = useState(true)

  useEffect(() => {
    const { userConsent } = cookies
    if (userConsent === 'false') {
      setCookiesEnabled(false)
    }
  }, [cookies])

  const handleDisableCookies = () => {
    setCookie('userConsent', 'false', {
      path: '/',
      expires: new Date('1970-01-01'), // Expire the cookie immediately
      sameSite: 'Lax',
    })
    removeCookie('userConsent', { path: '/' })
    setCookiesEnabled(false)
  }

  const handleEnableCookies = () => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
    setCookie('userConsent', 'true', {
      path: '/',
      expires: oneYearFromNow,
      sameSite: 'Lax',
    })
    setCookiesEnabled(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 2 }}
        >
          Cookie Policy
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Learn about how we use cookies on our website
        </Typography>
        <StyledCard>
          <CardContent>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CookieIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      At CodeCoach, your privacy is our priority. We do not
                      collect or track any personal information regarding your
                      usage. This includes how you write code, the duration of
                      your sessions, or any activities performed on our website.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CookieIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      We utilize cookies solely for convenience and to maintain
                      settings across sessions. These cookies remember your
                      preferences, such as theme selection, chosen programming
                      languages, and other configurations to improve your user
                      experience.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CookieIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      Cookies enable a seamless experience on our platform.
                      However, you have the option to disable them if you
                      prefer.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CookieIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      Removing cookies will not restrict your access to any of
                      our features.
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CookieIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      Disabling cookies will erase all your preferences,
                      requiring you to reset them once cookies are re-enabled.
                    </Typography>
                  }
                />
              </ListItem>
            </List>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              {cookiesEnabled ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CancelIcon />}
                  onClick={handleDisableCookies}
                >
                  Disable Cookies
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleEnableCookies}
                >
                  Enable Cookies
                </Button>
              )}
            </Stack>
          </CardContent>
        </StyledCard>
      </Container>
    </Box>
  )
}

export default CookieInfo
