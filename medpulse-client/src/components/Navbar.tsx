import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function Navbar() {
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const logout = () => {
    setToken(null)
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between bg-slate-900 px-6 py-3 text-white">
      <div className="text-lg font-semibold">MedPulse Live Dashboard</div>
      <div className="flex items-center gap-5 text-sm">
        <Link to="/dashboard" className="hover:text-cyan-300">Dashboard</Link>
        <Link to="/cases" className="hover:text-cyan-300">Cases</Link>
        <button onClick={logout} className="rounded bg-cyan-600 px-3 py-1 hover:bg-cyan-500">Logout</button>
      </div>
    </nav>
  )
}
