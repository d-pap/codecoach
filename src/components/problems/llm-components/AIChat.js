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

    console.log('chatInit:', chatInit)

    const iter = chatInit.answer.iter

    if (!iter) {
      throw new Error('No valid async iterable stream available in chatInit')
    }

    let textStream = ''

    // Assuming itr is an async iterable
    for await (const chunk of iter) {
      if (chunk && chunk.message && chunk.message.content) {
        const content = chunk.message.content
        textStream += content

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
