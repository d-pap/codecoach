/**
 * Allows the user to maintain a conversation with the AI
 */

import { createNewChatConvo, sendChatMessage } from '../../../api'

const SendChat = async (title, description, input, convoId) => {
  let id = convoId
  let formatedInput = ''

  try {
    if (id == null) {
      console.log('Null id', id)
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
