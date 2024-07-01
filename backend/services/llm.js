/* Put `llm.js` file here instead of in middleware folder */

const ollama = require("ollama")

let modelResponse = ""

const chatConfig = {
  model: "mistral",
  role: "user",
  content: "Default message",
}

const chatBot = async (message) => {
  try {
    chatConfig.content = message
    modelResponse = await ollama.chat({
      model: chatConfig.model,
      role: chatConfig.role,
      content: chatConfig.content,
    })
    return modelResponse
  } catch (err) {
    console.log(err)
    return { error: "Failed to get response from model" }
  }
}

module.exports = { chatBot }
