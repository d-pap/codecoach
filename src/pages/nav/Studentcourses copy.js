import React, { useContext, useState } from "react";
import ClassFormDialog from "../Courses/ClassFormDialog";  // Adjust this path according to your project structure
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";

// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: "teacher",
});

const courses = [
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
  const [dialogOpen, setDialogOpen] = useState(false);  // State to control the dialog

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {courses.map((course, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{course.name}</Typography>
                <Typography variant="body2">Students: {course.students} students</Typography>
                <Button variant="outlined" sx={{ mt: 1 }}>Add students</Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {tools.map((tool, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">{tool.name}</Typography>
                <Typography variant="body2">{tool.description}</Typography>
              </Box>
            ))}
            {isAuthenticated && role === 'teacher' && (
              <Button variant="contained" color="primary" sx={{ mb: 1 }} onClick={handleOpenDialog}>
                Add New Course
              </Button>
            )}
            <ClassFormDialog open={dialogOpen} onClose={handleCloseDialog} />
            {isAuthenticated && (
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>Join Course</Button>
            )}
            <Button variant="contained" color="secondary" sx={{ mt: 1 }}>View all</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Studentcourses;
