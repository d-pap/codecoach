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
import { fetchProblemById } from '../api'
import ProblemDetailLayout from '../components/problems/ProblemDetailLayout'
import ProblemDetails from '../components/problems/ProblemDetails'

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
        // eslint-disable-next-line no-unused-vars
        testCases: data.testCases.map(({ _id, ...rest }) => rest),
      }
    },
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

export default ProblemDetail
