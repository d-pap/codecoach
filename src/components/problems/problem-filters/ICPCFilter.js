/**
 * Filter for ICPC problems based on region and year
 */

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export function ICPCFilter(problems, region, year) {
  return problems.filter((problem) => {
    const regionMatch = region === 'all' || problem.contestRegion === region
    const yearMatch = year === 'all' || problem.contestYear === year
    return regionMatch && yearMatch
  })
}

export function ICPCFilterDisplay({
  region,
  year,
  onRegionChange,
  onYearChange,
}) {
  return (
    <>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="region-label">ICPC Contest Region</InputLabel>
        <Select
          labelId="region-label"
          value={region}
          onChange={onRegionChange}
          label="ICPC Contest Region"
        >
          <MenuItem value="all">All Regions</MenuItem>
          <MenuItem value="World">World</MenuItem>
          <MenuItem value="NA">North America</MenuItem>
          <MenuItem value="EU">Europe</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="year-label">ICPC Contest Year</InputLabel>
        <Select
          labelId="year-label"
          value={year}
          onChange={onYearChange}
          label="ICPC Contest Year"
        >
          <MenuItem value="all">All Years</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2019">2019</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
