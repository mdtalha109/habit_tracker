import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './application/App.tsx'
import './application/index.css'
import { BrowserRouter } from 'react-router-dom'
import 'presentation/i18n.ts';
import { AuthProvider } from 'presentation/context/authContext.tsx'
import { HabitProvider } from 'presentation/context/habitContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HabitProvider>
            <App />
        </HabitProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
