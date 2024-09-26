import React, { useState, Suspense, lazy } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import CenteredCircleLoader from '../utility/CenteredLoader'

// Dynamically import MUI and custom components to optimize bundle size
const Tabs = lazy(() => import('@mui/material/Tabs'))
const Tab = lazy(() => import('@mui/material/Tab'))
const Typography = lazy(() => import('@mui/material/Typography'))
const CustomTabPanel = lazy(() => import('./CustomTabPanel'))
const ProblemTab = lazy(() => import('./problem-detail-navbar/ProblemTab'))
const HintByDatabaseTab = lazy(() => import('./problem-detail-navbar/HintByDatabase'))
const ForumTab = lazy(() => import('./problem-detail-navbar/ForumTab'))

// Styled container for problem details
const DetailContainer = styled.div`
  h1 {
    color: #333;
  }
  h2 {
    color: #666;
    margin-top: 20px;
  }
  h3 {
    color: #666;
    margin-top: 20px;
  }
  pre,
  p {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 10px;
  }
`

// Styled container for scrollable tabs
const ScrollableTabsContainer = styled.div`
  overflow-x: auto;
`

// PropTypes for CustomTabPanel to ensure correct usage
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

// Accessibility props for tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

// Main ProblemDetails component
function ProblemDetails({ problem }) {
  const [value, setValue] = useState(0) // State to manage active tab

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Render layout based on problem data
  const getLayout = () => {
    if (!problem) return <CenteredCircleLoader />

    return (
      <div>
        {/* Problem Title */}
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
          }}
        >
          {problem.title}
        </Typography>
        <DetailContainer>
          <ScrollableTabsContainer>
            {/* Suspense for Tabs */}
            <Suspense fallback={<CenteredCircleLoader />}>
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
            </Suspense>
          </ScrollableTabsContainer>
          
          {/* Suspense for Tab Panels */}
          <Suspense fallback={<CenteredCircleLoader />}>
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
          </Suspense>
        </DetailContainer>
      </div>
    )
  }

  return getLayout()
}

export default ProblemDetails
