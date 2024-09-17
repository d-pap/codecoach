import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import ClassFormDialog from "../Courses/ClassFormDialog";
import AddCourseContent from "../Courses/AddCourseContent"; // Import the AddCourseContent component

// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: "teacher",
});

const initialCourses = [
  { name: "ICPC Beginner", students: 0 },
  { name: "ICPC Intermediate", students: 4 },
  { name: "ICPC Expert", students: 0 },
];

const Studentcourses = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null); // New state for selected course

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle the creation of a new course
  const handleCreateCourse = (courseName) => {
    const newCourse = { name: courseName, students: 0 };
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleAddProblemsClick = (courseName) => {
    setSelectedCourse(courseName); // Set the selected course
  };

  if (selectedCourse) {
    // Conditionally render AddCourseContent if a course is selected
    return <AddCourseContent newClassName={selectedCourse} />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Course List Section */}
        <Grid item xs={12} md={9}>
          {courses.map((course, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{course.name}</Typography>
                <Typography variant="body2">Students: {course.students}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                  onClick={() => handleAddProblemsClick(course.name)}
                >
                  Add problems
                </Button>
                <Button variant="outlined" sx={{ mt: 0.5 }}>
                  Invite student
                </Button>
                <Button
                  variant="contained"
                  onClick={() => console.log('Delete button clicked')}
                  sx={{
                    backgroundColor: 'transparent',
                    color : "#d32f2f",
                    '&:hover': {
                      backgroundColor: '#DB5858',
                      color: "#ffffff",
                    },
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Sidebar Section */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List component="nav">
              {isAuthenticated && role === "teacher" && (
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleDialogOpen}
                  >
                    Add New Course
                  </Button>
                </ListItem>
              )}
              <ClassFormDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onCreate={handleCreateCourse}
              />
              {isAuthenticated && (
                <ListItem>
                  <Button variant="contained" color="secondary" fullWidth>
                    Join Course
                  </Button>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Studentcourses;
