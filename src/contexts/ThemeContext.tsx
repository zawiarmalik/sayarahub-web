import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e40af', // Deep Blue
      light: '#3b82f6',
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b', // Amber Orange
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981', // Emerald Green
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0ea5e9', // Sky Blue
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f9ff', // Light Blue Background
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Dark Navy
      secondary: '#475569',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '3.5rem',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
        },
      },
    },
  },
})

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // Bright Blue for dark mode
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fbbf24', // Bright Amber for dark mode
      light: '#fde047',
      dark: '#f59e0b',
      contrastText: '#000000',
    },
    success: {
      main: '#10b981', // Emerald Green
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0ea5e9', // Sky Blue
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b', // Amber
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#000000',
    },
    background: {
      default: '#0f172a', // Dark Navy
      paper: '#1e293b', // Dark Blue-Gray
    },
    text: {
      primary: '#f8fafc', // Light Gray
      secondary: '#cbd5e1', // Medium Gray
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    grey: {
      50: '#1a1a1a',
      100: '#2a2a2a',
      200: '#3a3a3a',
      300: '#4a4a4a',
      400: '#5a5a5a',
      500: '#6a6a6a',
      600: '#7a7a7a',
      700: '#8a8a8a',
      800: '#9a9a9a',
      900: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontWeight: 900,
      fontSize: '3.5rem',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#1e293b',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f172a',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#1e293b',
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
        },
      },
    },
  },
})

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light')

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
