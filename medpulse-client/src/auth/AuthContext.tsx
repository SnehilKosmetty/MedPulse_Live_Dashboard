import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthValue = {
  token: string | null
  setToken: (value: string | null) => void
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem('medpulse_token'),
  )

  const setToken = useCallback((value: string | null) => {
    if (value) {
      localStorage.setItem('medpulse_token', value)
    } else {
      localStorage.removeItem('medpulse_token')
    }
    setTokenState(value)
  }, [])

  const value = useMemo<AuthValue>(() => ({ token, setToken }), [token, setToken])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
