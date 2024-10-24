const SendChat = async (title, description, input, convoId, command, code) => {
  let id = convoId
  let formattedInput = ''

  try {
    // Dynamically import API functions to optimize bundle size
    const { createNewChatConvo, sendChatMessage } = await import('../../../api')

    // If no conversation ID exists, create a new one
    if (id == null) {
      const newChatId = await createNewChatConvo()
      id = newChatId.convoId
    }

    // Format the input based on the provided title and description
    formattedInput = `Problem title: ${title}\nProblem Description: ${description}`

    // Modify the input based on the command type
    if (command === 'hint') {
      formattedInput +=
        '\n\nProvide the user with a breakdown of the problem. Start the response with "Here is a breakdown of the problem:". Do not provide a solution and do not provide code.'
    } else if (command === 'solution') {
      formattedInput +=
        '\n\nProvide the user with a solution to the problem. Start the response with "Here is a solution to the problem:". Provide a short explanation afterwards. Be concise.'
    } else {
      formattedInput += `\n\nUser Input: ${input}`
      // Include user code if available
      if (code && code.trim() !== '') {
        formattedInput += `\n\nUser Code:\n\n${code}`
      }
    }

    // Send the formatted message to the AI
    const chat = await sendChatMessage(id, formattedInput)
    return chat
  } catch (error) {
    console.error('Error in SendChat:', error)
    throw error
  }
}

export default SendChat
