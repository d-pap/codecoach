/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from 'axios'
import { Auth } from 'aws-amplify'

const API_GATEWAY_URL = process.env.REACT_APP_API_URL
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

export async function addProblem(problem) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/problems`, problem)
    return response.data
  } catch (error) {
    console.error('Error adding problem:', error)
    throw new Error('Failed to add problem')
  }
}

// Function to create a new chat conversation
export async function createNewChatConvo() {
  try {
    const response = await axios.post(`${LLM_URL}/convo`)
    return response.data
  } catch (error) {
    console.error('Error creating chat convo:', error)
    throw new Error('Failed to create chat convo')
  }
}

// Function to send a chat message to an existing conversation
export async function sendChatMessage(convoId, input) {
  try {
    const response = await axios.post(`${LLM_URL}/message`, {
      convoId,
      input,
    })
    return response.data
  } catch (error) {
    console.error('Error sending chat message:', error)
    throw new Error('Failed to send chat message')
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

// function to save a submission to the database
export async function saveSubmission(submissionData) {
  try {
    const response = await axios.post(
      `${API_GATEWAY_URL}/submissions`,
      submissionData
    )
    return response.data
  } catch (error) {
    console.error('Error submitting code:', error)
    throw new Error('Failed to submit code')
  }
}

// function to get the current user ID
// for submit code button, discussions, etc.
export const getCurrentUserId = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const userId = user.attributes.sub
    return userId
  } catch (error) {
    console.error('Error getting user ID:', error)
  }
}

// function to fetch messages from the database
export async function fetchMessages(problemId) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/messages/${problemId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw new Error('Failed to fetch messages')
  }
}

// function to post a message to the database
export async function postMessage(problemId, userId, message) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/messages`, {
      problemId,
      userId,
      message,
    })
    return response.data
  } catch (error) {
    console.error('Error posting message:', error)
    throw new Error('Failed to post message')
  }
}

// function to like a message
export async function likeMessage(messageId) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/messages/${messageId}/like`)
    return response.data
  } catch (error) {
    console.error('Error liking message:', error)
    throw new Error('Failed to like message')
  }
}