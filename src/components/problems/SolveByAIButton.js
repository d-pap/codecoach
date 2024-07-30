/**
 * Hint button for problem solving page that will call the LLM
 * (temporary placement and styling for now and can update it later)
 *
 * Makes a post request to APIGW endpoint (not yet made) that will
 * trigger a AWS Lambda function (not yet made) to send the problem
 * and a pre-defined prompt to Mistral LLM and then return the response
 * to the user to help them solve the problem.
 */

import React, { useState } from 'react'
import { getSolution } from '../../api'
import { Button } from '@mui/material'

/**
 * Prompts the ai to generate a solution for the problem
 * once the user clicks the button. The ai will user
 * infrances given the problem itself and the hints stored
 * in the database for taht problem.
 * @param {title} string - problem title
 * @param {question} string - problem description
 * @param {answer} string - problem answer
 * @returns
 */
const SolveByAIButton = ({ title, question, answer, updateSolutionText }) => {
  const [isLoading, setIsLoading] = useState(false)

  // call the getHint function (defined in `api.js`)
  const handleGetSolution = async () => {
    setIsLoading(true)
    try {
      const hintText = await getSolution(title, question, answer)
      updateSolutionText(hintText)
    } catch (error) {
      console.error('Error fetching solution:', error)
      updateSolutionText('Error fetching solution. Please try again.')
    }
    setIsLoading(false)
  }

  // trigger it when user clicks the button and show results
  return (
    <div>
      <Button
        variant="contained"
        type="button"
        onClick={handleGetSolution}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get solution'}
      </Button>
    </div>
  )
}

export default SolveByAIButton
