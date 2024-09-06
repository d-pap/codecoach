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
  ListItemText,
} from "@mui/material";
import ClassFormDialog from "../Courses/ClassFormDialog";

// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: "teacher",
});

const initialCourses = [
  { name: "ICPC beginner", students: 0 },
  { name: "ICPC intermediate", students: 4 },
  { name: "ICPC expertise", students: 0 },
];

const tools = [
  { name: "Refresh My Knowledge", description: "Refresh your content knowledge in various subject areas." },
  { name: "Lesson Plan", description: "Create structured, detailed lesson plans tailored to your curriculum and students' needs." },
  { name: "Recommend Assignments", description: "Receive recommendations on what your students should work on next." },
];

const Studentcourses = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState(initialCourses);  // Maintain course list in state

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle the creation of a new course
  const handleCreateCourse = (courseName) => {
    const newCourse = { name: courseName, students: 0 };
    setCourses([...courses, newCourse]);  // Update course list with new course
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {courses.map((cls, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{cls.name}</Typography>
                <Typography variant="body2">Students: {cls.students} students</Typography>
                <Button variant="outlined" sx={{ mt: 1 }}>Add students</Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
            <List component="nav" aria-label="secondary mailbox folders">
              {tools.map((tool, index) => (
                <ListItem key={index}>
                  <ListItemText primary={tool.name} secondary={tool.description} />
                </ListItem>
              ))}
              {isAuthenticated && role === 'teacher' && (
                <>
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
                  <ClassFormDialog open={dialogOpen} onClose={handleDialogClose} onCreate={handleCreateCourse} />
                </>
              )}
              {isAuthenticated && (
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth>Join Course</Button>
                </ListItem>
              )}
              <ListItem>
                <Button variant="contained" color="secondary" fullWidth>View all</Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Studentcourses;
