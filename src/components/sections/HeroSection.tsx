import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  TextField,
  Button,
  useTheme
} from '@mui/material'
import { getCardStyles, getInputStyles, getButtonStyles } from '../../utils/themeStyles'
import {
  DirectionsCar,
  AttachMoney,
  LocationOn,
  Add
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../modules/auth/AuthContext'

interface HeroSectionProps {
  onSearch: (filters: any) => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [searchFilters, setSearchFilters] = useState({
    make: '',
    price: '',
    location: ''
  })

  const handleSearch = () => {
    onSearch(searchFilters)
  }

  const handlePostAd = () => {
    if (isAuthenticated) {
      navigate('/post-ad')
    } else {
      navigate('/login')
    }
  }

  return (
    <Box
      sx={{
        background: (theme) => 
          theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[900]} 50%, ${theme.palette.grey[800]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.info.light} 50%, ${theme.palette.primary.light} 100%)`,
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 0
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            gap: { xs: 4, lg: 6 },
            minHeight: '60vh'
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: { xs: 1, lg: '1 1 50%' }, pr: { xs: 0, lg: 2 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                fontFamily: 'Raleway, sans-serif',
                background: (theme) => 
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1
              }}
            >
              Find Your Dream Car Today
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: '500px'
              }}
            >
              Discover thousands of verified cars from trusted dealers. 
              Compare prices, features, and find the perfect vehicle for your needs.
            </Typography>

            {/* Statistics */}
            <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  10K+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cars Available
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: 'secondary.main',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  500+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Trusted Dealers
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  color: 'success.main',
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  50K+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Happy Customers
                </Typography>
              </Box>
            </Box>

            {/* Post Ad Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handlePostAd}
              startIcon={<Add />}
              sx={{ 
                mt: 3,
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                boxShadow: `0 8px 25px ${theme.palette.secondary.main}30`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.secondary.dark} 30%, ${theme.palette.primary.dark} 90%)`,
                  boxShadow: `0 12px 35px ${theme.palette.secondary.main}40`
                }
              }}
            >
              {isAuthenticated ? 'Post Your Car Ad' : 'Start Selling Cars'}
            </Button>
          </Box>

          {/* Right Content - Search Interface */}
          <Box sx={{ flex: { xs: 1, lg: '1 1 50%' }, pl: { xs: 0, lg: 2 } }}>
            <Card sx={{ 
              p: 4, 
              backdropFilter: 'blur(10px)',
              background: theme.palette.background.paper,
              ...getCardStyles(theme)
            }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ 
                  mb: 0, 
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  color: (theme) => theme.palette.text.primary,
                  fontSize: '1.5rem'
                }}>
                  Find Your Perfect Car
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                    <Box sx={{ position: 'relative' }}>
                      <DirectionsCar sx={{ 
                        position: 'absolute', 
                        left: 16, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: (theme) => theme.palette.text.secondary,
                        zIndex: 1,
                        fontSize: 20
                      }} />
                      <TextField
                        fullWidth
                        placeholder="Make or Model"
                        value={searchFilters.make}
                        onChange={(e) => setSearchFilters({...searchFilters, make: e.target.value})}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            pl: 6,
                            height: 56,
                            ...getInputStyles(theme)['& .MuiOutlinedInput-root']
                          },
                          ...getInputStyles(theme)
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
                    <Box sx={{ position: 'relative' }}>
                      <AttachMoney sx={{ 
                        position: 'absolute', 
                        left: 16, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        color: (theme) => theme.palette.text.secondary,
                        zIndex: 1,
                        fontSize: 20
                      }} />
                      <TextField
                        fullWidth
                        placeholder="Price Range"
                        value={searchFilters.price}
                        onChange={(e) => setSearchFilters({...searchFilters, price: e.target.value})}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            pl: 6,
                            height: 56,
                            ...getInputStyles(theme)['& .MuiOutlinedInput-root']
                          },
                          ...getInputStyles(theme)
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ position: 'relative' }}>
                  <LocationOn sx={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: 'rgba(0,0,0,0.4)',
                    zIndex: 1,
                    fontSize: 20
                  }} />
                  <TextField
                    fullWidth
                    placeholder="Location"
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        pl: 6,
                        borderRadius: 3,
                        backgroundColor: 'white',
                        height: 56,
                        '& fieldset': {
                          border: 'none'
                        },
                        '&:hover fieldset': {
                          border: 'none'
                        },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main'
                        }
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '1rem',
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 500
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSearch}
                  sx={{ 
                    py: 2.5,
                    fontSize: '1.1rem',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                    boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                      boxShadow: `0 12px 35px ${theme.palette.primary.main}40`
                    },
                    ...getButtonStyles(theme)
                  }}
                >
                  Search Cars
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handlePostAd}
                  startIcon={<Add />}
                  sx={{ 
                    py: 2.5,
                    fontSize: '1.1rem',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderWidth: 2,
                    minWidth: '140px',
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                    }
                  }}
                >
                  Post Ad
                </Button>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
