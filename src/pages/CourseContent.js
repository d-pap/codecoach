import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination'
import ProblemCardLayout from '../components/problems/ProblemCardLayout'
import PageLayout from '../components/PageLayout'
import ProblemsList from '../components/ProblemsList'
import { fetchProblemById, getAllCourses } from '../api'
import ProblemCardSkeleton from '../components/problems/ProblemCardSkeleton'
function CourseContent() {
  const { courseId } = useParams()

  // fetch courses data from cache OR fallback to API if not in cache (for direct access to course content and not the courses page)
  const queryClient = useQueryClient()
  const { data: courses = [], isLoading: isCoursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const cachedCourses = queryClient.getQueryData(['courses'])
      return cachedCourses ?? getAllCourses() // fetch from API if not in cache
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  // find the specific course from the fetched or cached courses data
  const course = courses.find((course) => course._id === courseId)

  // use the problemIds to fetch problem details
  const { data: courseProbs, isLoading: isProblemsLoading } = useQuery({
    queryKey: ['courseProblems', courseId],
    queryFn: async () => {
      if (!course?.problemIds) return [] // return empty array if no problemIds
      return Promise.all(course.problemIds.map((id) => fetchProblemById(id)))
    },
    enabled: !!course?.problemIds, // only run query if we have problemIds
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  const isLoading = isCoursesLoading || isProblemsLoading
  const problemsPerPage = 10
  const totalProblems = courseProbs?.length ?? 0
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }
  const paginationComponent = (
    <Pagination
      count={Math.ceil(totalProblems / problemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      size="small"
    />
  )
  return (
    <PageLayout title={course?.title} description={course?.description}>
      <ProblemsList
        filters={false}
        pagination={true}
        topPagination={paginationComponent}
        bottomPagination={paginationComponent}
      >
        {isLoading ? (
          <ProblemCardSkeleton />
        ) : (
          courseProbs?.map((problem) => (
            <ProblemCardLayout key={problem._id} problem={problem} />
          ))
        )}
      </ProblemsList>
    </PageLayout>
  )
}

export default CourseContent
