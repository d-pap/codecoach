/**
 * Allows the user to maintain a conversation with the AI
 */

import { chatWithLLM } from '../../../api'

const SendChat = async (
  title,
  question,
  hint,
  conversation,
  updateChatHistory,
  probId
) => {
  try {
    // Initiating the conversation
    const chatInit = await chatWithLLM({
      title,
      question,
      hint,
      conversation,
    })

    // Assuming chatWithLLM returns a readable stream
    const reader = chatInit.body.getReader()
    let textStream = ''
    let done = false

    while (!done) {
      const { value, done: streamDone } = await reader.read()
      done = streamDone
      if (value) {
        // Decode the stream and append it to textStream
        const chunk = new TextDecoder().decode(value)
        textStream += chunk

        // Update chat history with streamed text
        updateChatHistory(probId, [
          ...conversation,
          { sender: 'llm', message: textStream },
        ])
      }
    }

    return textStream
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
