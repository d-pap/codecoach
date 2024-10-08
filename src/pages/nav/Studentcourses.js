import React, { useContext, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import ClassFormDialog from "../Courses/ClassFormDialog";
import AddCourseContent from "../Courses/AddCourseContent"; // Import the AddCourseContent component
import { createCourse, fetchCourse, deleteCourse, getCoursesByUser } from "../../api copy"; // Use the actual functions from api copy.js
import ICPC from "../problems/problem-types/ICPC";
// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: "teacher",
});

// StudentCourses using API
const StudentCourses = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState([]); // Initialize with an empty array, real courses will be fetched
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate(); // Use navigate hook to redirect to ICPC problems page

  /// Fetch user courses on component mount
  useEffect(() => {
    const loadUserCourses = async () => {
      try {
        const userId = '667d848bce9f1e40bd80862'; // Replace with actual logged-in user's ID
        const userCourses = await getCoursesByUser(userId); // Fetch courses for this user
        setCourses(userCourses); // Set the fetched courses to state
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };
    loadUserCourses();
  }, []);

  // Handle dialog open and close
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Handle course creation
  const handleCreateCourse = async (courseName) => {
    try {
      const teacherId = '66f28e41e0ebc6def357ca'; // Replace with actual teacher ID
      const newCourse = await createCourse(`COURSE-${Date.now()}`, teacherId, []); // Create new course
      setCourses((prevCourses) => [...prevCourses, newCourse]); // Update the courses list with the new course
    } catch (error) {
      console.error("Error creating course:", error);
    }
    setDialogOpen(false); // Close dialog after creating course
  };

  const handleViewProblemsClick = (courseId) => {
    const course = courses.find(c => c.courseId === courseId);
    if (course && course.problemIds.length > 0) {
      navigate('/icpc', { state: { problemIds: course.problemIds } }); // Pass problemIds to ICPC page
    } else {
      console.error("No problems found for this course.");
    }
  };

  // Handle adding problems (navigate to AddCourseContent)
  const handleAddProblemsClick = (courseId) => {
    const course = courses.find(c => c.courseId === courseId);
    setSelectedCourse(course); // Assuming course object contains all needed details
  };

  // Handle course updates
  const handleCourseUpdated = (updatedCourse) => {
    const updatedCourses = courses.map(course =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    );
    setCourses(updatedCourses);
    setSelectedCourse(null); // After update, return to the course list
  };

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId); // Call the API to delete the course
      const updatedCourses = courses.filter((course) => course.courseId !== courseId);
      setCourses(updatedCourses); // Update the state with the new courses list
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Render AddCourseContent component if a course is selected
  if (selectedCourse) {
    return <AddCourseContent newClassName={selectedCourse.courseName} courseId={selectedCourse.courseId} onCourseUpdated={handleCourseUpdated} />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Course List Section */}
        <Grid item xs={12} md={9}>
          {courses.map((course, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5">{course.courseName || course.courseId}</Typography>
                <Typography variant="body2">Students: {course.students || 0}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                  onClick={() => handleAddProblemsClick(course.courseId)}
                >
                  Add problems
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                  onClick={() => handleViewProblemsClick(course.courseId)} // Add this button to view problems
                >
                  View problems
                </Button>
                <Button variant="outlined" sx={{ mt: 0.5 }}>
                  Invite student
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteCourse(course.courseId)} // Bind delete function to button
                  sx={{
                    backgroundColor: 'transparent',
                    color: "#d32f2f",
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
                onCreate={handleCreateCourse} // Handle creating a course
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

export default StudentCourses;
