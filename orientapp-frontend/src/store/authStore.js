import { create } from 'zustand'
import api from '../api/axios'

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),

  login: async (credentials) => {
    const { data } = await api.post('/login', credentials)
    localStorage.setItem('token', data.token)
    set({ user: data.user, token: data.token })
    return data.user
  },

  register: async (formData) => {
    const { data } = await api.post('/register', formData)
    localStorage.setItem('token', data.token)
    set({ user: data.user, token: data.token })
    return data.user
  },

  logout: async () => {
    try { await api.post('/logout') } catch {}
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },

  fetchMe: async () => {
    const { data } = await api.get('/me')
    set({ user: data })
    return data
  },
}))

export default useAuthStore
