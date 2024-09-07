/**
 * Allows the user to maintain a conversation with the AI
 */

import { createNewChatConvo, sendChatMessage } from '../../../api'

// Format the input and send it to the AI model
const SendChat = async (title, description, input, convoId, command) => {
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
      'Problem title: ' + title + 'Problem Description:' + description

    if (command === 'hint') {
      formatedInput =
        formatedInput +
        ' Provide the user with a breakdown of the problem. Start the response with "Here is a breakdown of the problem:". Do not provide a solution and do not provide code.'
    } else if (command === 'solution') {
      formatedInput =
        formatedInput +
        ' Provide the user with a solution to the problem. Start the response with "Here is a solution to the problem:". Provide a short explanation afterwards. Be consise.'
    } else {
      formatedInput = formatedInput + ' User Input: ' + input
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
