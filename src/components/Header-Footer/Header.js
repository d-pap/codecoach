/**
 * Header component for the application
 *
 * TODO: change MUI imports to path imports, not named imports like we have here to reduce bundle size
 * TODO:      https://mui.com/material-ui/guides/minimizing-bundle-size/
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Box,
  Divider,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

const PageLinks = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  whiteSpace: 'nowrap',
  margin: theme.spacing(0, 1),
  p: theme.spacing(0.5, 1), //TODO: adjust padding for header height???? added this line to fix smaller header issues
  '&:hover': {
    background: alpha(theme.palette.text.primary, 0.1),
    transition: 'background-color 0.2s ease',
  },
}))

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null) // state for account menu

  const handleLogout = async () => {
    try {
      await Auth.signOut()
      localStorage.clear()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountMenu = (event) => {
    setAccountMenuAnchorEl(event.currentTarget) // open account menu
  }

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null) // close account menu
  }

  return (
    <Box
      sx={{
        flexGrow: 1, //* makes page content responsive
      }}
    >
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
          //variant="dense" //! reduces header height properly
          sx={{
            height: '100%',
            minHeight: 'unset',
          }}
        >
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              color: (theme) => theme.palette.text.primary,
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            CC
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  '&:hover': {
                    background: alpha(theme.palette.text.primary, 0.1),
                    transition: 'background-color 0.3s ease',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
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
                  to="/problems"
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
                <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PageLinks component={NavLink} to="/" activeClassName="active">
                  Home
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/about"
                  activeClassName="active"
                >
                  Courses
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/problems/icpc"
                  activeClassName="active"
                >
                  Problems
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/problems/interview"
                  activeClassName="active"
                >
                  Interview Prep
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/manage-problems"
                  activeClassName="active"
                >
                  Manage Problems
                </PageLinks>
              </Box>
              <Divider orientation="vertical" flexItem variant="middle" />
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
                    color: (theme) => theme.palette.text.primary,
                    '&:hover': {
                      background: alpha(theme.palette.text.primary, 0.1),
                      transition: 'background-color 0.3s ease',
                    },
                  }}
                >
                  <AccountCircle />
                </IconButton>
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
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
