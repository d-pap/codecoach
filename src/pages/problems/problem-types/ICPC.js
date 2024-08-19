/**
 * Section for loading ICPC questions and displaying to the user.
 * The user can filter the questions by region and year.
 */

// export default ICPC
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
import {
  ICPCFilter,
  //ICPCFilterDisplay,
} from '../../../components/problems/problem-filters/ICPCFilter'
import { styled, alpha } from '@mui/material/styles'
import { Stack, Pagination, Toolbar, Select } from '@mui/material'
// import HorizontalResizableColumn from '../../../components/utility/HorizontalResizableColumn'
import { fetchProblems } from '../../../api'
import { Box, Container, Grid, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import InputBase from '@mui/material/InputBase'
import MenuItem from '@mui/material/MenuItem'

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(2), // rounded corners for button container
  //boxShadow: 'none', //! remove box shadow? to match prob categories page?
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.secondary, 0.15), //! color of search box bg (this is light grey)
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.25), //! hover color of search box bg (this is light grey)
    transition: 'background-color 0.3s ease-in-out',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: 'black', //! font color of search box font and icon
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontFamily: 'Ubuntu', //! font family for search box
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: 'Ubuntu', //! font family for filter dropdown items
}))

const StyledSelect = styled(Select)(({ theme }) => ({
  fontFamily: 'Ubuntu',
  sx: {
    height: '40px',
    minWidth: '150px',
    padding: '0 10px',
  },
}))

function ICPC() {
  const location = useLocation()
  const problemsFromLocation = location.state?.problems
  const [problems, setProblems] = useState(problemsFromLocation || [])
  const [region, setRegion] = useState('all')
  const [year, setYear] = useState('all')
  const [filteredProblems, setFilteredProblems] = useState(problems)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //const [setFilterWidth] = useState(300) // Width of the filters column
  const [currentPage, setCurrentPage] = useState(1)
  const problemsPerPage = 10

  // Fetch problems if not loaded
  useEffect(() => {
    async function loadProblems() {
      if (!problemsFromLocation) {
        try {
          const data = await fetchProblems()
          setProblems(data)
        } catch (err) {
          setError('Error fetching problems')
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }
    loadProblems()
  }, [problemsFromLocation])

  // Filter problems based on region and year
  useEffect(() => {
    setFilteredProblems(ICPCFilter(problems, region, year))
  }, [problems, region, year])

  const handleRegionChange = (event) => {
    setRegion(event.target.value)
  }

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }

  // // Handle resizing of filter column
  // const handleResize = (newWidth) => {
  //   setFilterWidth(newWidth)
  // }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  // Calculate the problems to display on the current page
  const indexOfLastProblem = currentPage * problemsPerPage
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
  const currentProblems = filteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  )

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          ICPC Problems
        </Typography>
        {/* FILTERS TOOLBAR HERE: */}
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <AppBarStyled
            position="static"
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '6px', // rounded corners for button container
              boxShadow: 'none', // ! box shadow for app bar
              //  '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 4px 0px 5px -2px rgba(0, 0, 0, 0.2), -4px 0px 5px -2px rgba(0, 0, 0, 0.2)', //
            }}
          >
            <Toolbar
              sx={{
                display: 'flex',
                justifyContent: 'space-between', // even space between items
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <StyledSelect
                  value={region}
                  onChange={handleRegionChange}
                  sx={{
                    height: '40px',
                    minWidth: '150px',
                    padding: '0 10px',
                  }}
                >
                  <StyledMenuItem value="all">All Regions</StyledMenuItem>
                  <StyledMenuItem value="World">World</StyledMenuItem>
                  <StyledMenuItem value="NA">North America</StyledMenuItem>
                  <StyledMenuItem value="EU">Europe</StyledMenuItem>
                </StyledSelect>
                <StyledSelect
                  value={year}
                  onChange={handleYearChange}
                  sx={{
                    height: '40px',
                    minWidth: '150px',
                    padding: '0 10px',
                  }}
                >
                  <StyledMenuItem value="all">All Years</StyledMenuItem>
                  <StyledMenuItem value="2021">2021</StyledMenuItem>
                  <StyledMenuItem value="2020">2020</StyledMenuItem>
                  <StyledMenuItem value="2019">2019</StyledMenuItem>
                </StyledSelect>
              </Box>
              {/* SEARCH BOX HERE:  */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search questions..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBarStyled>
        </Box>
        <Grid
          container
          spacing={0}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            //backgroundColor: 'pink', //! bg color for testing
            boxShadow:
              '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 4px 0px 5px -2px rgba(0, 0, 0, 0.2), -4px 0px 5px -2px rgba(0, 0, 0, 0.2)',
            borderRadius: '6px', // rounded corners for the whole grid
          }}
        >
          {/* <HorizontalResizableColumn
            initialWidth={200}
            minWidth={175}
            maxWidth={400}
            onResize={handleResize}
          >
            <Box
              sx={{
                padding: 2,
                backgroundColor: 'lightblue', //! bg color for testing
              }}
            >
              <Typography variant="h5" gutterBottom>
                Filters
              </Typography>
              <ICPCFilterDisplay
                region={region}
                year={year}
                onRegionChange={handleRegionChange}
                onYearChange={handleYearChange}
              />
            </Box>
          </HorizontalResizableColumn> */}
          <Box
            sx={{
              flexGrow: 1,
              //paddingLeft: 2, //! padding for the problem cards was 2
              paddingLeft: 0,
              //backgroundColor: 'red', //! bg color for testing
            }}
          >
            <Box
              sx={{
                p: 1, //* this Box is for page number on the top
                display: 'flex',
                justifyContent: 'right',
                //backgroundColor: 'lightgreen', //! bg color for testing
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
