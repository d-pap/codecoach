import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { fetchProblems } from '../api'
import { getSubregions } from '../components/problems/subregions'
import ProblemCardLayout from '../components/problems/ProblemCardLayout'
import PageLayout from '../components/PageLayout'
import ProblemsList from '../components/ProblemsList'
import FilterToolbar from '../components/FilterToolbar'
import ProblemCardSkeleton from '../components/problems/ProblemCardSkeleton'

function Problems() {
  const [region, setRegion] = useState('all')
  const [subregion, setSubregion] = useState('all')
  const [year, setYear] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const problemsPerPage = 10
  const queryClient = useQueryClient()

  const subregionData = getSubregions()
  const regions = Object.keys(subregionData).map((reg) => ({
    value: reg,
    label: reg,
  }))

  const subregions = useMemo(() => {
    if (region === 'all' || !subregionData[region]) return []
    return subregionData[region].map((sub) => ({
      value: sub,
      label: sub,
    }))
  }, [region])

  const years = [2014, 2008] //! TODO: change to dynamic years

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  const paginationComponent = (
    <Pagination
      count={Math.ceil(totalProblems / problemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      size="small"
    />
  )

  const filterConfig = [
    {
      id: 'region',
      value: region,
      onChange: (e) => {
        setRegion(e.target.value)
        setSubregion('all')
        setCurrentPage(1)
      },
      allLabel: 'All Regions',
      options: regions,
    },
    {
      id: 'subregion',
      value: subregion,
      onChange: (e) => {
        setSubregion(e.target.value)
        setCurrentPage(1)
      },
      allLabel: 'All Subregions',
      options: subregions,
    },
    {
      id: 'year',
      value: year,
      onChange: (e) => setYear(e.target.value),
      allLabel: 'All Years',
      options: years.map((y) => ({
        value: y,
        label: y.toString(),
      })),
    },
  ]

  return (
    <PageLayout
      overline="Competition Problems"
      title="Explore the toughest challenges"
      subtitle="Sharpen your skills with problems designed for ICPC and other competitive programming events."
    >
      <ProblemsList
        filters={true}
        filterToolbar={
          <FilterToolbar
            filters={filterConfig}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        }
        pagination={true}
        topPagination={paginationComponent}
        bottomPagination={paginationComponent}
      >
        {isLoading ? (
          <ProblemCardSkeleton />
        ) : (
          <>
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
          </>
        )}
      </ProblemsList>
    </PageLayout>
  )
}

export default Problems
