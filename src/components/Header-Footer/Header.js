import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useMediaQuery, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, alpha } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import logo from '../../images/logo-with-text.svg'
import CenteredCircleLoader from '../utility/CenteredLoader'

const PageLinks = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  whiteSpace: 'nowrap',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(0.5, 1),
  '&:hover': {
    background: alpha(theme.palette.text.primary, 0.1),
    transition: 'background-color 0.2s ease',
  },
}))

const Header = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = React.useState(null)
  const [loading, setLoading] = React.useState(false) // Loading state

  const handleLogout = async () => {
    setLoading(true) // Start loading
    try {
      await Auth.signOut()
      localStorage.clear()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out: ', error)
      alert('Error signing out. Please try again.')
      setLoading(false) // Stop loading if there's an error
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountMenu = (event) => {
    setAccountMenuAnchorEl(event.currentTarget)
  }

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null)
  }

  if (loading) {
    // Render the loader when loading is true
    return (
      <Box>
        <CenteredCircleLoader />
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
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
          sx={{
            height: '100%',
            minHeight: 'unset',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component="img"
            onClick={() => {
              navigate('/home')
            }}
            src={logo}
            alt="logo"
            sx={{
              height: '100%',
              maxHeight: '60px',
              width: 'auto',
              maxWidth: '100%',
              cursor: 'pointer',
            }}
          />

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
                <MenuItem
                  component={NavLink}
                  to="/courses"
                  onClick={handleClose}
                >
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
                  to="/interviews"
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
                <MenuItem
                  onClick={() => {
                    handleClose()
                    handleLogout()
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PageLinks
                  component={NavLink}
                  to="/home"
                  activeClassName="active"
                >
                  Home
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/courses"
                  activeClassName="active"
                >
                  Courses
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/problems"
                  activeClassName="active"
                >
                  Problems
                </PageLinks>
                <PageLinks
                  component={NavLink}
                  to="/interviews"
                  activeClassName="active"
                >
                  Interview Prep
                </PageLinks>

                {/* <PageLinks
                  component={NavLink}
                  to="/manage-problems"
                  activeClassName="active"
                >
                  Manage Problems
                </PageLinks> */}
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                variant="middle"
                sx={{ mx: 1 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
