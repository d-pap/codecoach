import axios from "axios"

const API_URL = "https://appu3yu7tg.execute-api.us-east-1.amazonaws.com/dev"

export const fetchProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems`)
    return response.data
  } catch (error) {
    console.error("Error fetching problems:", error)
    throw error
  }
}
