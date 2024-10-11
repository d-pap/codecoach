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

/**
 * COURSES PAGE CODE
 */
// Fake database
const db = {
  courses: [
    {
      _id: '66f28c421e0ebc6def357c5',
      courseId: 'COURSE-1001',
      problemIds: [],
      courseName: 'ICPC Beginner',
    },
    {
      _id: '66f28dd81e0ebc6def357c7',
      courseId: 'COURSE-2002',
      problemIds: [],
      courseName: 'ICPC Intermediate',
    },
  ],

  users: [
    {
      _id: '667d848bce9f1e40bd80862',
      email: 'test_email1@gmail.com',
      password:
        's2b$1o9tghQP.a5hh!H2sBkMsgkHoFZjHjrSsYDssbOr8/3u!de3Joa3WaITBS',
      role: 'student',
      courses: ['COURSE-1001', 'COURSE-2002'],
    },
    {
      _id: '66f28e41e0ebc6def357ca',
      email: 'teacher@gmail.com',
      password:
        's2b$1o9tghQP.a5hh!H2sBkMsgkHoFZjHjrSsYDssbOr8/3u!de3Joa3WaITBS',
      role: 'teacher',
      courses: ['COURSE-1001'],
    },
  ],

  problems: [
    {
      _id: '66fdbd5a2d0b7693b47909',
      title: 'Problem 1',
      description: 'This is the first problem description.',
    },
    {
      _id: '66fdbd5a2d0b7693b47909',
      title: 'Problem 2',
      description: 'This is the second problem description.',
    },
  ],
}

// Function to get a user by email
export function getUserByEmail(email) {
  const user = db.users.find((user) => user.email === email)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

// Function to create a new course
export function createCourse(courseName, courseId, teacherId, problemIds = []) {
  const newCourse = {
    _id: `course-${Date.now()}`,
    courseId,
    teacherId,
    problemIds,
    courseName: courseName,
  }
  db.courses.push(newCourse)
  return newCourse
}

// Function to fetch a specific course by courseId
export function fetchCourse(courseId) {
  const course = db.courses.find((course) => course.courseId === courseId)
  if (!course) {
    throw new Error('Course not found')
  }

  // Fetch problems for the course by their IDs
  const problems = course.problemIds.map((problemId) =>
    db.problems.find((problem) => problem._id === problemId)
  )
  return { ...course, problems } // Return course with problem details
}

// Function to add a problem ID to a course's problemIds array
export function addProblemID(courseId, problemId) {
  const course = db.courses.find((course) => course.courseId === courseId)
  if (!course) {
    throw new Error('Course not found') // This is where the error is thrown
  }

  if (!course.problemIds.includes(problemId)) {
    course.problemIds.push(problemId)
    console.log(`Problem ID ${problemId} added to course ${courseId}`)
  } else {
    console.log(`Problem ID ${problemId} already exists in course ${courseId}.`)
  }

  return course
}

// Function to delete a course by courseId
export function deleteCourse(courseId) {
  const courseIndex = db.courses.findIndex(
    (course) => course.courseId === courseId
  )
  if (courseIndex !== -1) {
    db.courses.splice(courseIndex, 1)
    return { success: true }
  } else {
    throw new Error('Course not found')
  }
}

// Function to get courses for a specific user by userId
export function getCoursesByUser(userId) {
  const user = db.users.find((user) => user._id === userId)
  if (!user) {
    throw new Error('User not found')
  }

  // Fetch courses based on user's enrolled courses
  const userCourses = user.courses.map((courseId) =>
    db.courses.find((course) => course.courseId === courseId)
  )

  return userCourses
}

// Function to add a course to a user
export function addCourseToUser(userId, courseId) {
  const user = db.users.find((user) => user._id === userId)
  const course = db.courses.find((course) => course.courseId === courseId)
  if (user && course) {
    user.courses.push(courseId)
    return user
  } else {
    throw new Error('User or course not found')
  }
}

// Function to delete a course from a user
export function deleteCourseFromUser(userId, courseId) {
  const user = db.users.find((user) => user._id === userId)
  if (user) {
    user.courses = user.courses.filter((c) => c !== courseId)
    return user
  } else {
    throw new Error('User not found')
  }
}
