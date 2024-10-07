import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { styled, alpha } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import { fetchProblems } from '../../../api'
import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
import InterviewFilter from '../../../components/problems/problem-components/InterviewFilter'
import {
  getCompanies,
  getTopics,
  getDifficulties,
} from '../../../components/problems/InterviewOptions'

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(2),
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  backgroundColor: alpha(theme.palette.text.secondary, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.25),
    transition: 'background-color 0.3s ease-in-out',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: theme.palette.text.primary,
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  height: '40px',
  minWidth: '150px',
  padding: '0 10px',
  borderRadius: theme.spacing(2),
  '&.hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}))

const FilterToolbar = ({
  difficulty,
  company,
  topic,
  searchQuery,
  onDifficultyChange,
  onCompanyChange,
  onTopicChange,
  onSearchChange,
  difficulties,
  companies,
  topics,
}) => {
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300, // height of menu dropdowns of filters
      },
    },
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled
        position="static"
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StyledSelect
              value={difficulty}
              onChange={onDifficultyChange}
              sx={{
                height: '40px',
                minWidth: '150px',
                padding: '0 10px',
              }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Difficulties</MenuItem>
              {difficulties.map((difficultyOption) => (
                <MenuItem key={difficultyOption} value={difficultyOption}>
                  {difficultyOption}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={company}
              onChange={onCompanyChange}
              sx={{ height: '40px', minWidth: '150px', padding: '0 10px' }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Companies</MenuItem>
              {companies.map((companyOption) => (
                <MenuItem key={companyOption} value={companyOption}>
                  {companyOption}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={topic}
              onChange={onTopicChange}
              sx={{ height: '40px', minWidth: '150px', padding: '0 10px' }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Topics</MenuItem>
              {topics.map((topicOption) => (
                <MenuItem key={topicOption} value={topicOption}>
                  {topicOption}
                </MenuItem>
              ))}
            </StyledSelect>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search questions..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={onSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBarStyled>
    </Box>
  )
}

const SkeletonProblemList = () => (
  <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
    <Container maxWidth="lg">
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mb: 2 }}
      >
        Interview Questions
      </Typography>
      <FilterToolbar
        difficulty="all"
        company="all"
        topic="all"
        searchQuery=""
        difficulties={[]}
        companies={[]}
        topics={[]}
      />
      <Grid
        container
        spacing={0}
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          boxShadow:
            '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 4px 0px 5px -2px rgba(0, 0, 0, 0.2), -4px 0px 5px -2px rgba(0, 0, 0, 0.2)',
          borderRadius: (theme) => theme.spacing(2),
        }}
      >
        <Box sx={{ flexGrow: 1, padding: (theme) => theme.spacing(2) }}>
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
          </Box>
          <Stack spacing={2}>
            {[...Array(5)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
            <Skeleton
              variant="rectangular"
              width={150}
              height={40}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>
      </Grid>
    </Container>
  </Box>
)

function Interview() {
  const location = useLocation()
  const problemsFromLocation = location.state?.problems

  const {
    data: problems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['problems', 'interview'],
    queryFn: fetchProblems,
    staleTime: 1000 * 60 * 5,
    initialData: problemsFromLocation,
  })

  const [difficulty, setDifficulty] = useState('all')
  const [company, setCompany] = useState('all')
  const [topic, setTopic] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [difficulties, setDifficulties] = useState([])
  const [companies, setCompanies] = useState([])
  const [topics, setTopics] = useState([])
  const problemsPerPage = 10

  // Fetch the predefined lists for difficulties, companies, and topics
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const [difficultiesList, companiesList, topicsList] = await Promise.all([
        getDifficulties(),
        getCompanies(),
        getTopics(),
      ])
      setDifficulties(difficultiesList)
      setCompanies(companiesList)
      setTopics(topicsList)
    }

    fetchFilterOptions()
  }, [])

  // Ensure only problems of type 'interview' are considered
  const interviewProblems = useMemo(() => {
    return problems.filter(
      (problem) => problem.type && problem.type.toLowerCase() === 'interview'
    )
  }, [problems])

  // Filter problems using InterviewFilter
  const filteredProblems = useMemo(() => {
    let filtered = InterviewFilter(
      interviewProblems,
      difficulty,
      company,
      topic
    )

    // Apply search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((problem) => {
        return (
          (problem.title && problem.title.toLowerCase().includes(query)) ||
          (problem.description &&
            problem.description.toLowerCase().includes(query)) ||
          (problem.hint && problem.hint.toLowerCase().includes(query)) ||
          (problem.company && problem.company.toLowerCase().includes(query)) ||
          (problem.topic && problem.topic.toLowerCase().includes(query))
        )
      })
    }

    return filtered
  }, [interviewProblems, difficulty, company, topic, searchQuery])

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value)
    setCurrentPage(1)
  }

  const handleCompanyChange = (event) => {
    setCompany(event.target.value)
    setCurrentPage(1)
  }

  const handleTopicChange = (event) => {
    setTopic(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }, [])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return <SkeletonProblemList />
  }

  if (isError) {
    return (
      <Typography variant="body1">
        Error loading problems: {error.message}
      </Typography>
    )
  }

  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = filteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  )

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 2 }}
        >
          Interview Questions
        </Typography>
        <FilterToolbar
          difficulty={difficulty}
          company={company}
          topic={topic}
          searchQuery={searchQuery}
          onDifficultyChange={handleDifficultyChange}
          onCompanyChange={handleCompanyChange}
          onTopicChange={handleTopicChange}
          onSearchChange={handleSearchChange}
          difficulties={difficulties}
          companies={companies}
          topics={topics}
        />
        <Grid
          container
          spacing={0}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            boxShadow:
              '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 4px 0px 5px -2px rgba(0, 0, 0, 0.2), -4px 0px 5px -2px rgba(0, 0, 0, 0.2)',
            borderRadius: (theme) => theme.spacing(2),
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              padding: (theme) => theme.spacing(2),
              bgcolor: (theme) => theme.palette.background.default,
              borderRadius: (theme) => theme.spacing(2),
              boxShadow: 'none',
            }}
          >
            <Box
              sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Pagination
                count={Math.ceil(filteredProblems.length / problemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="small"
              />
            </Box>
            {currentProblems.length > 0 ? (
              <Stack spacing={2}>
                {currentProblems.map((problem) => (
                  <ProblemCardLayout key={problem._id} problem={problem} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body1">No questions found</Typography>
            )}
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
              <Pagination
                count={Math.ceil(filteredProblems.length / problemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="small"
              />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export default Interview
