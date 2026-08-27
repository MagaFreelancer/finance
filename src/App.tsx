import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ToastProvider } from './hooks/useToast'
import { LandingPage } from './pages/LandingPage'
import { AdminPage } from './pages/AdminPage'
import { I18nProvider  } from './i18n/I18nProvider'
import './styles/global.css'

export default function App() {
  return (
    <I18nProvider >
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </I18nProvider >
  )
}
