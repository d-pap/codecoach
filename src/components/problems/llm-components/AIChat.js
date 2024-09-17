/**
 * Allows the user to maintain a conversation with the AI
 */

import { sendMessageToAi } from '../../../api'

// Format the input and send it to the AI model
const SendChat = async (title, description, input, conversationPk, command) => {
  let formattedInput = ''

  if (command === 'hint') {
    formattedInput = `
      Problem title: ${title}
      Problem Description: ${description}
      Provide the user with a breakdown of the problem. Start the response with "Here is a breakdown of the problem:". Do not provide a solution and do not provide code.
      `
  } else if (command === 'solution') {
    formattedInput = `
      Problem title: ${title}
      Problem Description: ${description}
      Provide the user with a solution to the problem. Start the response with "Here is a solution to the problem:". Provide a short explanation afterwards. Be concise.
      `
  } else {
    formattedInput = `
      Problem title: ${title}
      Problem Description: ${description}
      Question: ${input}
      `
  }

  // If there is no conversation id, create a new one
  try {
    // make api request
    const response = await sendMessageToAi(formattedInput, conversationPk)

    // destructure reponse
    const { response: aiResponse, conversationPk: updatedConversationPk } =
      response

    // return resoponse
    return { aiResponse, conversationPk: updatedConversationPk }

    // catch error
  } catch (error) {
    console.error('Error sending chat message:', error)
    throw new Error('Failed to send chat message')
  }
}

export default SendChat
