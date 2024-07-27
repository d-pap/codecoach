/**
 * Hint button for problem solving page that will call the LLM
 * (temporary placement and styling for now and can update it later)
 *
 * Makes a post request to APIGW endpoint (not yet made) that will
 * trigger a AWS Lambda function (not yet made) to send the problem
 * and a pre-defined prompt to Mistral LLM and then return the response
 * to the user to help them solve the problem.
 * test
 */

import React, { useState } from "react"
import styled from "styled-components"
import { getHint } from "../../api"

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`

const HintDisplay = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`

const HintButton = ({ problem }) => {
  const [hint, setHint] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // call the getHint function (defined in `api.js`)
  const handleGetHint = async () => {
    setIsLoading(true)
    try {
      const hintText = await getHint(problem)
      setHint(hintText)
    } catch (error) {
      console.error("Error fetching hint:", error)
      setHint("Error fetching hint. Please try again.")
    }
    setIsLoading(false)
  }

  // trigger it when user clicks the button and show results
  return (
    <div>
      <Button onClick={handleGetHint} disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Hint"}
      </Button>
      {hint && <HintDisplay>{hint}</HintDisplay>}
    </div>
  )
}

export default HintButton
