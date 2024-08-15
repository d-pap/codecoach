/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from 'axios'

const API_GATEWAY_URL = process.env.REACT_APP_API_URL
const LLM_URL = process.env.REACT_APP_LLM_URL

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

export async function addProblem(problem) {
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
export async function getHint(title, question, answer) {
  try {
    const response = await axios.post(`${LLM_URL}/hint-problem`, {
      title,
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
export async function getSolution(title, question, answer) {
  try {
    const response = await axios.post(`${LLM_URL}/solve-problem`, {
      title,
      question,
      answer,
    })
    return response.data.answer
  } catch (error) {
    console.error('Error fetching hint:', error)
    throw new Error('Failed to fetch hint')
  }
}

// Function for LLM interaction which returns a chat response
export async function chatWithLLM(payload) {
  try {
    const response = await axios.post(`${LLM_URL}/chat`, {
      payload
    })
    return response.data
  } catch (error) {
    console.error('Error fetching chat:', error)
    throw new Error('Failed to fetch chat')
  }
}

// Function to execute code using Judge0 API
// Passes source code and language to the API
// and returns the result
export const executeCode = async (sourceCode, language = 'python') => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
    },
    body: JSON.stringify({
      language_id: 71, // python judge0 language id = 71
      source_code: sourceCode,
      stdin: '',
    }),
  }

  try {
    const response = await fetch(process.env.REACT_APP_RAPID_API_URL, options)
    const data = await response.json()
    const token = data.token

    // poll for results
    let result
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // wait for 1 second
      const statusResponse = await fetch(
        `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
          },
        }
      )
      result = await statusResponse.json()
    } while (result.status.id <= 2) // 1: in queue, 2: processing

    return result
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
