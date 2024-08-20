/**
 * Allows the user to maintain a conversation with the AI
 */

import { createNewChatConvo, sendChatMessage } from '../../../api'

const SendChat = async (title, input, convoId) => {
  let id = convoId
  let formatedInput = 'Problem title: ' + title + ' Question: ' + input

  try {
    if (id == null) {
      // create a new chat conversation
      const newChat = await createNewChatConvo()
      id = newChat.pk
    }

    // Initiating the conversation
    // const chatResponse = await sendChatMessage(id, formatedInput)

    // return chatResponse
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
