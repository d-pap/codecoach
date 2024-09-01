import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { styled, alpha } from '@mui/material/styles'
import { Auth } from 'aws-amplify'

// Styled Nav buttons
const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  whiteSpace: 'nowrap',
  margin: theme.spacing(0, 1),
  '&:hover': {
    background: alpha(theme.palette.text.primary, 0.1),
    transition: 'background-color 0.2s ease',
  },
}))

const Navbar = () => {
  const theme = useTheme()
  useMediaQuery(theme.breakpoints.down('sm'))
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleLogout = async () => {
    try {
      await Auth.signOut()
      localStorage.clear()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out: ', error)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={RouterLink} to="/problems">
          <ListItemText primary="Problems" />
        </ListItem>
        <ListItem button component={RouterLink} to="/addProblems">
          <ListItemText primary="Add Problems" />
        </ListItem>
      </List>
    </Box>
  )

  const menuId = 'primary-search-account-menu'

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: '56px', // height of the header
        }}
      >
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'none' },
            p: (theme) => theme.spacing(2),
            color: (theme) => theme.palette.text.primary,
            '&:hover': {
              background: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          {drawer}
        </Drawer>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            p: (theme) => theme.spacing(0), //! padding between link and divider
          }}
        >
          <NavLink component={RouterLink} to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink component={RouterLink} to="/about" activeClassName="active">
            Courses
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/problems"
            activeClassName="active"
          >
            Problems
          </NavLink>
          <NavLink
            component={RouterLink}
            to="/addProblems"
            activeClassName="active"
          >
            Add Problems
          </NavLink>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: (theme) => theme.spacing(1),
            pl: (theme) => theme.spacing(1),
          }}
        >
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{
              color: (theme) => theme.palette.text.primary,
              '&:hover': {
                background: alpha(theme.palette.text.primary, 0.1),
                transition: 'background-color 0.3s ease',
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={handleLogout}>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
