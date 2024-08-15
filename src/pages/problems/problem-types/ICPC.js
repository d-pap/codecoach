// /**
//  * Section for loading ICPC questions and displaying to the user.
//  * The user can filter the questions by region and year.
//  */

// import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
// import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
// import {
//   ICPCFilter,
//   ICPCFilterDisplay,
// } from '../../../components/problems/problem-filters/ICPCFilter'
// import { Stack, Pagination } from '@mui/material'
// import HorizontalResizableColumn from '../../../components/utility/HorizontalResizableColumn'
// import { fetchProblems } from '../../../api'
// import { Box, Container, Grid, Typography } from '@mui/material'
// import VerticalResizableColumn from '../../../components/utility/VerticalResizableColumn'

// function ICPC() {
//   const location = useLocation()
//   const problemsFromLocation = location.state?.problems
//   const [problems, setProblems] = useState(problemsFromLocation || [])
//   const [region, setRegion] = useState('all')
//   const [year, setYear] = useState('all')
//   const [filteredProblems, setFilteredProblems] = useState(problems)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [resizableColumnProps, setResizableColumnProps] = useState({
//     initialWidth: 0,
//     minWidth: 0,
//     maxWidth: 0,
//   })
//   const [currentPage, setCurrentPage] = useState(1)
//   const problemsPerPage = 10

//   // Fetch problems if not loaded
//   useEffect(() => {
//     async function loadProblems() {
//       if (!problemsFromLocation) {
//         try {
//           const data = await fetchProblems()
//           setProblems(data)
//         } catch (err) {
//           setError('Error fetching problems')
//         } finally {
//           setLoading(false)
//         }
//       } else {
//         setLoading(false)
//       }
//     }
//     loadProblems()
//   }, [problemsFromLocation])

//   // Filter problems based on region and year
//   useEffect(() => {
//     setFilteredProblems(ICPCFilter(problems, region, year))
//   }, [problems, region, year])

//   // Handle resizable column properties
//   useEffect(() => {
//     function getResizableColumnProps() {
//       const windowWidth = window.innerWidth

//       // Calculate dimensions based on window width
//       const minWidth = windowWidth * 0.2
//       const maxWidth = windowWidth * 0.3
//       const initialWidth = windowWidth * 0.25

//       return { initialWidth, maxWidth, minWidth }
//     }

//     const updateColumnProps = () => {
//       setResizableColumnProps(getResizableColumnProps())
//     }

//     updateColumnProps()
//     window.addEventListener('resize', updateColumnProps)
//     return () => window.removeEventListener('resize', updateColumnProps)
//   }, [])

//   const handleRegionChange = (event) => {
//     setRegion(event.target.value)
//   }

//   const handleYearChange = (event) => {
//     setYear(event.target.value)
//   }

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page)
//   }

//   if (loading) {
//     return <p>Loading...</p>
//   }

//   if (error) {
//     return <p>{error}</p>
//   }

//   // Calculate the problems to display on the current page
//   const indexOfLastProblem = currentPage * problemsPerPage
//   const indexOfFirstProblem = indexOfLastProblem - problemsPerPage
//   const currentProblems = filteredProblems.slice(
//     indexOfFirstProblem,
//     indexOfLastProblem
//   )

//   return (
//     <Box
//       color={'red'} //! (REMOVE THIS LATER) Changes the color of the header text on this page ("ICPC Problems" and "Filters" text)
//       sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{ backgroundColor: 'pink' }} //! (REMOVE THIS LATER) Changes the color of container w/ heading, filter and problems list
//       >
//         <Typography
//           variant="h2"
//           component="h1"
//           gutterBottom
//           align="center"
//           sx={{ mb: 4 }}
//         >
//           ICPC Problems
//         </Typography>

//         <Grid container spacing={3}>
//           <HorizontalResizableColumn
//             initialWidth={300}
//             minWidth={200}
//             maxWidth={500}
//           >
//             <Box sx={{ backgroundColor: 'yellow', padding: 2 }}>
//               <Typography variant="h5" gutterBottom>
//                 Filters
//               </Typography>
//               <ICPCFilterDisplay
//                 region={region}
//                 year={year}
//                 onRegionChange={handleRegionChange}
//                 onYearChange={handleYearChange}
//               />
//             </Box>
//           </HorizontalResizableColumn>

//           <Grid item xs={12} md={8} lg={9}>
//             <Box sx={{ pl: { md: 2 } }}>
//               {' '}
//               {/* Add padding to the right column */}
//               {currentProblems.length > 0 ? (
//                 <Stack spacing={2}>
//                   {currentProblems.map((problem) => (
//                     <ProblemCardLayout key={problem._id} problem={problem} />
//                   ))}
//                 </Stack>
//               ) : (
//                 <Typography variant="body1">No problems found</Typography>
//               )}
//               <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
//                 <Pagination
//                   count={Math.ceil(filteredProblems.length / problemsPerPage)}
//                   page={currentPage}
//                   onChange={handlePageChange}
//                   color="primary"
//                 />
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   )
// }

// export default ICPC
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProblemCardLayout from '../../../components/problems/ProblemCardLayout'
import {
  ICPCFilter,
  ICPCFilterDisplay,
} from '../../../components/problems/problem-filters/ICPCFilter'
import { Stack, Pagination } from '@mui/material'
import HorizontalResizableColumn from '../../../components/utility/HorizontalResizableColumn'
import { fetchProblems } from '../../../api'
import { Box, Container, Grid, Typography } from '@mui/material'

function ICPC() {
  const location = useLocation()
  const problemsFromLocation = location.state?.problems
  const [problems, setProblems] = useState(problemsFromLocation || [])
  const [region, setRegion] = useState('all')
  const [year, setYear] = useState('all')
  const [filteredProblems, setFilteredProblems] = useState(problems)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [setFilterWidth] = useState(300) // Width of the filters column
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

  // Handle resizing of filter column
  const handleResize = (newWidth) => {
    setFilterWidth(newWidth)
  }

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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
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
        <Grid
          container
          spacing={0}
          sx={{ display: 'flex', flexWrap: 'nowrap' }}
        >
          <HorizontalResizableColumn
            initialWidth={200}
            minWidth={175}
            maxWidth={400}
            onResize={handleResize}
          >
            <Box sx={{ padding: 2 }}>
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
          </HorizontalResizableColumn>
          <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
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
