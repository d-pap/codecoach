import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress'
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CenteredCircleLoader from '../components/utility/CenteredLoader'

import {
  getCurrentUserId,
  createCourseInDatabase,
  getCourseById,
  deleteCourse,
  getCoursesByUser,
  fetchProblems,
  getAllCourses,
  addProblemsToCourse,
  getCourseByIdProblems,
} from '../api'

// styled component for description text in table
const TruncatedTypography = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.5em',
  maxHeight: '3em', // 2 lines * 1.5em line-height
})

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
              color: (theme) => theme.palette.primary.light600,
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
              color: (theme) => theme.palette.primary.light700,
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
                    width: '20%',
                  }}
                >
                  Problem Title
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    width: '20%',
                  }}
                >
                  <TableSortLabel
                    active={orderBy === 'region'}
                    direction={orderBy === 'region' ? order : 'asc'}
                    onClick={() => handleRequestSort('region')}
                  />
                  Contest
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
                          <TruncatedTypography variant="body1" sx={{ ml: 1 }}>
                            {problem.description}
                          </TruncatedTypography>
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
                                mb: 2,
                                fontSize: '0.875rem',
                                color: '#475569',
                                whiteSpace: 'pre-wrap',
                                letterSpacing: '0.00938em',
                                lineHeight: '1.75',
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

export default AddCourseContent
