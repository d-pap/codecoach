import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { fetchProblems } from '../api'
import InterviewCardLayout from '../components/problems/InterviewCardLayout'
import {
  getDifficulties,
  getCompanies,
  getTopics,
} from '../components/problems/InterviewOptions'
import PageLayout from '../components/PageLayout'
import ProblemsList from '../components/ProblemsList'
import FilterToolbar from '../components/FilterToolbar'
import ProblemCardSkeleton from '../components/problems/ProblemCardSkeleton'

function Interview() {
  const [difficulty, setDifficulty] = useState('all')
  const [company, setCompany] = useState('all')
  const [topic, setTopic] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const problemsPerPage = 10
  const queryClient = useQueryClient()

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
  const handleSearchChange = useCallback((newSearchQuery) => {
    setSearchQuery(newSearchQuery)
    setCurrentPage(1)
  }, [])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
      id: 'company',
      value: company,
      onChange: (e) => setCompany(e.target.value),
      allLabel: 'All Companies',
      options: getCompanies.map((company) => ({
        value: company,
        label: company,
      })),
    },
    {
      id: 'topic',
      value: topic,
      onChange: (e) => setTopic(e.target.value),
      allLabel: 'All Topics',
      options: getTopics.map((topic) => ({
        value: topic,
        label: topic,
      })),
    },
    {
      id: 'difficulty',
      value: difficulty,
      onChange: (e) => setDifficulty(e.target.value),
      allLabel: 'All Difficulties',
      options: getDifficulties.map((difficulty) => ({
        value: difficulty,
        label: difficulty,
      })),
    },
  ]

  return (
    <PageLayout
      overline="Interview Problems"
      title="Ace your next interview"
      subtitle="Practice real-world coding challenges asked by top companies. Build confidence and master the art of interviewing."
      //title="Practice and prepare for technical interviews with a wide range of interview questions from top companies"
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
                  <InterviewCardLayout key={problem._id} interview={problem} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body1">No questions found</Typography>
            )}
          </>
        )}
      </ProblemsList>
    </PageLayout>
  )
}

export default Interview
