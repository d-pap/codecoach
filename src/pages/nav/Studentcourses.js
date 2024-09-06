import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Code, TableChart, FilterList, School } from "@mui/icons-material";

const Courses = () => {
  // Tab handling
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Study plan data
  const studyPlans = [
    { title: "Top Interview 150", description: "Must-do List for Interviews", icon: <School /> },
    { title: "ICPC Beginner", description: "start with easy questions", icon: <Code /> },
    { title: "ICPC intermediate ", description: "learn more with medium questions", icon: <Code /> },
    { title: "ICPC expert ", description: "Deeper understanding with tricky questions", icon: <Code /> },
    { title: "SQL 50", description: "Crack SQL Interview in 50 Qs", icon: <TableChart /> },
    { title: "30 Days of JavaScript", description: "Learn JS Basics", icon: <Code /> },
  ];

  // Problem list data
  const problems = [
    { id: 2028, title: "Find Missing Observations", difficulty: "Medium", acceptance: "55.2%" },
    { id: 1, title: "Two Sum", difficulty: "Easy", acceptance: "53.6%" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", acceptance: "44.0%" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "35.4%" },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Study Plan Section */}
      <Typography variant="h4" gutterBottom>
        Study Plan
      </Typography>
      <Grid container spacing={3}>
        {studyPlans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Avatar>{plan.icon}</Avatar>
                <Typography variant="h6">{plan.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {plan.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Topics Filter */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Topics
        </Typography>
        <Tabs value={value} onChange={handleTabChange} aria-label="topics tabs">
          <Tab label="All Topics" />
          <Tab label="ICPC" />
          <Tab label="Algorithms" />
          <Tab label="Database" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Box sx={{ mt: 2 }}>
        <ToggleButtonGroup>
          <ToggleButton value="all">
            <Chip label="All" />
          </ToggleButton>
          <ToggleButton value="easy">
            <Chip label="Easy" color="success" />
          </ToggleButton>
          <ToggleButton value="medium">
            <Chip label="Medium" color="warning" />
          </ToggleButton>
          <ToggleButton value="hard">
            <Chip label="Hard" color="error" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Problem List Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Problem List
        </Typography>
        <Paper elevation={2}>
          <List>
            {problems.map((problem) => (
              <ListItem key={problem.id} divider>
                <ListItemIcon>
                  <Avatar>{problem.id}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={problem.title}
                  secondary={`Difficulty: ${problem.difficulty} | Acceptance: ${problem.acceptance}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button variant="contained" color="primary" startIcon={<FilterList />}>
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default Courses;
