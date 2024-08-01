/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from 'axios'

const API_GATEWAY_URL = process.env.REACT_APP_APIGW_URL
const LLM_URL = 'http://localhost:3500'

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/problems`)
    return response.data
  } catch (error) {
    console.error('Error fetching problems:', error)
    throw error
  }
}

export async function fetchProblemById(id) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/problems/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch problem details')
  }
}

export async function addICPCProblem(problem) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/problems`, problem)
    return response.data
  } catch (error) {
    console.error('Error adding problem:', error)
    throw new Error('Failed to add problem')
  }
}

// Function for LLM interaction which returns a hint
// Lambda function and APIGW endpoint. Currently works
// as long as the LLM server is running locally
// https://github.com/Marv2014-1/llm-server
export async function getHint(question, answer) {
  try {
    const response = await axios.post(`${LLM_URL}/hint-problem`, {
      question,
      answer,
    })
    return response.data.answer
  } catch (error) {
    console.error('Error fetching hint:', error)
    throw new Error('Failed to fetch hint')
  }
}

// Function for LLM interaction which returns a solution
// Lambda function and APIGW endpoint. Currently works
// as long as the LLM server is running locally
// https://github.com/Marv2014-1/llm-server
export async function getSolution(question, answer) {
  try {
    const response = await axios.post(`${LLM_URL}/solve-problem`, {
      question,
      answer,
    })
    return response.data.answer
  } catch (error) {
    console.error('Error fetching hint:', error)
    throw new Error('Failed to fetch hint')
  }
}
