/**
 * Main entry point of the react app that renders App.js
 */
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import ConsentBanner from './components/utility/ConsentBanner'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <App />
        <ConsentBanner />
        {/* <ReactQueryDevtools /> */}
      </CookiesProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

reportWebVitals(console.log) // log web vitals
