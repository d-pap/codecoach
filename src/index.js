/**
 * Main entry point of the react app that renders App.js
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ChatProvider } from './components/problems/llm-components/ChatContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
)
