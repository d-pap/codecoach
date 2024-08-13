// ChatContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState({})

  useEffect(() => {
    // Load chat history from localStorage when the provider mounts
    const storedHistory = localStorage.getItem('chatHistory')
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory))
    }
  }, [])

  useEffect(() => {
    // Save chat history to localStorage whenever it changes
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory))
  }, [chatHistory])

  const updateChatHistory = (problemId, newHistory) => {
    setChatHistory((prevHistory) => ({
      ...prevHistory,
      [problemId]: newHistory,
    }))
  }

  return (
    <ChatContext.Provider value={{ chatHistory, updateChatHistory }}>
      {children}
    </ChatContext.Provider>
  )
}
