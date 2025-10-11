import React from 'react'
import { Box, Typography, keyframes } from '@mui/material'
import { DirectionsCar, CheckCircle } from '@mui/icons-material'

interface LoadingSpinnerProps {
  message?: string
  subMessage?: string
}

const carBounce = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`

const signalWave1 = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0; transform: scale(1.5); }
`

const signalWave2 = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 0.7; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(1.4); }
`

const signalWave3 = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 0.5; transform: scale(1.0); }
  100% { opacity: 0; transform: scale(1.3); }
`

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Finding your perfect car...", 
  subMessage = "Accelerating your search..." 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        gap: 4,
        p: 4,
        backgroundColor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      {/* Signal Waves Animation */}
      <Box sx={{ position: 'relative', width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Signal Wave 1 */}
        <Box
          sx={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: (theme) => `3px solid ${theme.palette.primary.main}`,
            animation: `${signalWave1} 2s ease-in-out infinite`,
            animationDelay: '0s'
          }}
        />
        {/* Signal Wave 2 */}
        <Box
          sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: (theme) => `3px solid ${theme.palette.primary.main}`,
            animation: `${signalWave2} 2s ease-in-out infinite`,
            animationDelay: '0.3s'
          }}
        />
        {/* Signal Wave 3 */}
        <Box
          sx={{
            position: 'absolute',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: (theme) => `3px solid ${theme.palette.primary.main}`,
            animation: `${signalWave3} 2s ease-in-out infinite`,
            animationDelay: '0.6s'
          }}
        />
        
        {/* Car Icon */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            animation: `${carBounce} 2s ease-in-out infinite`
          }}
        >
          <DirectionsCar
            sx={{
              fontSize: 80,
              color: 'primary.main',
              filter: (theme) => `drop-shadow(0 4px 8px ${theme.palette.primary.main}50)`
            }}
          />
        </Box>
      </Box>

      {/* Loading Messages */}
      <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
            animation: `${pulse} 2s ease-in-out infinite`
          }}
        >
          {message}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <CheckCircle 
            sx={{ 
              fontSize: 20, 
              color: 'success.main',
              animation: `${pulse} 1.5s ease-in-out infinite`
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 500,
              color: 'text.secondary'
            }}
          >
            {subMessage}
          </Typography>
        </Box>
      </Box>

      {/* Loading Dots */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: `${pulse} 1.5s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LoadingSpinner
