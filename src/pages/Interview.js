import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { styled, alpha } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Toolbar from '@mui/material/Toolbar'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import { fetchProblems } from '../api'
import InterviewCardLayout from '../components/problems/InterviewCardLayout'
import {
  getDifficulties,
  getCompanies,
  getTopics,
} from '../components/problems/InterviewOptions'
import { SkeletonProblemList } from './Problems'

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
  // local state for search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchChange(localSearchQuery)
    }
  }

  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value)
  }

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
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
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Difficulties</MenuItem>
              {difficulties?.map((diff) => (
                <MenuItem key={diff} value={diff.toLowerCase()}>
                  {diff}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={company}
              onChange={onCompanyChange}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Companies</MenuItem>
              {companies?.map((comp) => (
                <MenuItem key={comp} value={comp}>
                  {comp}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={topic}
              onChange={onTopicChange}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Topics</MenuItem>
              {topics?.map((top) => (
                <MenuItem key={top} value={top}>
                  {top}
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
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBarStyled>
    </Box>
  )
}

function Interview() {
  const [difficulty, setDifficulty] = useState('all')
  const [company, setCompany] = useState('all')
  const [topic, setTopic] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const problemsPerPage = 10
  const queryClient = useQueryClient()

  //! CHANGE THIS--------------------------------------------------------------------
  // fetching filter data (difficulties, companies, topics)
  const { data: difficulties } = useQuery({
    queryKey: ['difficulties'],
    queryFn: getDifficulties,
  })

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  })

  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })

  // fetch interview problems
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'interviewProblems',
      currentPage,
      problemsPerPage,
      difficulty,
      company,
      topic,
      searchQuery,
    ],
    queryFn: () => {
      return fetchProblems({
        page: currentPage,
        limit: problemsPerPage,
        difficulty,
        company,
        topic,
        searchQuery,
        type: 'interview',
      })
    },
    staleTime: 1000 * 60 * 30, //! 30 minutes
    cacheTime: 1000 * 60 * 60, //! 1 hour
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  // prefetch  next page in the background
  useEffect(() => {
    if (
      !isLoading &&
      data &&
      currentPage < Math.ceil(data.totalProblems / problemsPerPage)
    ) {
      queryClient.prefetchQuery({
        queryKey: [
          'interviewProblems',
          currentPage + 1,
          problemsPerPage,
          difficulty,
          company,
          topic,
          searchQuery,
        ],
        queryFn: () =>
          fetchProblems({
            page: currentPage + 1,
            limit: problemsPerPage,
            difficulty,
            company,
            topic,
            searchQuery,
            type: 'interview',
          }),
      })
    }
  }, [
    isLoading,
    data,
    currentPage,
    difficulty,
    company,
    topic,
    searchQuery,
    queryClient,
  ])

  // handle filter changes
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

  const handleSearchChange = useCallback((newSearchQuery) => {
    setSearchQuery(newSearchQuery)
    setCurrentPage(1)
  }, [])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (isError) {
    return (
      <Typography variant="body1">
        Error loading problems: {error.message}
      </Typography>
    )
  }

  const { problems, totalProblems } = data || { problems: [], totalProblems: 0 }

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
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Practice and prepare for technical interviews with a wide range of
          interview questions from top companies
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
          difficulties={difficulties || []}
          companies={companies || []}
          topics={topics || []}
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
            {isLoading ? (
              <SkeletonProblemList />
            ) : (
              <>
                {/* top pagination */}
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    justifyContent: 'right',
                  }}
                >
                  <Pagination
                    count={Math.ceil(totalProblems / problemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="small"
                  />
                </Box>

                {/* problems list */}
                {problems.length > 0 ? (
                  <Stack spacing={2}>
                    {problems.map((problem) => (
                      <InterviewCardLayout
                        key={problem._id}
                        interview={problem}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body1">No questions found</Typography>
                )}
                {/* bottom pagination */}
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'right' }}>
                  <Pagination
                    count={Math.ceil(totalProblems / problemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="small"
                  />
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export default Interview
