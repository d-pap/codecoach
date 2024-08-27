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
import PersonAdd from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { styled, alpha } from '@mui/material/styles'

// Styled Nav buttons
const NavLink = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  borderRadius: theme.spacing(2),
  whiteSpace: 'nowrap',
  margin: '5px',
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
    // <AppBar position="static" sx={{ borderBottom: "2px solid #468585", backgroundColor: "transparent" }}>
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'transparent',
        borderRadius: '6px', // rounded corners for button container
        boxShadow: 'none', // remove shadow
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '56px', // height of the header is set here
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            p: '20px', //! fix this - there was nothing set here for padding
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
            padding: '15px',
            paddingRight: '20px',
          }}
        >
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            //color="default" //! color of the icon (it was 'inherit' when header was green and we didnt have sx prop below either:)
            sx={{
              color: '#1f1f1f', //! Icon color
              '&:hover': {
                background: alpha('#1f1f1f', 0.1),
                color: '#1f1f1f',
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
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/signin"
            >
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign In</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/signup"
            >
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </MenuItem>
            <Divider variant="middle" />

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
