import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'host'
  createdAt: Date
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'demo@luxestay.com': {
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@luxestay.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date('2024-01-15'),
    },
  },
  'admin@luxestay.com': {
    password: 'admin123',
    user: {
      id: '2',
      email: 'admin@luxestay.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
    },
  },
  'host@luxestay.com': {
    password: 'host123',
    user: {
      id: '3',
      email: 'host@luxestay.com',
      name: 'Property Host',
      role: 'host',
      createdAt: new Date('2024-02-01'),
    },
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        const userData = mockUsers[email.toLowerCase()]
        
        if (userData && userData.password === password) {
          set({ 
            user: userData.user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          return true
        }
        
        set({ isLoading: false })
        return false
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Check if user already exists
        if (mockUsers[email.toLowerCase()]) {
          set({ isLoading: false })
          return false
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email: email.toLowerCase(),
          name,
          role: 'user',
          createdAt: new Date(),
        }
        
        // Add to mock database
        mockUsers[email.toLowerCase()] = {
          password,
          user: newUser,
        }
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }))
      },
    }),
    {
      name: 'luxestay-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
