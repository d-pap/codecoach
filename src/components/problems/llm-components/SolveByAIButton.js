/**
 * Hint button for problem-solving page that will call the LLM
 * (temporary placement and styling for now and can update it later)
 *
 * Makes a post request to APIGW endpoint (not yet made) that will
 * trigger an AWS Lambda function (not yet made) to send the problem
 * and a pre-defined prompt to Mistral LLM and then return the response
 * to the user to help them solve the problem.
 */

import React, { useState } from 'react'
import { Button } from '@mui/material'

/**
 * Prompts the AI to generate a solution for the problem
 * once the user clicks the button. The AI will use
 * inferences given the problem itself and the hints stored
 * in the database for that problem.
 *
 * @param {string} title - Problem title
 * @param {string} question - Problem description
 * @param {string} answer - Problem answer
 * @param {function} updateSolutionText - Function to update the solution text in the parent component
 * @returns {JSX.Element} The rendered SolveByAIButton component
 */
const SolveByAIButton = ({ title, question, answer, updateSolutionText }) => {
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Function to handle getting a solution from the AI
   */
  const handleGetSolution = async () => {
    setIsLoading(true)
    try {
      // Dynamically import getSolution to optimize bundle size
      const { getSolution } = await import('../../../api')

      // Call the getSolution function with necessary parameters
      const solutionText = await getSolution(title, question, answer)
      updateSolutionText(solutionText)
    } catch (error) {
      console.error('Error fetching solution:', error)
      updateSolutionText('Error fetching solution. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        type="button"
        onClick={handleGetSolution}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get Solution'}
      </Button>
    </div>
  )
}

export default SolveByAIButton
