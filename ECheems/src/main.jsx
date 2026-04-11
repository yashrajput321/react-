// Main entry point - Initializes React app and renders to DOM
// Main entry point - Initializes React app and renders to DOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Create root and render App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
