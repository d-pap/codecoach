/**
 * Allows the user to maintain a conversation with the AI
 */

import { createNewChatConvo, sendChatMessage } from '../../../api'

const SendChat = async (title, description, input, convoId) => {
  let id = convoId
  let formatedInput =
    'Problem title: ' +
    title +
    'Problem Description:' +
    description +
    ' Question: ' +
    input

  try {
    if (id == null) {
      // create a new chat conversation
      const newChatId = await createNewChatConvo()
      id = newChatId.convoId
    }

    // Initiating the conversation
    const chat = await sendChatMessage(id, formatedInput)

    console.log('Chat response:', chat)

    return chat.response
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
