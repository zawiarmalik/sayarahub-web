import React from 'react'
import { IconButton, Tooltip, Box } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'text.primary',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.3s ease',
          boxShadow: 1,
        }}
      >
        {mode === 'light' ? (
          <DarkMode sx={{ fontSize: 20 }} />
        ) : (
          <LightMode sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeSwitcher
