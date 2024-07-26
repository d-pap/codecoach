import axios from "axios"

const API_URL = "https://appu3yu7tg.execute-api.us-east-1.amazonaws.com/dev"
const LLM_URL = "http://localhost:3500"
const fetchProblems = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/problems`,
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error("Error fetching problems:", error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", error.response.data)
      console.error("Error response status:", error.response.status)
      console.error("Error response headers:", error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request data:", error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Unexpected error:", error.message)
    }
    throw error
  }
}

const chatResponse = async (message) => {
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

export { fetchProblems, chatResponse }
