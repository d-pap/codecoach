/**
 * Courses page
 */
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import JoinIcon from '@mui/icons-material/PersonAdd'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import theme from '../theme'
import CenteredCircleLoader from '../components/utility/CenteredLoader'
import { ClassFormDialog, InviteStudentDialog, ViewProblemsDialog, DeleteConfirmationDialog } from '../components/Course-Sub-Components/CourseDialogs'
import {
  getCurrentUserId,
  createCourseInDatabase,
  deleteCourse,
  getAllCourses,
  getCourseByIdProblems,
} from '../api'

//! Mock user context (replace or integrate with your actual auth context)
const AuthContext = React.createContext({
  isAuthenticated: true,
  role: 'teacher',
})

// Styled components for custom appearance
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    width: '800px',
    maxWidth: '90vw',
    height: '80vh',
  },
}))

const CourseList = () => {
  const { isAuthenticated, role } = useContext(AuthContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewProblemsDialogOpen, setViewProblemsDialogOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedCourseName, setSelectedCourseName] = useState('')
  const [SelectedCourseIdForInvite, setSelectedCourseIdForInvite] = useState(null)

  // use react query to fetch all courses
  const {
    data: courses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: getAllCourses,
  })

  // use react query to fetch all problems for a specific course
  const {
    data: selectedCourseProblems = [],
    isLoading: isLoadingProblems,
    error: problemsError,
  } = useQuery({
    queryKey: ['courseProblems', selectedCourseId],
    queryFn: () => getCourseByIdProblems(selectedCourseId),
    enabled: !!selectedCourseId,
  })

  // handle dialog open and close
  const handleDialogOpen = () => setDialogOpen(true)
  const handleDialogClose = () => setDialogOpen(false)
  const handleCreateCourse = async (courseName) => {
    try {
      const userId = await getCurrentUserId()
      if (!userId) {
        throw new Error('User not authenticated')
      }

      // generate a short id for the course
      const shortId = Math.floor(Math.random() * 1000000000) + 100000000
      const sanitizedCourseName = courseName.replace(/[^a-zA-Z0-9 ]/g, '').trim()
      const sanitizedCourseId = `${shortId}-${sanitizedCourseName}`

      const newCourse = {
        courseName: courseName,
        link: sanitizedCourseId,
        students: 0,
        problemIds: [],
      }

      const createdCourse = await createCourseInDatabase(newCourse, userId)

      // update RQ cache
      queryClient.setQueryData(['courses'], (oldData) => [
        ...(oldData || []),
        createdCourse,
      ])

      setDialogOpen(false)
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }
  // handle view problems click
  const handleViewProblemsClick = (courseId) => {
    setSelectedCourseId(courseId)
    setViewProblemsDialogOpen(true)
  }
  // handle close view problems dialog
  const handleCloseViewProblemsDialog = () => {
    setViewProblemsDialogOpen(false)
    setSelectedCourseId(null)
  }
  // handle add problems click
  const handleAddProblemsClick = (courseId) => {
    navigate(`/courses/${courseId}/add-content`)
  }

  //! handle course deletion - need to make lambda function for this
  const handleDeleteCourse = async (courseId) => {
    try {
      deleteCourse(courseId)

      // update the react query cache
      queryClient.setQueryData(['courses'], (oldData) =>
        oldData.filter((course) => course._id !== courseId)
      )
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }
  // handle delete course click
  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId)
    setDeleteDialogOpen(true)
  }
  // handle invite student click
  const handleInviteStudentClick = (courseId, courseName) => {
    // console.log('Invite Student Clicked:', courseId, courseName)
    setSelectedCourseIdForInvite(courseId)
    setSelectedCourseName(courseName)
    setInviteDialogOpen(true)
  }
  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Courses
          </Typography>
          <Typography
            variant="body2"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#475569',
              lineHeight: 1.6,
              textAlign: 'left',
            }}
          >
            Use this page to oversee and manage your courses. You can add new
            problems, review existing content, invite students, and make updates
            as needed. Easily organize your teaching or learning materials, all
            in one place.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {/* course list section */}
          <Grid item xs={12} md={9}>
            {courses.length === 0 ? (
              <Typography>No courses available.</Typography>
            ) : (
              courses.map((course) => (
                <Card
                  key={course._id}
                  sx={{
                    mb: theme.spacing(2),
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {course.courseName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Students: {course.students ? course.students.length : 0}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddProblemsClick(course._id)}
                      >
                        Add problems
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<MenuBookIcon />}
                        onClick={() => handleViewProblemsClick(course._id)}
                      >
                        View problems
                      </Button>
                      <Button variant="outlined" startIcon={<GroupAddIcon />} onClick={() => handleInviteStudentClick(
                        course.link,
                        course.courseName
                      )}>
                        Invite student
                      </Button>

                      <Button
                        variant="text"
                        sx={{
                          marginLeft: 'auto',
                          color: theme.palette.error.light,
                          '&:hover': {
                            color: theme.palette.error.main,
                          },
                          // make the button a perfect circle
                          borderRadius: '50%',
                          minWidth: '40px',
                          padding: '4px',
                        }}
                        onClick={() => handleDeleteClick(course._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>

          {/* sidebar section */}
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
                      startIcon={<AddIcon />}
                      size="large"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Add New Course
                    </Button>
                  </ListItem>
                )}
                {/* ClassFormDialog for new class name pop up */}
                <ClassFormDialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  onCreate={handleCreateCourse}
                />
                {isAuthenticated && (
                  <ListItem>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<JoinIcon />}
                      size="large"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Join Course
                    </Button>
                  </ListItem>
                )}
                {/* InviteStudentDialog for invitation link code pop up */}
                <InviteStudentDialog
                  open={inviteDialogOpen}
                  onClose={() => setInviteDialogOpen(false)}
                  courseName={selectedCourseName}
                  courseId={SelectedCourseIdForInvite}
                />
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* view problems dialog popup */}
        <StyledDialog open={viewProblemsDialogOpen} onClose={handleCloseViewProblemsDialog}>
          <ViewProblemsDialog
            open={viewProblemsDialogOpen}
            onClose={handleCloseViewProblemsDialog}
            problems={selectedCourseProblems}
          />
          <DialogActions>
            <Button onClick={handleCloseViewProblemsDialog}>Close</Button>
          </DialogActions>
        </StyledDialog>

        {/* delete confirmation dialog */}
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => handleDeleteCourse(selectedCourseId)}
        />
      </Container>
    </Box>
  )
}

export default CourseList
