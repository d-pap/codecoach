/**
 * Filter for ICPC problems based on region and year
 */

// import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import styled from '@mui/material/styles/styled'

export function ICPCFilter(problems, region, year) {
  return problems.filter((problem) => {
    const regionMatch = region === 'all' || problem.contestRegion === region
    const yearMatch = year === 'all' || problem.contestYear === year
    return regionMatch && yearMatch
  })
}
// // styled components for filter dropdown items
// const FilterItems = styled(MenuItem)(({ theme }) => ({
//   fontFamily: 'Ubuntu', //! font family for filter dropdown items
// }))

// // styled components for filter dropdown labels
// const FilterLabels = styled(InputLabel)(({ theme }) => ({
//   fontFamily: 'Ubuntu', //! font family for filter dropdown labels
// }))

// export function ICPCFilterDisplay({
//   region,
//   year,
//   onRegionChange,
//   onYearChange,
// }) {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <FormControl fullWidth variant="outlined" margin="normal" size="small">
//         <FilterLabels id="region-label" sx={{ fontFamily: 'Ubuntu' }}>
//           ICPC Contest Region
//         </FilterLabels>
//         <Select
//           labelId="region-label"
//           value={region}
//           onChange={onRegionChange}
//           label="ICPC Contest Region"
//           sx={{ fontFamily: 'Ubuntu' }}
//         >
//           <FilterItems value="all">All Regions</FilterItems>
//           <FilterItems value="World">World</FilterItems>
//           <FilterItems value="NA">North America</FilterItems>
//           <FilterItems value="EU">Europe</FilterItems>
//         </Select>
//       </FormControl>
//       <FormControl fullWidth variant="outlined" margin="normal" size="small">
//         <FilterLabels id="year-label" sx={{ fontFamily: 'Ubuntu' }}>
//           ICPC Contest Year
//         </FilterLabels>
//         <Select
//           labelId="year-label"
//           value={year}
//           onChange={onYearChange}
//           label="ICPC Contest Year"
//           sx={{ fontFamily: 'Ubuntu' }}
//         >
//           <FilterItems value="all">All Years</FilterItems>
//           <FilterItems value="2021">2021</FilterItems>
//           <FilterItems value="2020">2020</FilterItems>
//           <FilterItems value="2019">2019</FilterItems>
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }
