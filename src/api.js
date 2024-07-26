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
