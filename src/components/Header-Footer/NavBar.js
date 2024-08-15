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
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { styled } from '@mui/system'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Styled NavLink component using MUI
const NavLink = styled(Button)(({ theme }) => ({
  color: '#DEF9C4',
  textDecoration: 'none',
  borderRadius: '10px', // rounded corners for navbar buttons
  whiteSpace: 'nowrap', // Prevent text wrapping
  margin: '0 15px', // Add more margin between links
  '&:hover': {
    background: '#9CDBA6',
    color: '#468585',
  },
  '&.active': {
    color: '#DEF9C4',
    backgroundColor: '#50B498', // Active background color
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
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
      sx={{ backgroundColor: 'transparent', borderRadius: '6px' }} // rounded corners for button container
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
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          <NavLink component={RouterLink} to="/" activeClassName="active">
            Home
          </NavLink>
          <NavLink component={RouterLink} to="/about" activeClassName="active">
            About
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingRight: '20px',
          }}
        >
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
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
              Log In
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={RouterLink}
              to="/signup"
            >
              Sign Up
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
