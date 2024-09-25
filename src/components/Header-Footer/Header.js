/**
 * Header component for the application
 *
 * Implements dynamic imports to optimize performance by code splitting.
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from 'aws-amplify'

// Static Imports for Hooks and Utilities
import { useTheme, styled, alpha } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// Dynamic Imports for MUI Components
import { Suspense, lazy } from 'react'

// Dynamically import MUI Components
const AppBar = lazy(() => import('@mui/material/AppBar'))
const Toolbar = lazy(() => import('@mui/material/Toolbar'))
const Typography = lazy(() => import('@mui/material/Typography'))
const Button = lazy(() => import('@mui/material/Button'))
const IconButton = lazy(() => import('@mui/material/IconButton'))
const Menu = lazy(() => import('@mui/material/Menu'))
const MenuItem = lazy(() => import('@mui/material/MenuItem'))
const Divider = lazy(() => import('@mui/material/Divider'))
const ListItemText = lazy(() => import('@mui/material/ListItemText'))
const ListItemIcon = lazy(() => import('@mui/material/ListItemIcon'))
const Box = lazy(() => import('@mui/material/Box'))

// Dynamically import MUI Icons
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'))
const AccountCircle = lazy(() => import('@mui/icons-material/AccountCircle'))
const Settings = lazy(() => import('@mui/icons-material/Settings'))
const Logout = lazy(() => import('@mui/icons-material/Logout'))

// Styled component for PageLinks
const PageLinks = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  whiteSpace: 'nowrap',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(0.5, 1), // Adjusted padding for header height
  '&:hover': {
    background: alpha(theme.palette.text.primary, 0.1),
    transition: 'background-color 0.2s ease',
  },
}))

/**
 * Header component that includes navigation links and account menu.
 *
 * Utilizes dynamic imports to load components only when needed, improving performance.
 */
const Header = () => {
  // Access theme and determine if the view is mobile
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // State for main menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  // State for account menu
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null)

  // Handle user logout
  const handleLogout = async () => {
    try {
      await Auth.signOut()
      localStorage.clear()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  // Open main menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Close main menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Open account menu
  const handleAccountMenu = (event) => {
    setAccountMenuAnchorEl(event.currentTarget)
  }

  // Close account menu
  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null)
  }

  return (
    <Box
      sx={{
        flexGrow: 1, //* Makes page content responsive
      }}
    >
      {/* Suspense wraps the AppBar to handle lazy-loaded MUI components */}
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppBar
          position="static"
          sx={{
            bgcolor: 'transparent',
            borderRadius: '0px',
            boxShadow: 'none',
            borderBottom: '2px solid #e0e0e0',
          }}
        >
          <Toolbar
            //variant="dense" //! Reduces header height properly
            sx={{
              height: '100%',
              minHeight: 'unset',
            }}
          >
            {/* Logo/Brand Name */}
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                color: theme.palette.text.primary,
                flexGrow: 1,
                textDecoration: 'none',
              }}
            >
              CC
            </Typography>

            {/* Mobile View: Hamburger Menu */}
            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      background: alpha(theme.palette.text.primary, 0.1),
                      transition: 'background-color 0.3s ease',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
                {/* Suspense wraps the Menu component */}
                <Suspense fallback={<div>Loading Menu...</div>}>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem component={NavLink} to="/" onClick={handleClose}>
                      Home
                    </MenuItem>
                    <MenuItem component={NavLink} to="/about" onClick={handleClose}>
                      Courses
                    </MenuItem>
                    <MenuItem
                      component={NavLink}
                      to="/problems/icpc"
                      onClick={handleClose}
                    >
                      Problems
                    </MenuItem>
                    <MenuItem
                      component={NavLink}
                      to="/problems/interview"
                      onClick={handleClose}
                    >
                      Interview Prep
                    </MenuItem>
                    <Divider component="li" variant="middle" />
                    <MenuItem
                      component={NavLink}
                      to="/settings"
                      onClick={handleClose}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Suspense>
              </>
            ) : (
              <>
                {/* Desktop View: Navigation Links */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <PageLinks component={NavLink} to="/" activeClassName="active">
                    Home
                  </PageLinks>
                  <PageLinks component={NavLink} to="/about" activeClassName="active">
                    Courses
                  </PageLinks>
                  <PageLinks component={NavLink} to="/problems/icpc" activeClassName="active">
                    Problems
                  </PageLinks>
                  <PageLinks component={NavLink} to="/problems/interview" activeClassName="active">
                    Interview Prep
                  </PageLinks>
                  {/*<PageLinks
                    component={NavLink}
                    to="/manage-problems"
                    activeClassName="active"
                  >
                    Manage Problems
                  </PageLinks>*/}
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" />
                {/* Account Icon and Menu */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1,
                  }}
                >
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={handleAccountMenu}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:hover': {
                        background: alpha(theme.palette.text.primary, 0.1),
                        transition: 'background-color 0.3s ease',
                      },
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                  {/* Suspense wraps the Account Menu */}
                  <Suspense fallback={<div>Loading Account Menu...</div>}>
                    <Menu
                      id="account-menu"
                      anchorEl={accountMenuAnchorEl}
                      open={Boolean(accountMenuAnchorEl)}
                      onClose={handleAccountMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleAccountMenuClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleAccountMenuClose}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText onClick={handleLogout}>Logout</ListItemText>
                      </MenuItem>
                    </Menu>
                  </Suspense>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Suspense>
    </Box>
  )
}

export default Header
