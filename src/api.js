/**
 * File to manage all interactions between React and backend API (AWS)
 *
 * AWS APIGW invoke URL is defined here and define functions
 * to handle API requests (e.g., get data, posting data, etc.)
 */
import axios from "axios"

const API_GATEWAY_URL = "https://appu3yu7tg.execute-api.us-east-1.amazonaws.com/dev"
const LLM_URL = "http://localhost:3500"

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/problems`)
    return response.data
  } catch (error) {
    console.error("Error fetching problems:", error)
    throw error
  }
}

export async function fetchProblemById(id) {
  try {
    const response = await axios.get(`${API_GATEWAY_URL}/problems/${id}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch problem details")
  }
}

// // Function for LLM interaction
// // Lambda function and APIGW endpoint not made yet so this does not return
// // anything yet until we set the LLM up.
// export async function getHint(problem) {
//   try {
//     const response = await axios.post(`${API_GATEWAY_URL}/llm`, { problem })
//     return response.data.hint
//   } catch (error) {
//     console.error("Error fetching hint:", error)
//     throw new Error("Failed to fetch hint")
//   }
// }

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
    console.error("Error fetching hint:", error)
    throw new Error("Failed to fetch hint")
  }
}

// export const chatResponse = async (message) => {
//   try {
//     const response = await axios({
//       method: "post",
//       url: `${LLM_URL}/llm-test`,
//       data: { message },
//     })
//     let output = response.data.answer
//     return output
//   } catch (error) {
//     console.error("Error:", error)
//   }
// }

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
    console.error("Error fetching hint:", error)
    throw new Error("Failed to fetch hint")
  }
}
