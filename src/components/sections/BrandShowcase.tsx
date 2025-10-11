import React from 'react'
import {
  Container,
  Typography,
  Box
} from '@mui/material'

const BrandShowcase: React.FC = () => {
  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Nissan', 'Hyundai']

  return (
    <Box sx={{ 
      py: 6, 
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.divider
    }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ 
          textAlign: 'center', 
          mb: 4,
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 700,
          color: 'text.primary'
        }}>
          Trusted by Leading Brands
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          flexWrap: 'wrap',
          opacity: 0.7
        }}>
          {brands.map((brand) => (
            <Typography 
              key={brand}
              variant="h6" 
              sx={{ 
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                color: 'text.secondary',
                fontSize: '1.2rem'
              }}
            >
              {brand}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default BrandShowcase
