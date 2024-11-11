/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from 'axios'
import { Auth } from 'aws-amplify'

const API_GATEWAY_URL = process.env.REACT_APP_API_URL

export const fetchProblems = async (params) => {
  /**
   * if no type is provided, then all problems are fetched
   * if type is 'icpc', then icpc problems are fetched
   * if type is 'interview', then interview problems are fetched
   */
  const {
    page = 1,
    limit = 10,
    // problems page filters
    region = 'all',
    subregion = 'all',
    year = 'all',
    // interview prep filters
    difficulty = 'all',
    company = 'all',
    topic = 'all',
    // common filters
    searchQuery = '',
    type = 'all',
  } = params

  try {
    const response = await axios.get(`${API_GATEWAY_URL}/problems`, {
      params: {
        page,
        limit,
        region,
        subregion,
        year,
        difficulty,
        company,
        topic,
        searchQuery,
        type,
      },
    })
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

// function to fetch additional problem fields only (exampleInputs, exampleOutputs, testCases, hint) instead of all fields to speed up query
export async function fetchAdditionalProblemFields(id) {
  try {
    const response = await axios.get(
      `${API_GATEWAY_URL}/problems/${id}/?fields=exampleInputs,exampleOutputs,testCases,hint`
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch additional problem fields')
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

/* export const checkExecutionLimits = async (userId) => {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/executionLimit`, {
      userId: userId,
    })
    return response.data
  } catch (error) {
    console.error('Error checking execution limits:', error)
    throw new Error('Failed to check execution limits')
  }
} */
export const checkExecutionLimits = async (userId) => {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/executionLimit`, {
      userId: userId,
    })
    return response.data
  } catch (error) {
    console.error(
      'Error checking execution limits:',
      error.response ? error.response.data : error.message
    )
    throw new Error('Failed to check execution limits')
  }
}

// function to execute code using Judge0 API
// passes source code and language to the API
// and returns the result
export const executeCode = async (
  sourceCode,
  customTestCases = '',
  language_id = 71
) => {
  try {
    // get current user
    const userId = await getCurrentUserId()

    // check the execution limits
    const limitResponse = await checkExecutionLimits(userId)
    if (limitResponse.message === 'Execution limit reached') {
      alert('You have reached your execution limit.')
      return { error: 'Execution limit reached' }
    }

    // if execution is allowed, proceed to execute the code
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
      },
      body: JSON.stringify({
        language_id: language_id,
        source_code: sourceCode,
        stdin: customTestCases,
        //!cpu_time_limit: 5,
      }),
    }

    const response = await fetch(process.env.REACT_APP_RAPID_API_URL, options)
    const data = await response.json()
    const token = data.token

    // poll for results
    let result
    do {
      await new Promise((resolve) => setTimeout(resolve, 100)) // wait for .1 second
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
    console.error('Error during code execution:', error)
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

export const getComments = async (problemId) => {
  try {
    const response = await axios.get(
      `${API_GATEWAY_URL}/problems/${problemId}/comments`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export const postComment = async (problemId, userId, message) => {
  try {
    const response = await axios.post(
      `${API_GATEWAY_URL}/problems/${problemId}/comments`,
      {
        problemId,
        userId,
        message,
      }
    )
    return response.data
  } catch (error) {
    console.error('Error adding comment:', error)
    throw error
  }
}

export const likeComment = async (problemId, commentId, userId) => {
  try {
    const response = await axios.patch(
      `${API_GATEWAY_URL}/problems/${problemId}/comments/${commentId}`,
      { userId } // pass userId to toggle like
    )
    return response.data
  } catch (error) {
    console.error('Error liking/unliking comment:', error)
    throw error
  }
}

/**
 * COURSES PAGE CODE
 */

// function to create a course in the database
export const createCourseInDatabase = async (courseData, userId) => {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/courses`, {
      courseData,
      userId,
    })

    if (response.status !== 200) {
      throw new Error('Failed to create course')
    }

    return response.data.course
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

// function to fetch a course by courseId
export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/courses/${courseId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching course:', error)
    throw error
  }
}

// function to fetch all courses
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/courses`)
    return response.data
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

// function to add problem IDs to a course
export const addProblemsToCourse = async (courseId, problemIds) => {
  //console.log('Sending problem IDs to API:', { courseId, problemIds }) // log data being sent
  try {
    const response = await axios.patch(
      `${API_GATEWAY_URL}/courses/${courseId}`,
      {
        problemIds,
      }
    )
    //console.log('API response:', response) // log response from api
    return response.data
  } catch (error) {
    // log error details
    console.error(
      'Error adding problems to course:',
      error.response || error.message
    )
    throw error
  }
}

// get all problems for a specific course
export const getCourseByIdProblems = async (courseId) => {
  console.log('Fetching course problems for course ID:', courseId)
  try {
    const course = await getCourseById(courseId) // fetch course details
    const problemDetails = await Promise.all(
      course.problemIds.map((id) => fetchProblemById(id)) // fetch each problem detail by ID
    )
    return problemDetails
  } catch (error) {
    console.error('Error fetching course problems:', error)
    throw error
  }
}

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
export function createCourse(courseId, teacherId, problemIds = []) {
  const newCourse = {
    _id: `course-${Date.now()}`,
    courseId,
    teacherId,
    problemIds,
    courseName: `Course ${courseId}`,
  }
  db.courses.push(newCourse)
  return newCourse
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

// Function to send a resume to the GPT
export async function sendResume(resume) {
  try {
    const response = await axios.post(`${API_GATEWAY_URL}/resume`, {
      resume,
    })
    return response.data
  } catch (error) {
    console.error('Error sending resume:', error)
    throw new Error('Failed to send resume to GPT')
  }
}
