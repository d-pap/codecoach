import React from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomTabPanel from './CustomTabPanel';
import PropTypes from 'prop-types';
import ProblemTab from './problem-detail-navbar/ProblemTab';
import ChatAITab from './problem-detail-navbar/ChatAITab';
import HintByDatabaseTab from './problem-detail-navbar/HintByDatabase';
import ForumTab from './problem-detail-navbar/ForumTab';

const DetailContainer = styled.div`
  h1 {
    color: #333;
  }
  h2 {
    color: #666;
    margin-top: 20px;
  }
  pre,
  p {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
`;

const ScrollableTabsContainer = styled.div`
  overflow-x: auto;
`;

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ProblemDetails({ problem }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getLayout = () => {
    if (!problem) return <div>Loading problem details...</div>;

    return (
      <div>
        <h1>{problem.title}</h1>
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
              <Tab label="Forum" {...a11yProps(2)} />
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
    );
  };

  return getLayout();
}

export default ProblemDetails;
