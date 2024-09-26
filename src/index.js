/**
 * Main entry point of the react app that renders App.js
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  </React.StrictMode>
)

reportWebVitals(console.log) // log web vitals
