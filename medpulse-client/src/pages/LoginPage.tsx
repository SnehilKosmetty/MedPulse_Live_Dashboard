import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { api } from '../services/api'

export function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setToken } = useAuth()

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { username, password })
      setToken(data.token)
      navigate('/dashboard')
    } catch {
      setError('Login failed. Try again.')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-xl font-bold text-slate-900">MedPulse Login</h1>
        <input className="mb-3 w-full rounded border border-slate-300 p-2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="mb-3 w-full rounded border border-slate-300 p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}
        <button className="w-full rounded bg-cyan-600 p-2 font-semibold text-white hover:bg-cyan-500">Sign In</button>
      </form>
    </main>
  )
}
