import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider, applyThemeAttribute } from './context/ThemeContext.tsx'
import App from './App.tsx'
import './styles/global.css'

const stored = localStorage.getItem('theme')
applyThemeAttribute(stored === 'light' ? 'light' : 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
