import React, { lazy } from 'react'
import styled2 from 'styled-components'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getLayout = () => {
    if (!problem) return <div>Loading problem details...</div>

    return (
      <div>
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
      </div>
    )
  }
  return getLayout()
}
export default ProblemDetails
