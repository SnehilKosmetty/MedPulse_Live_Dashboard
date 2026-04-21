import axios from 'axios'

const apiBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const api = axios.create({
  baseURL: apiBase ? `${apiBase}/api` : '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medpulse_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
