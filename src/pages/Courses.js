/**
 * Courses page
 * This can be temporary if we want to use it for something else
 * or delete it completely. Was initially only made to construct navbar
 */
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import FormGroup from '@mui/material/FormGroup'
import DialogActions from '@mui/material/DialogActions'
import { Snackbar, CircularProgress } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import TableSortLabel from '@mui/material/TableSortLabel'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { alpha } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import JoinIcon from '@mui/icons-material/PersonAdd'
import CenteredCircleLoader from '../components/utility/CenteredLoader'
import {
  getCurrentUserId,
  createCourseInDatabase,
  getCourseById,
  deleteCourse,
  getCoursesByUser,
  fetchProblems,
  fetchProblemById,
  getAllCourses,
  addProblemsToCourse,
  getCourseByIdProblems,
} from '../api'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Description } from '@mui/icons-material'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import theme from '../theme'
import DialogContentText from '@mui/material/DialogContentText'

/********************************************************************************************************************
 * CLASSFORMDIALOG CODE
 ********************************************************************************************************************/
const ClassFormDialog = ({ open, onClose, onCreate }) => {
  const [selectedValue, setSelectedValue] = useState('enter')
  const [className, setClassName] = useState('')

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleClassSubmit = () => {
    if (className.trim() !== '') {
      onCreate(className)
      onClose()
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
        <Button color="primary" variant="contained" onClick={handleClassSubmit}>
          Create New Course
        </Button>
      </DialogContent>
    </Dialog>
  )
}
/********************************************************************************************************************
 * END CLASSFORMDIALOG CODE
 ********************************************************************************************************************/

/********************************************************************************************************************
 * COURSEADDPROBLEM CODE
 ********************************************************************************************************************/
const AddCourseContent = () => {
  const { courseId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProblems, setSelectedProblems] = useState([])
  const [courseProblems, setCourseProblems] = useState([])
  const [courseName, setCourseName] = useState('')
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const problemsPerPage = 10
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('region')
  const [order, setOrder] = useState('asc')
  const [expandedProblem, setExpandedProblem] = useState(null)

  // fetch problems using react query
  const {
    data: problems,
    isLoading,
    error: problemsError,
  } = useQuery({
    queryKey: ['problems'],
    queryFn: fetchProblems,
  })

  // load course details
  useEffect(() => {
    async function loadCourseDetails() {
      try {
        const courseData = await getCourseById(courseId)
        if (!courseData) {
          throw new Error(`Course with ID ${courseId} not found`)
        }
        setCourseName(courseData.courseName || 'Unnamed Course')
        setCourseProblems(courseData.problemIds || [])
        setSelectedProblems(courseData.problemIds || [])
      } catch (error) {
        setError(`Error fetching course details: ${error.message}`)
      }
    }
    loadCourseDetails()
  }, [courseId])

  const sortedAndFilteredProblems = useMemo(() => {
    if (!problems) return [] // Return an empty array if problems is not available yet

    return problems
      .filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          `${problem.contestYear} ${problem.contestRegion}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (orderBy === 'region') {
          const regionA = `${a.contestYear} ${a.contestRegion}`
          const regionB = `${b.contestYear} ${b.contestRegion}`
          return order === 'asc'
            ? regionA.localeCompare(regionB)
            : regionB.localeCompare(regionA)
        }
        return 0
      })
  }, [problems, orderBy, order, searchTerm])

  if (isLoading) {
    return <CenteredCircleLoader />
  }
  if (problemsError) {
    return <Typography color="error">{problemsError.message}</Typography>
  }

  // handle problem selection
  const handleProblemChange = (problemId) => {
    setSelectedProblems((prev) => {
      if (prev.includes(problemId)) {
        return prev.filter((id) => id !== problemId) // deselect prob
      }
      return [...prev, problemId] // add selected prob
    })
  }

  // handle selected problems
  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await addProblemsToCourse(courseId, selectedProblems)
      const updatedProblems = await getCourseByIdProblems(courseId)
      setCourseProblems(updatedProblems)
      setShowSuccessMessage(true)
    } catch (error) {
      setError(`Error adding problems: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = sortedAndFilteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Course Content for {courseName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#475569',
              lineHeight: 1.6,
              mb: 2,
              textAlign: 'left',
            }}
          >
            Select the problems you want your students to work on for this
            course. You can search for specific problems or browse through the
            list below. Check the box next to each problem you want to include.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#334155',
              lineHeight: 1.6,
              mb: 2,
              textAlign: 'left',
              fontWeight: 'bold',
            }}
          >
            Click the 'Submit Selections' button when you're done to add the
            problems to your course.
          </Typography>
        </Box>
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for a problem"
            variant="outlined"
            value={searchTerm}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: (theme) => theme.palette.primary.main,
                  borderRadius: (theme) => theme.spacing(2),
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: (theme) => theme.palette.primary.main }}
                  />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            mt: 2,
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: (theme) => theme.spacing(2),
          }}
        >
          <Table
            stickyHeader
            aria-label="course problems table"
            style={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedProblems.length > 0 &&
                      selectedProblems.length < sortedAndFilteredProblems.length
                    }
                    checked={
                      sortedAndFilteredProblems.length > 0 &&
                      selectedProblems.length ===
                        sortedAndFilteredProblems.length
                    }
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedProblems(
                          sortedAndFilteredProblems.map((p) => p._id)
                        )
                      } else {
                        setSelectedProblems([])
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    width: '20%', //! added this to fix layout shift when collapsing rows-------------------------------
                  }}
                >
                  Problem Title
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    width: '20%', //! added this to fix layout shift when collapsing rows-------------------------------
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'region'}
                    direction={orderBy === 'region' ? order : 'asc'}
                    onClick={() => handleRequestSort('region')}
                  />
                  Region
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredProblems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((problem) => (
                  <React.Fragment key={problem._id}>
                    <TableRow
                      sx={{
                        backgroundColor: selectedProblems.includes(problem._id)
                          ? '#f8fafc'
                          : 'inherit',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProblems.includes(problem._id)}
                          onChange={() => handleProblemChange(problem._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{problem.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {`${problem.contestYear} ${problem.contestRegion}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              setExpandedProblem(
                                expandedProblem === problem._id
                                  ? null
                                  : problem._id
                              )
                            }
                          >
                            {expandedProblem === problem._id ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                          <Typography variant="body1" sx={{ ml: 1 }}>
                            {problem.description.slice(0, 100)}...
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={4}
                      >
                        <Collapse
                          in={expandedProblem === problem._id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              margin: 1,
                              mx: 8,
                              //maxWidth: '80%',
                            }}
                          >
                            <Typography
                              variant="body2"
                              gutterBottom
                              component="div"
                              sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: '#475569',
                                mt: 2,
                              }}
                            >
                              Full Problem Description
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                my: 1,
                                fontSize: '0.875rem',
                                color: '#475569',
                                whiteSpace: 'pre-wrap',
                                letterSpacing: '0.00938em',
                              }}
                            >
                              {problem.description}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0 }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Selections'}
          </Button>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedAndFilteredProblems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={6000}
          onClose={() => setShowSuccessMessage(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={() => setShowSuccessMessage(false)}
          >
            Problems successfully added to the course!
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  )
}

/********************************************************************************************************************
 * END COURSEADDPROBLEM CODE
 ********************************************************************************************************************/

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

const StyledDialogContent = styled(DialogContent)({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(80vh - 64px - 52px)', // Subtract DialogTitle and DialogActions heights
})

const StyledTableContainer = styled(TableContainer)({
  flexGrow: 1,
  overflow: 'auto',
})

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1),
}))

const DeleteButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
  },
}))

const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))

const CourseList = () => {
  const { isAuthenticated, role } = useContext(AuthContext)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [viewProblemsDialogOpen, setViewProblemsDialogOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('region')
  const [order, setOrder] = useState('asc')
  const [expandedProblem, setExpandedProblem] = useState(null)
  const [selectedProblems, setSelectedProblems] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)

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

  // handle course creation
  const handleCreateCourse = async (courseName) => {
    try {
      const userId = await getCurrentUserId()
      if (!userId) {
        throw new Error('User not authenticated')
      }

      const newCourse = {
        courseName: courseName,
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

  const handleViewProblemsClick = (courseId) => {
    setSelectedCourseId(courseId)
    setViewProblemsDialogOpen(true)
  }

  const handleCloseViewProblemsDialog = () => {
    setViewProblemsDialogOpen(false)
    setSelectedCourseId(null)
  }

  const handleAddProblemsClick = (courseId) => {
    navigate(`/courses/${courseId}/add-content`)
  }

  //! handle course deletion - need to make lambda function for this
  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId)

      // update the react query cache
      queryClient.setQueryData(['courses'], (oldData) =>
        oldData.filter((course) => course._id !== courseId)
      )
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedProblems = React.useMemo(() => {
    if (!selectedCourseProblems) return []
    return [...selectedCourseProblems].sort((a, b) => {
      if (orderBy === 'region') {
        const regionA = `${a.contestYear} ${a.contestRegion}`
        const regionB = `${b.contestYear} ${b.contestRegion}`
        return order === 'asc'
          ? regionA.localeCompare(regionB)
          : regionB.localeCompare(regionA)
      }
      return 0
    })
  }, [selectedCourseProblems, orderBy, order])

  if (isLoading) {
    return <CenteredCircleLoader />
  }

  if (error) {
    return <Typography color="error">{error.message}</Typography>
  }

  // function to handle selecting all checkboxes
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sortedProblems.map((problem) => problem._id)
      setSelectedProblems(newSelecteds)
      return
    }
    setSelectedProblems([])
  }

  // function to handle selecting individual checkboxes
  const handleClick = (id) => {
    const selectedIndex = selectedProblems.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProblems, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProblems.slice(1))
    } else if (selectedIndex === selectedProblems.length - 1) {
      newSelected = newSelected.concat(selectedProblems.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProblems.slice(0, selectedIndex),
        selectedProblems.slice(selectedIndex + 1)
      )
    }
    setSelectedProblems(newSelected)
  }

  //! function to handle deleting selected problems - connect to lambda function later
  const handleDeleteSelectedProblems = () => {
    //! implement deletion logic here, for now just reset selected problems
    console.log('Delete selected problems:', selectedProblems)
    setSelectedProblems([])
  }

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      handleDeleteCourse(courseToDelete)
    }
    setDeleteDialogOpen(false)
    setCourseToDelete(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setCourseToDelete(null)
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 2, fontWeight: 'bold' }}
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
          {/* Course List Section */}
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
                      <Button variant="outlined" startIcon={<GroupAddIcon />}>
                        Invite student
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(course._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
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
                      startIcon={<AddIcon />}
                      size="large"
                      sx={{ fontWeight: 'bold' }}
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
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* view problems dialog popup */}
        <StyledDialog
          open={viewProblemsDialogOpen}
          onClose={handleCloseViewProblemsDialog}
          aria-labelledby="view-problems-dialog-title"
          aria-describedby="view-problems-dialog-description"
        >
          <StyledDialogContent>
            {isLoadingProblems ? (
              <CenteredCircleLoader />
            ) : problemsError ? (
              <Typography color="error" sx={{ p: 2 }}>
                {problemsError.message}
              </Typography>
            ) : (
              <>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(selectedProblems.length > 0 && {
                      bgcolor: (theme) =>
                        alpha(
                          theme.palette.primary.main,
                          theme.palette.action.activatedOpacity
                        ),
                    }),
                  }}
                >
                  {selectedProblems.length > 0 ? (
                    <Typography
                      sx={{ flex: '1 1 100%' }}
                      color="inherit"
                      variant="subtitle1"
                      component="div"
                    >
                      {selectedProblems.length} selected
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                    >
                      Course Problems
                    </Typography>
                  )}
                  {selectedProblems.length > 0 ? (
                    <Tooltip title="Delete">
                      <IconButton onClick={handleDeleteSelectedProblems}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </Toolbar>
                <StyledTableContainer component={Paper}>
                  <Table stickyHeader aria-label="course problems table">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            indeterminate={
                              selectedProblems.length > 0 &&
                              selectedProblems.length < sortedProblems.length
                            }
                            checked={
                              sortedProblems.length > 0 &&
                              selectedProblems.length === sortedProblems.length
                            }
                            onChange={handleSelectAllClick}
                            inputProps={{
                              'aria-label': 'select all problems',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Problem Title
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          <TableSortLabel
                            active={orderBy === 'region'}
                            direction={orderBy === 'region' ? order : 'asc'}
                            onClick={() => handleRequestSort('region')}
                          />
                          Contest
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Description
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProblems
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((problem) => {
                          const isSelected = selectedProblems.includes(
                            problem._id
                          )
                          const labelId = `enhanced-table-checkbox-${problem._id}`
                          return (
                            <React.Fragment key={problem._id}>
                              <TableRow
                                hover
                                onClick={() => handleClick(problem._id)}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                selected={isSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isSelected}
                                    onChange={() => handleClick(problem._id)}
                                    inputProps={{
                                      'aria-labelledby': labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{problem.title}</TableCell>
                                <TableCell>{`${problem.contestYear} ${problem.contestRegion}`}</TableCell>
                                <TableCell>
                                  {problem.description.slice(0, 100)}...
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={4}
                                >
                                  <Collapse
                                    in={expandedProblem === problem._id}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <Box sx={{ margin: 1 }}>
                                      <Typography
                                        variant="body1"
                                        gutterBottom
                                        component="div"
                                        sx={{ fontWeight: 'bold' }}
                                      >
                                        Problem Description
                                      </Typography>
                                      <Typography variant="body2">
                                        {problem.description}
                                      </Typography>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          )
                        })}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sortedProblems.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewProblemsDialog}>Close</Button>
          </DialogActions>
        </StyledDialog>

        {/* delete confirmation dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: theme.spacing(2),
              width: '400px',
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
            >
              Confirm Deletion
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              Are you sure you want to delete this course? This will delete all
              problems associated with this course.
            </Typography>
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}
            >
              This action cannot be undone!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleDeleteCancel}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteConfirm}
              autoFocus
              sx={{
                backgroundColor: alpha(theme.palette.error.main, 0.7),
                '&:hover': {
                  backgroundColor: theme.palette.error.main,
                },
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export { AddCourseContent }
export default CourseList
