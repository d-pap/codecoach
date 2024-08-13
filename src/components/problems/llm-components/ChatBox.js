import React, { useState } from 'react'
import { useChat } from './ChatContext'
import './ChatBox.css'
import SendChat from './AIChat'

const ChatBox = ({ problem }) => {
  const [input, setInput] = useState('')
  const { chatHistory, updateChatHistory } = useChat()

  const currentChatHistory = chatHistory[problem._id] || []

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    if (input.trim() === '') return

    const newHistory = [...currentChatHistory, { role: 'user', content: input }]

    setInput('') // Clear the input immediately

    try {
      // Send the chat and start streaming the response
      await SendChat(
        problem.title,
        problem.description,
        problem.hint,
        newHistory,
        updateChatHistory,
        problem._id
      )
    } catch (error) {
      console.error('Failed to send chat:', error)
      updateChatHistory(problem._id, [
        ...newHistory,
        { role: 'llm', content: 'Failed to get response from model' },
      ])
    }
  }

  return (
    <div className="chatbox-container">
      <div className="chat-history">
        {currentChatHistory.map((chat, index) => (
          <div
            key={index}
            className={chat.role === 'user' ? 'user-message' : 'llm-message'}
          >
            {chat.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="input"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox
