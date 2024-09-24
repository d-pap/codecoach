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
import { createCourse, fetchCourse, deleteCourse } from "../../api";
// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: "teacher",
});

// Mock courses data
const mockCourses = [
  {
    _id: "ObjectId('6f268421e0eb6cdef357c5')",
    courseId: "COURSE-1001",
    teacherId: ["6f26821a4e0eb6cdef357ca"],
    problemIds: [
      "6679d04631f3f47ad3599bd",
      "669a752a15376a2aa39f46"
    ],
    courseName: "ICPC Beginner"
  },
  {
    _id: "ObjectId('6f268d8e1e0eb6cdef357c7')",
    courseId: "COURSE-2002",
    teacherId: ["6f26821a4e0eb6cdef357ca"],
    problemIds: [
      "6679d04631f3f47ad3599bd",
      "669a752a15376a2aa39f46"
    ],
    courseName: "ICPC Intermediate"
  }
];

// StudentCourses use with API
// const StudentCourses = () => {
//   const { isAuthenticated, role } = useContext(AuthContext);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);

// mock student courses
const StudentCourses = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [courses, setCourses] = useState(mockCourses); // Initialize with mock courses
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate(); // Use navigate hook to redirect to ICPC problems page

  /// Fetch courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourse(); // Fetch all courses (replace with real API call)
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    loadCourses();
  }, []);
  
  // Handle dialog open and close
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Handle course creation
  // const handleCreateCourse = async (courseName) => {
  //   const teacherId = ["66f28e141e0eb6cd6ef357ca"]; // Replace with actual teacher ID
  //   try {
  //     const newCourse = await createCourse(courseName, teacherId);
  //     setCourses((prevCourses) => [...prevCourses, newCourse]); // Update the courses list with the new course
  //   } catch (error) {
  //     console.error("Error creating course:", error);
  //   }
  //   setDialogOpen(false); // Close dialog after creating course
  // };

  // Mock createCourse function
  const mockCreateCourse = (courseName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCourse = {
          courseId: `COURSE-${Math.floor(Math.random() * 10000)}`, // Random course ID for the mock
          name: courseName,
        };
        resolve(newCourse);
      }, 1000); // Simulate network latency
    });
  };

  // // Handle course creation (mocking the addition of a new course)
  // const handleCreateCourse = async (courseName) => {
  //   const newCourseId = `COURSE-${courses.length + 1001}`; // Generate a new courseId
  //   const newCourse = {
  //     courseId: newCourseId,
  //     name: courseName,
  //   };

  // Handle course creation (using mockCreateCourse for this example)
  const handleCreateCourse = async (courseName) => {
    try {
      const newCourse = await mockCreateCourse(courseName); // Simulate course creation
      setCourses((prevCourses) => [...prevCourses, newCourse]); // Add new course to the list
    } catch (error) {
      console.error("Error creating course:", error);
    }
    setDialogOpen(false); // Close dialog after creating course
  };

  // Handle adding problems (navigate to AddCourseContent)
  const handleAddProblemsClick = (courseId) => {
    const course = courses.find(c => c.courseId === courseId);
    setSelectedCourse(course); // Assuming course object contains all needed details
  };

  // When rendering AddCourseContent, pass the selectedCourse as props
  if (selectedCourse) {
    return <AddCourseContent newClassName={selectedCourse.courseName} courseId={selectedCourse.courseId} />;
  }
  const handleCourseUpdated = (updatedCourse) => {
    const updatedCourses = courses.map(course =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    );
    setCourses(updatedCourses);
  };

  if (selectedCourse) {
    return <AddCourseContent
      newClassName={selectedCourse.courseName}
      courseId={selectedCourse.courseId}
      onCourseUpdated={handleCourseUpdated}
    />;
  }

  // Handle course deletion
  const handleDeleteCourse = (courseId) => {
    console.log(`Deleting course with ID: ${courseId}`); // Debug: check which course is being deleted
    const updatedCourses = courses.filter((course) => course.courseId !== courseId);
    console.log('Updated courses list:', updatedCourses); // Debug: check the updated course list
    setCourses(updatedCourses); // Update the state with the new courses list
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
                <Typography variant="h5">{course.name || course.courseId}</Typography>
                <Typography variant="body2">Students: {course.students || 0}</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                  onClick={() => handleAddProblemsClick(course.courseId)}
                >
                  Add problems
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