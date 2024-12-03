import React, { lazy } from 'react'
import styled2 from 'styled-components'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ShareIcon from '@mui/icons-material/Share'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import theme from '../../theme'
import PropTypes from 'prop-types'
import CustomTabPanel from './CustomTabPanel'
import ProblemTab from './problem-detail-navbar/ProblemTab'
const HintByDatabaseTab = lazy(
  () => import('./problem-detail-navbar/HintByDatabase')
)
const ForumTab = lazy(() => import('./problem-detail-navbar/ForumTab'))

const DetailContainer = styled(Box)(({ theme }) => ({
  h1: {
    color: theme.palette.primary.main,
  },
  h2: {
    color: theme.palette.primary.main,
    marginTop: '20px',
  },
  h3: {
    color: theme.palette.primary.main,
    marginTop: '20px',
  },
  pre: {
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    borderRadius: '10px',
  },
  p: {
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    borderRadius: '10px',
  },
}))

const ScrollableTabsContainer = styled2.div`
  overflow-x: auto;
`

const TitleContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

const IconContainer = styled('div')({
  display: 'flex',
  gap: '8px',
  // paddingRight: '16px',
  paddingRight: theme.spacing(2),
})

// The items to be displayed in the tabs
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

// The tab layout
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function ProblemDetails({ problem }) {
  const [value, setValue] = React.useState(0)
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null)
  const shareMenuOpen = Boolean(shareAnchorEl)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    //! IMPLEMENT BACKEND FOR BOOKMARKS HERE FOR BOOKMARK ICON
    //! for example:
    // if (!isBookmarked) {
    //   saveBookmark(problem.id)
    // } else {
    //   removeBookmark(problem.id)
    // }
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    })
  }

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget)
  }

  const handleShareClose = () => {
    setShareAnchorEl(null)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      showSnackbar('Link copied to clipboard!')
    } catch (err) {
      showSnackbar('Failed to copy link', 'error')
    }
    handleShareClose()
  }

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href)
    const defaultMessage = `Check out this problem on CodeCoach: ${problem.title}`
    const message = encodeURIComponent(defaultMessage)
    let shareUrl = ''

    switch (platform) {
      case 'linkedin':
        // open linkedin post page
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'twitter':
        // open twitter post page with custom message
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}&hashtags=codecoach,coding,umich`
        break
      case 'whatsapp':
        // open whatsapp with custom message
        shareUrl = `https://wa.me/?text=${message}%20${url}`
        break
    }

    if (shareUrl) {
      const width = 550
      const height = 450
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2

      window.open(
        shareUrl,
        '_blank',
        `width=${width},height=${height},top=${top},left=${left}`
      )
    }
    handleShareClose()
    showSnackbar('Opening share dialog...')
  }

  const getLayout = () => {
    if (!problem) return <div>Loading problem details...</div>

    return (
      <div>
        <TitleContainer>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
            }}
          >
            {problem.title}
          </Typography>
          <IconContainer>
            <IconButton onClick={handleBookmark} color="primary">
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            <IconButton onClick={handleShareClick} color="primary">
              <ShareIcon />
            </IconButton>
            <Menu
              id="share-menu"
              anchorEl={shareAnchorEl}
              open={shareMenuOpen}
              onClose={handleShareClose}
              MenuListProps={{
                'aria-labelledby': 'share-button',
              }}
            >
              <MenuItem onClick={handleCopyLink}>
                <ContentCopyIcon sx={{ mr: 1 }} />
                Copy Link
              </MenuItem>
              <MenuItem onClick={() => handleSocialShare('linkedin')}>
                <LinkedInIcon sx={{ mr: 1 }} />
                Share on LinkedIn
              </MenuItem>
              <MenuItem onClick={() => handleSocialShare('twitter')}>
                <TwitterIcon sx={{ mr: 1 }} />
                Share on Twitter
              </MenuItem>
              <MenuItem onClick={() => handleSocialShare('whatsapp')}>
                <WhatsAppIcon sx={{ mr: 1 }} />
                Share on WhatsApp
              </MenuItem>
            </Menu>
          </IconContainer>
        </TitleContainer>
        <DetailContainer>
          <ScrollableTabsContainer>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Problem" {...a11yProps(0)} />
              <Tab label="Hint/Video" {...a11yProps(1)} />
              <Tab label="Discussions" {...a11yProps(2)} />
            </Tabs>
          </ScrollableTabsContainer>
          <CustomTabPanel value={value} index={0}>
            <div>
              <ProblemTab problem={problem} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div>
              <HintByDatabaseTab problem={problem} />
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div>
              <ForumTab problem={problem} />
            </div>
          </CustomTabPanel>
        </DetailContainer>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    )
  }
  return getLayout()
}
export default ProblemDetails
