import React, { useState } from 'react'
import './ChatBox.css' // Import the CSS file

const ChatBox = () => {
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = () => {
    if (input.trim() === '') return

    // Add user input to chat history
    setChatHistory([...chatHistory, { sender: 'user', message: input }])

    // Simulate a response from the LLM (replace with actual API call)
    const response = 'This is a simulated response from the LLM.'
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'llm', message: response },
    ])

    // Clear the input
    setInput('')
  }

  return (
    <div className="chatbox-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={chat.sender === 'user' ? 'user-message' : 'llm-message'}
          >
            {chat.message}
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
