/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from 'axios'
import { Auth } from 'aws-amplify'

const API_GATEWAY_URL = process.env.REACT_APP_API_URL

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
    const response = await axios.post(`${API_GATEWAY_URL}/aiConvo`)
    return response.data
  } catch (error) {
    console.error('Error creating chat convo:', error)
    throw new Error('Failed to create chat convo')
  }
}

// Function to send a chat message to an existing conversation
export async function sendChatMessage(convoId, input) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/aiMessage`, {
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
export async function fetchForumComments(problemId) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/comment/${problemId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw new Error('Failed to fetch messages')
  }
}

// function to post a message to the database
export async function postForumComment(problemId, userId, message) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/comment`, {
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
export async function likeForumComment(messageId) {
  try {
    const response = await axios.post(
      `${API_GATEWAY_URL}/comment/${messageId}/like`
    )
    return response.data
  } catch (error) {
    console.error('Error liking message:', error)
    throw new Error('Failed to like message')
  }
}

// Function to add a new course
export async function createCourse(courseId, teacherId, problemIds = []) {
  const course = {
    courseId,
    teacherId,
    problemIds
  }
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/courses`, course)
    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw new Error('Failed to create course')
  }
}

// Function to fetch a specific course by courseId
export async function fetchCourse(courseId) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching course:', error)
    throw new Error('Failed to fetch course')
  }
}
// Function to add a problem ID to a course's problemIds array
export async function addProblemID(courseId, problemId) {
  console.log(`Adding problems to course with ID: ${courseId}`);
  try {
    const response = await axios.put(`${API_GATEWAY_URL}/courses/${courseId}/problems`, { problemId })
    return response.data
  } catch (error) {
    console.error('Error adding problem ID to course:', error)
    throw new Error('Failed to add problem to course')
  }
}
// Function to delete a course by courseId
export async function deleteCourse(courseId) {
  try {
    const response = await axios.delete(`${API_GATEWAY_URL}/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting course:', error)
    throw new Error('Failed to delete course')
  }
}

// Function to get course id from user account
export async function getCoursesByUser(userId) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/users/${userId}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses for user:', error);
    throw new Error('Failed to fetch courses for user');
  }
}

// Function to add course to user account

export async function addCourseToUser(userId, courseId) {
  try {
    const response = await axios.put(`${API_GATEWAY_URL}/users/${userId}/courses`, { courseId });
    return response.data;
  } catch (error) {
    console.error('Error adding course to user:', error);
    throw new Error('Failed to add course to user');
  }
}

// Function to delete course from user account

export async function deleteCourseFromUser(userId, courseId) {
  try {
    const response = await axios.delete(`${API_GATEWAY_URL}/users/${userId}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course from user:', error);
    throw new Error('Failed to delete course from user');
  }
}

