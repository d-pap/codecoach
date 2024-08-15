/**
 * Allows the user to maintain a conversation with the AI
 */

import { chatWithLLM } from '../../../api'

const SendChat = async (
  title,
  question,
  hint,
  conversation,
) => {
  try {

    // make the payload for the chat
    let payload = {
      title: title,
      question: question,
      hint: hint,
      conversation: conversation,
    }

    // Initiating the conversation
    const chatResponse = await chatWithLLM({
      payload
    })

    return chatResponse.answer

  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
