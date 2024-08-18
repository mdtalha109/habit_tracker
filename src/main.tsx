import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './application/App.tsx'
import './application/index.css'
import { BrowserRouter } from 'react-router-dom'
import 'infrastructure/i18n.ts';
import { AuthProvider } from 'presentation/context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
