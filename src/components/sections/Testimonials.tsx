import React from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  Rating
} from '@mui/material'

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Car Buyer',
      avatar: 'SM',
      rating: 5,
      text: 'Found my perfect car within a week! The platform made it so easy to compare prices and features. Highly recommended!'
    },
    {
      name: 'Ahmed Hassan',
      role: 'First-time Buyer',
      avatar: 'AH',
      rating: 5,
      text: 'As a first-time car buyer, I was nervous about the process. SayaraHub guided me through everything smoothly.'
    },
    {
      name: 'Fatima Khan',
      role: 'Car Enthusiast',
      avatar: 'FK',
      rating: 5,
      text: 'The variety of cars available is amazing. Found exactly what I was looking for with great financing options.'
    }
  ]

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: (theme) => 
        theme.palette.mode === 'dark' 
          ? theme.palette.grey[900]
          : theme.palette.background.paper,
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
          What Our Customers Say
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
              <Card sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 1,
                boxShadow: (theme) => 
                  theme.palette.mode === 'dark'
                    ? `0 8px 25px ${theme.palette.common.black}40`
                    : `0 8px 25px ${theme.palette.common.black}15`,
                background: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[800]} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                      {testimonial.avatar}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ 
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 700,
                      color: 'text.primary'
                    }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
                
                <Rating 
                  value={testimonial.rating} 
                  readOnly 
                  size="small"
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Raleway, sans-serif',
                  lineHeight: 1.6,
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text}"
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Testimonials
