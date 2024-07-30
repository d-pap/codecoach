/**
 * Component that displays the problem details on problem solving page
 * Use wherever we need to display problem details.
 */
import React from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "./CustomTabPanel";
import PropTypes from "prop-types";
import ProblemTab from "./detail-navbar/ProblemTab";
import HintByAiTab from "./detail-navbar/HintByAITab";
import SolutionByAITab from "./detail-navbar/SolutionByAITab";
import HintByDatabaseTab from "./detail-navbar/HintByDatabase";
import ForumTab from "./detail-navbar/ForumTab";

// styled container to show problem details
const DetailContainer = styled.div`
    h1 {
        color: #333; // problem title
    }
    h2 {
        color: #666; // problem details
        margin-top: 20px;
    }
    pre, p {
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 5px;
    }
`;

// styled container to make tabs scrollable
const ScrollableTabsContainer = styled.div`
    overflow-x: auto; // enable horizontal scrolling for tabs
`;

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function ProblemDetails({ problem }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // render the problem details
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
                            variant="scrollable" // make the tabs scrollable
                            scrollButtons="auto" // show scroll buttons automatically
                        >
                            <Tab label="Problem" {...a11yProps(0)} />
                            <Tab label="AI Hint" {...a11yProps(1)} />
                            <Tab label="AI Solution" {...a11yProps(2)} />
                            <Tab label="Hint/Video" {...a11yProps(3)} />
                            <Tab label="Forum" {...a11yProps(4)} />
                        </Tabs>
                    </ScrollableTabsContainer>
                    <CustomTabPanel value={value} index={0}>
                        <div>
                            <ProblemTab problem={problem} />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div>
                            <HintByAiTab problem={problem} />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <div>
                            <SolutionByAITab problem={problem} />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <div>
                            <HintByDatabaseTab problem={problem} />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
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
