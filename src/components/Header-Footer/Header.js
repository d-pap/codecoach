import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useMediaQuery, useTheme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, alpha } from '@mui/material/styles'
import logo from '../../images/logo-with-text.svg'
import CenteredCircleLoader from '../utility/CenteredLoader'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SchoolIcon from '@mui/icons-material/SchoolOutlined'
import AutoStoriesIcon from '@mui/icons-material/AutoStoriesOutlined'
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined'
import WorkIcon from '@mui/icons-material/WorkOutlineOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined'
import Logout from '@mui/icons-material/Logout'

// component for links without a dropdown menu
const PageLinks = styled(NavLink)(({ theme }) => ({
  color: theme.palette.primary.light500,
  textDecoration: 'none',
  fontWeight: 'bold',
  letterSpacing: '0.01em',
  fontSize: theme.typography.body2.fontSize,
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5, 1),
  '&.active': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    transition: 'color 0.3s ease',
  },
}))

const ArrowIcon = styled(KeyboardArrowDownIcon)(({ theme, isOpen }) => ({
  transition: 'transform 0.3s ease',
  marginLeft: theme.spacing(0.5),
  // rotate icon when dropdown opens
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
}))

// component for header links that have a dropdown menu (courses, problems, account)
const DropdownWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '&:hover .MuiBox-root': {
    display: 'block',
  },
  '&:hover .arrow-icon': {
    transform: 'rotate(180deg)',
  },
}))

// container for opened dropdown menu
const DropdownContent = styled(Box)(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  minWidth: '280px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(0, 0, 2, 2),
  zIndex: 1000,
  top: 'calc(100% + 18px)',
  border: `1px solid ${theme.palette.divider}`,
  right: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'transparent',
  },
}))

// each link in the dropdown menu
const DropdownLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'flex-start',
  //fontSize: theme.typography.body2.fontSize,
  borderRadius: theme.spacing(2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  '& .MuiListItemIcon-root': {
    // icons in dropdown menu
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    marginTop: '2px',
  },
  '& .link-title': {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginBottom: '2px',
  },
  '& .link-description': {
    color: theme.palette.primary.light500,
    fontSize: '0.8rem',
  },
}))

const Header = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [loading, setLoading] = React.useState(false) // Loading state
  const location = useLocation()
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)

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
    event.preventDefault()
    setAccountMenuOpen(!accountMenuOpen)
  }

  const handleAccountMenuClose = () => {
    setAccountMenuOpen(false)
  }

  const problemsDropdown = [
    {
      title: 'Competitions',
      path: '/problems/competitions',
      icon: <EmojiEventsIcon fontSize="small" color="primary" />,
      description: 'Practice with competitive programming challenges',
    },
    {
      title: 'Interviews',
      path: '/problems/interviews',
      icon: <WorkIcon fontSize="small" color="primary" />,
      description:
        'Prepare for technical interviews with common FAANG challenges',
    },
  ]

  const coursesDropdown = [
    {
      title: 'Course Catalog',
      path: '/courses',
      icon: <SchoolIcon fontSize="small" color="primary" />,
      description: 'Browse our catalog of curated courses ',
    },
    {
      title: 'My Courses',
      path: '/courses',
      icon: <AutoStoriesIcon fontSize="small" color="primary" />,
      description: 'Access your saved courses (coming soon)',
    },
  ]

  const accountDropdown = [
    {
      title: 'Resume',
      path: '/resume',
      icon: <ContactPageOutlinedIcon fontSize="small" color="primary" />,
      description:
        'Craft a professional resume with AI tailored to a job description',
    },
    {
      title: 'Help',
      path: '/help',
      icon: <HelpOutlineOutlinedIcon fontSize="small" color="primary" />,
      description: 'Get support and documentation',
    },
    {
      title: 'Logout',
      path: '#',
      icon: <Logout fontSize="small" color="primary" />,
      description: 'Sign out of your account',
    },
  ]

  // function to check if the current path matches the base path
  const isPathActive = (basePath) => {
    return location.pathname.startsWith(basePath)
  }

  // desktop header component
  const DesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <PageLinks
          to="/home"
          className={location.pathname === '/home' ? 'active' : ''}
        >
          Home
        </PageLinks>
        <DropdownWrapper className="courses-dropdown">
          <PageLinks
            to="/courses"
            className={isPathActive('/courses') ? 'active' : ''}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Courses <ArrowIcon className="arrow-icon" />
          </PageLinks>
          <DropdownContent className="dropdown-content">
            {coursesDropdown.map((item) => (
              <DropdownLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Box>
                  <div className="link-title">{item.title}</div>
                  <div className="link-description">{item.description}</div>
                </Box>
              </DropdownLink>
            ))}
          </DropdownContent>
        </DropdownWrapper>
        <DropdownWrapper>
          <PageLinks
            to="/problems/competitions"
            className={isPathActive('/problems') ? 'active' : ''}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Problems <ArrowIcon className="arrow-icon" />
          </PageLinks>
          <DropdownContent className="dropdown-content">
            {problemsDropdown.map((item) => (
              <DropdownLink
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Box>
                  <div className="link-title">{item.title}</div>
                  <div className="link-description">{item.description}</div>
                </Box>
              </DropdownLink>
            ))}
          </DropdownContent>
        </DropdownWrapper>
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ mx: 1 }}
      />
      <DropdownWrapper>
        <IconButton
          aria-label="account of current user"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleAccountMenu}
          sx={{
            color: (theme) => theme.palette.text.primary,
            padding: theme.spacing(0.5),
            height: '100%',
            '&:hover': {
              background: (theme) => alpha(theme.palette.text.primary, 0.1),
              transition: 'background-color 0.3s ease',
            },
          }}
        >
          <AccountCircle />
        </IconButton>
        <DropdownContent
          sx={{
            display: accountMenuOpen ? 'block' : 'none',
          }}
        >
          {accountDropdown.map((item) => (
            <DropdownLink
              key={item.path}
              to={item.path}
              onClick={
                item.title === 'Logout' ? handleLogout : handleAccountMenuClose
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Box>
                <div className="link-title">{item.title}</div>
                <div className="link-description">{item.description}</div>
              </Box>
            </DropdownLink>
          ))}
        </DropdownContent>
      </DropdownWrapper>
    </Box>
  )

  // mobile header component
  const mobileMenuItems = (
    <>
      <MenuItem component={NavLink} to="/" onClick={handleClose}>
        Home
      </MenuItem>
      <MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
        Courses
      </MenuItem>
      {coursesDropdown.map((item) => (
        <MenuItem
          key={item.path}
          component={NavLink}
          to={item.path}
          onClick={handleClose}
          sx={{ pl: 4 }}
        >
          {item.title}
        </MenuItem>
      ))}
      <MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
        Problems
      </MenuItem>
      {problemsDropdown.map((item) => (
        <MenuItem
          key={item.path}
          component={NavLink}
          to={item.path}
          onClick={handleClose}
          sx={{ pl: 4 }}
        >
          {item.title}
        </MenuItem>
      ))}
      <Divider component="li" variant="middle" />
      <MenuItem component={NavLink} to="/settings" onClick={handleClose}>
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
    </>
  )

  if (loading) {
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
          borderBottom: `2px solid ${theme.palette.divider}`,
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
                edge="start"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                disableScrollLock={true}
              >
                {mobileMenuItems}
              </Menu>
            </>
          ) : (
            <DesktopNav />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
