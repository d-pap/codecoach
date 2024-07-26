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

export const chatResponse = async (message) => {
  try {
    const response = await axios({
      method: "post",
      url: `${LLM_URL}/llm-test`,
      data: { message },
    })
    let output = response.data.answer
    return output
  } catch (error) {
    console.error("Error:", error)
  }
}
