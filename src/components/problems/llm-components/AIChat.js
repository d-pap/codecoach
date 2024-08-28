/**
 * Allows the user to maintain a conversation with the AI
 */

import { createNewChatConvo, sendChatMessage } from '../../../api'

// Format the input and send it to the AI model
const SendChat = async (title, description, input, convoId) => {
  let id = convoId
  let formatedInput = ''

  // If there is no conversation id, create a new one
  try {
    if (id == null) {
      // create a new chat conversation
      const newChatId = await createNewChatConvo()
      id = newChatId.convoId
    }

    formatedInput =
      'Problem title: ' +
      title +
      'Problem Description:' +
      description +
      ' Question: ' +
      input

    // Initiating the conversation
    const chat = await sendChatMessage(id, formatedInput)

    return chat
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
