import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import { fetchProblems } from '../api'
import { getSubregions } from '../components/problems/subregions'
import ProblemCardLayout from '../components/problems/ProblemCardLayout'

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

  // Add local state for search input
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearchChange(localSearchQuery)
    }
  }

  const handleSearchInputChange = (event) => {
    setLocalSearchQuery(event.target.value)
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
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={handleKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBarStyled>
    </Box>
  )
}

const SkeletonProblemList = () => (
  <Box sx={{ flexGrow: 1 }}>
    {/* top pagination skeleton */}
    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
      <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
    </Box>
    {/* problems list skeleton */}
    <Stack spacing={2}>
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={120}
          sx={{ borderRadius: (theme) => theme.spacing(2) }}
        />
      ))}
    </Stack>
  </Box>
)

function Problems() {
  const [region, setRegion] = useState('all')
  const [subregion, setSubregion] = useState('all')
  const [year, setYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const problemsPerPage = 10
  const queryClient = useQueryClient()

  // initial query to fetch problems for page 1 (10 problems)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['problems', currentPage, region, subregion, year, searchQuery],
    queryFn: () =>
      fetchProblems({
        page: currentPage,
        limit: problemsPerPage,
        region,
        subregion,
        year,
        searchQuery,
        type: 'icpc',
      }),
    staleTime: 1000 * 60 * 30, //! 30 minutes
    cacheTime: 1000 * 60 * 60, //! 1 hour
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // after page 1 is loaded, prefetch data for next page
  useEffect(() => {
    if (
      !isLoading &&
      data &&
      currentPage < Math.ceil(data.totalProblems / problemsPerPage)
    ) {
      //console.log('Prefetching next page data...')
      queryClient.prefetchQuery({
        queryKey: [
          'problems',
          currentPage + 1,
          region,
          subregion,
          year,
          searchQuery,
        ],
        queryFn: () =>
          fetchProblems({
            page: currentPage + 1,
            limit: problemsPerPage,
            region,
            subregion,
            year,
            searchQuery,
            type: 'icpc',
          }),
      })
    }
  }, [
    isLoading,
    data,
    currentPage,
    region,
    subregion,
    year,
    searchQuery,
    queryClient,
  ])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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

  const handleSearchChange = useCallback((newSearchQuery) => {
    setSearchQuery(newSearchQuery)
    setCurrentPage(1)
  }, [])

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
        {/* page title and subtitle */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 2 }}
        >
          Problems
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
          Explore and solve ICPC programming challenges from various regions and
          years
        </Typography>
        {/* filter toolbar */}
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
        {/* problems grid */}
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
                      <ProblemCardLayout key={problem._id} problem={problem} />
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body1">No problems found</Typography>
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

export { SkeletonProblemList }
export default Problems
