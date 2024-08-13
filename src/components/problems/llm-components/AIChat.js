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

    if (chatInit.error) {
      throw new Error(chatInit.error)
    }

    let textStream = ''

    if (
      chatInit.ok &&
      chatInit.body &&
      typeof chatInit.body.getReader === 'function'
    ) {
      const reader = chatInit.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (value) {
          const chunk = decoder.decode(value, { stream: !done })
          textStream += chunk

          updateChatHistory(probId, [
            ...conversation,
            { sender: 'llm', message: textStream },
          ])
        }
      }
    } else {
      console.error('Invalid response or no readable stream available')
      throw new Error('Invalid response or no readable stream available')
    }

    return textStream
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
