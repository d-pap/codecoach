/**
 * Courses page
 * This can be temporary if we want to use it for something else
 * or delete it completely. Was initially only made to construct navbar
 */
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import CenteredLoader from '../components/utility/CenteredLoader.js'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import {
  createCourse,
  fetchCourse,
  deleteCourse,
  getCoursesByUser,
  fetchProblems,
  addProblemID,
  fetchProblemById,
} from '../api'

/**********************************************************
 * CLASSFORMDIALOG CODE
 */
const ClassFormDialog = ({ open, onClose, onCreate }) => {
  const [selectedValue, setSelectedValue] = useState('enter')
  const [className, setClassName] = useState('')

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleSubmit = () => {
    if (className.trim() !== '') {
      onCreate(className)
      onClose() // Optionally close the dialog on submit
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Class</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Name your class</FormLabel>
          <RadioGroup
            aria-label="class name option"
            name="classNameOption"
            value={selectedValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="enter"
              control={<Radio />}
              label="Enter your class name"
            />
            {selectedValue === 'enter' && (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Class name"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="e.g., Ms. Smith’s 1st period"
                helperText="This class name is what your students will see."
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            )}
          </RadioGroup>
        </FormControl>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Create New Course
        </Button>
      </DialogContent>
    </Dialog>
  )
}
/**
 * END CLASSFORMDIALOG CODE
 */

/**********************************************************
 * COURSEADDPROBLEM CODE
 **********************************************************/
// const AddCourseContent = ({ newClassName, courseId }) => {
const AddCourseContent = ({ newClassName }) => {
  const { courseId } = useParams() // Get the courseId from the URL
  console.log(`Course ID from URL: ${courseId}`)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProblems, setSelectedProblems] = useState([])
  const [problems, setProblems] = useState([])
  const [filteredProblems, setFilteredProblems] = useState([])
  const [courseProblems, setCourseProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const problemsPerPage = 10

  const navigate = useNavigate()

  // Load problems using the actual API
  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await fetchProblems()
        setProblems(data)
        setFilteredProblems(data)
      } catch (err) {
        setError('Error fetching problems')
      } finally {
        setLoading(false)
      }
    }
    loadProblems()
    fetchCourseProblems()
  }, [])

  // Filter the problems based on the search term
  useEffect(() => {
    setFilteredProblems(
      problems.filter((problem) =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, problems])

  // Update the selected problems when user checks/unchecks problems
  const handleProblemChange = (problemId) => {
    setSelectedProblems((prev) => {
      if (prev.includes(problemId)) {
        return prev.filter((id) => id !== problemId)
      }
      return [...prev, problemId]
    })
  }

  // Submit the selected problems and add them to the course
  const handleSubmit = async () => {
    const errors = []
    for (const problemId of selectedProblems) {
      try {
        await addProblemID(courseId, problemId) // Add problem to course via the API
      } catch (error) {
        console.error(`Error adding problem ${problemId}:`, error.message)
        errors.push(`Problem ${problemId} failed to add: ${error.message}`)
      }
    }

    if (errors.length > 0) {
      setError(`Failed to add some problems: \n${errors.join('\n')}`)
    } else {
      console.log('All selected problems added successfully!')
      await fetchCourseProblems() // Fetch updated course problems after submission
    }
  }

  // Fetch the updated course and its problem details
  const fetchCourseProblems = async () => {
    try {
      const course = await fetchCourse(courseId) // Fetch course details including problem IDs
      const problemDetails = await Promise.all(
        course.problemIds.map((id) => fetchProblemById(id)) // Fetch each problem detail by ID
      )
      setCourseProblems(problemDetails) // Set course problems to state
      setSelectedProblems(problemDetails.map((problem) => problem._id))
    } catch (error) {
      setError('Error fetching course problems: ' + error.message)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = filteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  )

  if (loading) {
    return <CenteredLoader />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Which problems do you want students to work on for {newClassName}?
      </Typography>
      <TextField
        fullWidth
        label="Search for a problem"
        variant="outlined"
        margin="normal"
        onChange={handleSearchChange}
      />
      <FormGroup>
        {currentProblems.map((problem) => (
          <Paper key={problem._id} elevation={2} sx={{ mt: 2, p: 2 }}>
            <Typography variant="subtitle1">{problem.title}</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleProblemChange(problem._id)}
                  checked={selectedProblems.includes(problem._id)} // Mark as checked if already selected
                />
              }
              label={problem.title}
            />
          </Paper>
        ))}
      </FormGroup>
      <Stack
        spacing={2}
        sx={{ p: 1, display: 'flex', justifyContent: 'right' }}
      >
        <Pagination
          count={Math.ceil(filteredProblems.length / problemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          size="small"
        />
      </Stack>
      <Button color="primary" variant="contained" onClick={handleSubmit}>
        Submit Selections
      </Button>

      {/* Display the list of added problems after submission */}
      {courseProblems.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            Added Problems for {newClassName}:
          </Typography>
          {courseProblems.map((problem) => (
            <Paper key={problem._id} elevation={2} sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle1">{problem.title}</Typography>
              <Typography variant="body2">{problem.description}</Typography>
            </Paper>
          ))}
        </Box>
      )}

      {/* Button to navigate back to Courses */}
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => navigate('/Courses')} // Navigate back to Courses
        sx={{ mt: 4 }}
      >
        Back to Courses
      </Button>
    </Box>
  )
}

