import React from 'react'
import {
  Container,
  Typography,
  Box,
  Card
} from '@mui/material'

const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: '✓',
      title: 'Verified Vehicles',
      description: 'Every car is thoroughly inspected and verified by our expert team.'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'Safe and secure payment processing with buyer protection.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any queries.'
    }
  ]

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: (theme) => theme.palette.background.paper,
      borderTop: '1px solid',
      borderColor: (theme) => theme.palette.divider
    }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ 
          textAlign: 'center', 
          mb: 6,
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 800,
          color: 'text.primary'
        }}>
          Why Choose SayaraHub?
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {trustFeatures.map((feature, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
              <Card sx={{ 
                p: 4, 
                textAlign: 'center',
                height: '100%',
                borderRadius: 1,
                boxShadow: (theme) => 
                  theme.palette.mode === 'dark'
                    ? `0 8px 25px ${theme.palette.common.black}40`
                    : `0 8px 25px ${theme.palette.common.black}15`,
                background: (theme) => theme.palette.background.paper,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => 
                    theme.palette.mode === 'dark'
                      ? `0 15px 35px ${theme.palette.common.black}50`
                      : `0 15px 35px ${theme.palette.common.black}25`,
                  transition: 'all 0.3s ease'
                }
              }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  backgroundColor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
                    {feature.icon}
                  </Typography>
                </Box>
                
                <Typography variant="h5" sx={{ 
                  mb: 2,
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  color: 'text.primary'
                }}>
                  {feature.title}
                </Typography>
                
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Raleway, sans-serif',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default TrustSection
