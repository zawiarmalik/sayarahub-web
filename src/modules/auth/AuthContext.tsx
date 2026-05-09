import React, { createContext, useContext, useMemo, useState } from 'react'
import type { AuthState, User, LoginCredentials, SignupData } from '../../types'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState: AuthState = {
  user: null,
  token: 'mock-token',
  isAuthenticated: true,
  isLoading: false
}

const DEMO_USER: User = {
  id: 'demo-user',
  email: 'demo@sayarahub.local',
  firstName: 'Demo',
  lastName: 'User',
  phone: '+973 0000 0000',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    ...initialState,
    user: DEMO_USER
  })

  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true }))
    await new Promise(resolve => setTimeout(resolve, 300))

    const sessionUser: User = {
      ...DEMO_USER,
      email: credentials.email || DEMO_USER.email,
      updatedAt: new Date().toISOString()
    }

    setState({
      user: sessionUser,
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false
    })
  }

  const signup = async (data: SignupData) => {
    setState(prev => ({ ...prev, isLoading: true }))
    await new Promise(resolve => setTimeout(resolve, 300))

    const sessionUser: User = {
      id: 'demo-user',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setState({
      user: sessionUser,
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false
    })
  }

  const logout = () => {
    // Keep app in authenticated demo mode while backend is disabled.
    setState({
      user: DEMO_USER,
      token: 'mock-token',
      isAuthenticated: true,
      isLoading: false
    })
  }

  const value: AuthContextType = useMemo(() => ({
    ...state,
    login,
    signup,
    logout
  }), [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
