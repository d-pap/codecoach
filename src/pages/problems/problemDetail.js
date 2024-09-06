/**
 * Problem Solving page
 * Where the user will solve the code problems
 * and submit solutions after selected a problem
 * from the problems list on Problems page
 */

import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProblemById } from '../../api'
import ProblemDetailLayout from '../../components/problems/ProblemDetailLayout'
import ProblemDetails from '../../components/problems/ProblemDetails'
import { LinearProgress } from '@mui/material'

function ProblemDetail() {
  const location = useLocation()
  const problemFromLocation = location.state?.problem
  const { problemId } = useParams() // extract problem ID from URL
  const queryClient = useQueryClient() // get query client instance

  // set problem data in the cache if passed from location
  if (problemFromLocation) {
    queryClient.setQueryData(['problem', problemId], problemFromLocation)
  }

  // use react query to get cached problem or fetch new problem if not cached
  const {
    data: problem,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['problem', problemId],
    queryFn: () => fetchProblemById(problemId),
    staleTime: 1000 * 60 * 5,
    initialData: problemFromLocation,
    select: (data) => {
      // remove _id from testCases attribute
      return {
        ...data,
        testCases: data.testCases.map(({ _id, ...rest }) => rest),
      }
    },
  })

  if (isLoading) {
    return <LinearProgress /> //TODO: replace with skeleton loader?
  }

  if (isError) {
    return <div>Error loading problem: {error.message}</div>
  }

  if (!problem) {
    return <div>Problem not found</div>
  }

  /**
   * Page rendering
   */
  return (
    <ProblemDetailLayout
      problem={problem}
      problemDetails={<ProblemDetails problem={problem} />}
    />
  )
}

export default ProblemDetail
