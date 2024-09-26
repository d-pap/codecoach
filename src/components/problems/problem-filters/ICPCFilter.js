/**
 * Filter for ICPC problems based on region and year
 */

export function ICPCFilter(problems, region, subregion, year) {
  return problems.filter((problem) => {
    const regionMatch = region === 'all' || problem.contestRegion === region
    const subregionMatch =
      subregion === 'all' || problem.contestSubRegion === subregion
    const yearMatch = year === 'all' || problem.contestYear === year
    return regionMatch && subregionMatch && yearMatch
  })
}
