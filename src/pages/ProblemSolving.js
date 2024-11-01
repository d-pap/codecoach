/**
 * Problem Solving page
 * Where the user will solve the code problems
 * and submit solutions after selecting a problem
 * from the problems list on the Problems page
 */

import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CenteredCircleLoader from '../components/utility/CenteredLoader'
import { fetchProblemById, fetchAdditionalProblemFields } from '../api'
import ProblemDetailLayout from '../components/problems/ProblemDetailLayout'
import ProblemDetails from '../components/problems/ProblemDetails'

function ProblemSolving() {
  const location = useLocation()
  const problemFromLocation = location.state?.problem // problem data from Problems page
  const { problemId } = useParams()
  const queryClient = useQueryClient()
  if (problemFromLocation) {
    queryClient.setQueryData(['problem', problemId], problemFromLocation)
  }

  // fetch only additional fields if base fields are already cached
  const {
    data: problem,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['problem', problemId],
    queryFn: () => {
      // check if we have the base fields in cache
      const cachedProblem = queryClient.getQueryData(['problem', problemId])
      if (cachedProblem) {
        // if basic fields are cached, fetch only additional fields
        return fetchAdditionalProblemFields(problemId)
      } else {
        // otherwise fetch all fields
        return fetchProblemById(problemId)
      }
    },
    staleTime: 1000 * 60 * 15,
    initialData: problemFromLocation,
  })

  if (isLoading) {
    return <CenteredCircleLoader /> // You can replace this with a skeleton loader if preferred
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

export default ProblemSolving
