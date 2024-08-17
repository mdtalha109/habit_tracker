import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './application/App.tsx'
import './application/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