/**
 * END COURSEADDPROBLEM CODE
 */

// Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: 'teacher',
})

// StudentCourses using API
const StudentCourses = () => {
  const { isAuthenticated, role } = useContext(AuthContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedCourseName, setSelectedCourseName] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const navigate = useNavigate()

  /// Fetch user courses on component mount
  useEffect(() => {
    const loadUserCourses = async () => {
      try {
        const userId = '667d848bce9f1e40bd80862' // Replace with actual logged-in user's ID
        const userCourses = await getCoursesByUser(userId) // Fetch courses for this user
        setCourses(userCourses) // Set the fetched courses to state
      } catch (error) {
        console.error('Error fetching user courses:', error)
      }
    }
    loadUserCourses()
  }, [])

  // Handle dialog open and close
  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)

  // Handle course creation
  const handleCreateCourse = async (courseName) => {
    try {
      const teacherId = '66f28e41e0ebc6def357ca' // Replace with actual teacher ID
      const newCourse = await createCourse(
        courseName,
        `COURSE-${Date.now()}`,
        teacherId,
        []
      ) // Create new course
      setCourses((prevCourses) => [...prevCourses, newCourse]) // Update the courses list with the new course
    } catch (error) {
      console.error('Error creating course:', error)
    }
    setDialogOpen(false) // Close dialog after creating course
  }

  const handleInviteStudentClick = (courseId, courseName) => {
    console.log('Invite Student Clicked:', courseId, courseName)
    setSelectedCourseId(courseId)
    setSelectedCourseName(courseName)
    setInviteDialogOpen(true)
  }

  const handleViewProblemsClick = (courseId) => {
    const course = courses.find((c) => c.courseId === courseId)
    if (course && course.problemIds.length > 0) {
      navigate('/problems', { state: { problemIds: course.problemIds } }) // Pass problemIds to ICPC page
    } else {
      console.error('No problems found for this course.')
    }
  }

  // Handle adding problems (navigate to AddCourseContent)
  // const handleAddProblemsClick = (courseId) => {
  //   const course = courses.find(c => c.courseId === courseId);
  //   setSelectedCourse(course); // Assuming course object contains all needed details
  // };
  const handleAddProblemsClick = (courseId) => {
    navigate(`/courses/${courseId}/add-content`)
  }

  // Handle course updates
  const handleCourseUpdated = (updatedCourse) => {
    const updatedCourses = courses.map((course) =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    )
    setCourses(updatedCourses)
    setSelectedCourse(null) // After update, return to the course list
  }

  // Handle course deletion
  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId) // Call the API to delete the course
      const updatedCourses = courses.filter(
        (course) => course.courseId !== courseId
      )
      setCourses(updatedCourses) // Update the state with the new courses list
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  // Render AddCourseContent component if a course is selected
  if (selectedCourse) {
    return (
      <AddCourseContent
        newClassName={selectedCourse.courseName}
        courseId={selectedCourse.courseId}
        onCourseUpdated={handleCourseUpdated}
      />
    )
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Course List Section */}
          <Grid item xs={12} md={9}>
            {courses.map((course, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h5">
                    {course.courseName || course.courseId}
                  </Typography>
                  <Typography variant="body2">
                    Students: {course.students || 0}
                  </Typography>
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
                    onClick={() => handleViewProblemsClick(course.courseId)}
                  >
                    View problems
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                    onClick={() =>
                      handleInviteStudentClick(
                        course.courseId,
                        course.courseName
                      )
                    }
                  >
                    Invite student
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteCourse(course.courseId)}
                    sx={{
                      backgroundColor: 'transparent',
                      color: '#d32f2f',
                      '&:hover': {
                        backgroundColor: '#DB5858',
                        color: '#ffffff',
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
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <List component="nav">
                {isAuthenticated && role === 'teacher' && (
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
      <InviteStudentDialog
        open={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
        courseName={selectedCourseName}
        courseId={selectedCourseId}
      />
    </div>
  )
}

const InviteStudentDialog = ({ open, onClose, courseName, courseId }) => {
  console.log('InviteStudentDialog open:', open)
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite Student</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Course Name: {courseName}</Typography>
        <Typography variant="body1">Course ID: {courseId}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export { AddCourseContent }
export default StudentCourses
