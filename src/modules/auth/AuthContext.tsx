import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { AuthState, User, LoginCredentials, SignupData } from '../../types'
import { authService } from '../../services'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGIN_FAILURE':
      return { ...state, isAuthenticated: false, isLoading: false }
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Initialize auth service and check for stored auth data
    authService.initializeAuth()
    
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token }
        })
      } catch (error) {
        // Clear invalid stored data
        authService.logout()
      }
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      const response = await authService.login(credentials)
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user, token: response.tokens.accessToken }
      })
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      throw error
    }
  }

  const signup = async (data: SignupData) => {
    dispatch({ type: 'LOGIN_START' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const mockToken = 'mock-jwt-token'
      
      localStorage.setItem('auth_token', mockToken)
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: mockUser, token: mockToken }
      })
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    dispatch({ type: 'LOGOUT' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
