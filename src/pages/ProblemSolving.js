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

  // cache problem's base fields from location state if available
  if (problemFromLocation) {
    queryClient.setQueryData(
      ['problemBaseFields', problemId],
      problemFromLocation
    )
  }

  // fetch problem's base fields from cache or fetch from server if needed
  const { data: baseProblemFields, isLoading: isLoadingBaseFields } = useQuery({
    queryKey: ['problemBaseFields', problemId],
    queryFn: () => fetchProblemById(problemId), // fetch full fields only if not cached
    enabled: !problemFromLocation, // fetch only if not already cached
    staleTime: 1000 * 60 * 15,
    initialData: problemFromLocation,
  })

  // fetch additional fields
  const {
    data: additionalProblemFields,
    isLoading: isLoadingAdditionalFields,
  } = useQuery({
    queryKey: ['problemAdditionalFields', problemId],
    queryFn: () => fetchAdditionalProblemFields(problemId),
    enabled: !!baseProblemFields, // fetch only when base fields are available
    staleTime: 1000 * 60 * 15,
  })

  const fullProblemData = { ...baseProblemFields, ...additionalProblemFields }

  if (isLoadingBaseFields || isLoadingAdditionalFields) {
    return <CenteredCircleLoader />
  }

  if (!fullProblemData) {
    return <div>Problem not found</div>
  }

  return (
    <ProblemDetailLayout
      problem={fullProblemData}
      problemDetails={<ProblemDetails problem={fullProblemData} />}
    />
  )
}

export default ProblemSolving
