import { create } from 'zustand'
import { getCurrentUser, login } from '~/lib/auth'
import { User } from '../users/usersApiSlice'

interface IAuthStore {
  currentUser: User
  getCurrentUser: () => void
  login: (credentials: CredentialsType) => void
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  currentUser: {} as User,

  getCurrentUser: async () => {
    const data = await getCurrentUser()

    set({ currentUser: data })
  },

  login: async (credentials: CredentialsType) => {
    const data = await login(credentials)

    if (!data) return

    const { accessToken, user } = data
    localStorage.setItem('accessToken', accessToken)
    window.location.href = '/'

    set({ currentUser: user })
  }
}))
