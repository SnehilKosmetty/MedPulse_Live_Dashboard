import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { Navbar } from './components/Navbar'
import { CaseDetailsPage } from './pages/CaseDetailsPage'
import { CasesPage } from './pages/CasesPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  const { token } = useAuth()

  return (
    <div className="min-h-screen">
      {token && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" replace />} />
        <Route path="/cases" element={token ? <CasesPage /> : <Navigate to="/login" replace />} />
        <Route path="/cases/:id" element={token ? <CaseDetailsPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </div>
  )
}

export default App
