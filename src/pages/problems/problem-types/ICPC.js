import React, { useState, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
import { ICPCFilter } from '../../../components/problems/problem-filters/ICPCFilter'
import { getSubregions } from '../../../components/problems/subregions'
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
import { fetchProblems } from '../../../api'
import SearchIcon from '@mui/icons-material/Search'

const subregions = getSubregions()

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
  region,
  subregion,
  year,
  searchQuery,
  onRegionChange,
  onSubregionChange,
  onYearChange,
  onSearchChange,
}) => {
  const subregionOptions = region !== 'all' ? subregions[region] || [] : []

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
              value={region}
              onChange={onRegionChange}
              sx={{
                height: '40px',
                minWidth: '150px',
                padding: '0 10px',
                // make the left side of drop down align with left side of filter
              }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Regions</MenuItem>
              {Object.keys(subregions).map((regionKey) => (
                <MenuItem key={regionKey} value={regionKey}>
                  {regionKey}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={subregion}
              onChange={onSubregionChange}
              sx={{ height: '40px', minWidth: '150px', padding: '0 10px' }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Subregions</MenuItem>
              {subregionOptions.map((subregionItem) => (
                <MenuItem key={subregionItem} value={subregionItem}>
                  {subregionItem}
                </MenuItem>
              ))}
            </StyledSelect>
            <StyledSelect
              value={year}
              onChange={onYearChange}
              sx={{ height: '40px', minWidth: '150px', padding: '0 10px' }}
              MenuProps={menuProps}
            >
              <MenuItem value="all">All Years</MenuItem>
              {Array.from({ length: 2025 - 2008 + 1 }, (_, index) => {
                const year = 2025 - index
                return (
                  <MenuItem key={year} value={`${year}`}>
                    {year}
                  </MenuItem>
                )
              })}
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
        ICPC Problems
      </Typography>
      <FilterToolbar region="all" subregion="all" year="all" />
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

function ICPC() {
  const location = useLocation()
  const problemsFromLocation = location.state?.problems

  const {
    data: problems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['problems'],
    queryFn: fetchProblems,
    staleTime: 1000 * 60 * 5,
    initialData: problemsFromLocation,
  })

  const [region, setRegion] = useState('all')
  const [subregion, setSubregion] = useState('all')
  const [year, setYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const problemsPerPage = 10

  const filteredProblems = useMemo(() => {
    return ICPCFilter(problems, region, subregion, year).filter(
      (problem) =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.contestYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.contestRegion
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        problem.contestSubRegion
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
  }, [problems, region, subregion, year, searchQuery])

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
    setSubregion('all')
    setCurrentPage(1)
  }

  const handleSubregionChange = (event) => {
    setSubregion(event.target.value)
    setCurrentPage(1)
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
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
          ICPC Problems
        </Typography>
        <FilterToolbar
          region={region}
          subregion={subregion}
          year={year}
          searchQuery={searchQuery}
          onRegionChange={handleRegionChange}
          onSubregionChange={handleSubregionChange}
          onYearChange={handleYearChange}
          onSearchChange={handleSearchChange}
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
              <Typography variant="body1">No problems found</Typography>
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

export default ICPC
