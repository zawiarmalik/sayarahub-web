import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  CircularProgress,
  useTheme,
  Divider
} from '@mui/material'
import { getCardStyles, getInputStyles, getButtonStyles, getContainerStyles, getPageContainerStyles } from '../utils/themeStyles'
import { DriveEta, Visibility, VisibilityOff, Google } from '@mui/icons-material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext'
import Footer from '../components/sections/Footer'
import type { LoginCredentials } from '../types'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const theme = useTheme()
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(formData)
      navigate('/')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : '#f8fafc'
    }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
      {/* Left Side - Branding & Content */}
      <Box sx={{ 
        flex: 1,
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          ${theme.palette.mode === 'dark' ? '#1a1f3a' : '#667eea'} 0%, 
          ${theme.palette.mode === 'dark' ? '#0f1419' : '#764ba2'} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />
        
        {/* Car Icon Animation */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          opacity: 0.1,
          transform: 'rotate(-15deg)',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <DriveEta sx={{ fontSize: 200, color: 'white' }} />
        </Box>

        {/* Content */}
        <Box sx={{ 
          zIndex: 2, 
          textAlign: 'center', 
          color: 'white',
          px: 6,
          maxWidth: '500px'
        }}>
          <DriveEta sx={{ 
            fontSize: 80, 
            mb: 3,
            color: 'white',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }} />
          
          <Typography variant="h2" sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 800,
            mb: 3,
            background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            SayaraHub
          </Typography>
          
          <Typography variant="h4" sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 600,
            mb: 3,
            opacity: 0.95
          }}>
            Your Dream Car Awaits
          </Typography>
          
          <Typography variant="h6" sx={{ 
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 400,
            mb: 4,
            opacity: 0.8,
            lineHeight: 1.6
          }}>
            Bahrain's #1 trusted car marketplace. Join thousands of satisfied customers who found their perfect vehicle through SayaraHub. 
            Verified listings, secure transactions, and exceptional service await you.
          </Typography>

          {/* Features */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4fc3f7' }} />
              <Typography variant="body1" sx={{ opacity: 0.9, fontFamily: 'Raleway, sans-serif' }}>
                🚗 50,000+ verified car listings
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4fc3f7' }} />
              <Typography variant="body1" sx={{ opacity: 0.9, fontFamily: 'Raleway, sans-serif' }}>
                🔒 100% secure payment processing
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4fc3f7' }} />
              <Typography variant="body1" sx={{ opacity: 0.9, fontFamily: 'Raleway, sans-serif' }}>
                📱 24/7 customer support
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4fc3f7' }} />
              <Typography variant="body1" sx={{ opacity: 0.9, fontFamily: 'Raleway, sans-serif' }}>
                ✅ Free car inspection reports
              </Typography>
            </Box>
          </Box>

          {/* Enhanced Stats */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 6, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#4fc3f7', fontFamily: 'Raleway, sans-serif' }}>
                50K+
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'Raleway, sans-serif' }}>
                Cars Available
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#81c784', fontFamily: 'Raleway, sans-serif' }}>
                25K+
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'Raleway, sans-serif' }}>
                Happy Customers
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#ffb74d', fontFamily: 'Raleway, sans-serif' }}>
                98%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'Raleway, sans-serif' }}>
                Success Rate
              </Typography>
            </Box>
          </Box>

          {/* Trust Indicators */}
          <Box sx={{ mt: 4, p: 3, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
            <Typography variant="h6" sx={{ 
              fontFamily: 'Raleway, sans-serif', 
              fontWeight: 600, 
              mb: 2, 
              textAlign: 'center',
              color: '#e3f2fd'
            }}>
              🏆 Trusted by Leading Brands
            </Typography>
            <Typography variant="body2" sx={{ 
              textAlign: 'center', 
              opacity: 0.9, 
              fontFamily: 'Raleway, sans-serif',
              lineHeight: 1.5
            }}>
              Partnered with Toyota, Honda, Nissan, and 500+ verified dealers across Bahrain
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box sx={{ 
        flex: { xs: 1, lg: 0.6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4, lg: 6 },
        py: 4,
        width: '100%',
        maxWidth: { lg: '600px' }
      }}>
        <Paper sx={{ 
          p: { xs: 4, sm: 6 },
          maxWidth: 480,
          width: '100%',
          background: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 25px 50px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1
            }}>
              Welcome Back
            </Typography>
            <Typography sx={{ 
              color: theme.palette.text.secondary,
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.1rem',
              mb: 2
            }}>
              Sign in to continue your car buying journey
            </Typography>
            
            {/* Quick Benefits */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3, 
              mt: 3,
              flexWrap: 'wrap'
            }}>
              <Box sx={{ textAlign: 'center', minWidth: '80px' }}>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.primary.main, 
                  fontWeight: 700,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  🚀
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.text.secondary,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Instant Access
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: '80px' }}>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.secondary.main, 
                  fontWeight: 700,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  💎
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.text.secondary,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Exclusive Deals
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: '80px' }}>
                <Typography variant="h6" sx={{ 
                  color: theme.palette.success.main, 
                  fontWeight: 700,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  ⭐
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: theme.palette.text.secondary,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  Save Favorites
                </Typography>
              </Box>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              sx={{
                ...getInputStyles(theme),
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2
                }
              }}
            />
            
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ minWidth: 'auto', p: 1 }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
              sx={{
                ...getInputStyles(theme),
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2
                }
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Link 
                component="button" 
                type="button"
                sx={{ 
                  fontFamily: 'Raleway, sans-serif',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" sx={{ px: 2, color: theme.palette.text.secondary }}>
                or
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Google />}
              sx={{ 
                py: 1.5,
                fontSize: '1rem',
                fontFamily: 'Raleway, sans-serif',
                borderRadius: 2,
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              Sign in with Google
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'Raleway, sans-serif' }}>
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/signup" 
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>

            {/* Additional Features */}
            <Box sx={{ mt: 4, p: 3, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ 
                fontFamily: 'Raleway, sans-serif', 
                fontWeight: 600, 
                mb: 2, 
                textAlign: 'center',
                color: theme.palette.primary.main
              }}>
                🌟 What You Get After Login
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: theme.palette.success.main, fontSize: '1.2rem' }}>✓</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
                    Access to exclusive member-only car deals
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: theme.palette.success.main, fontSize: '1.2rem' }}>✓</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
                    Save your favorite cars and searches
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: theme.palette.success.main, fontSize: '1.2rem' }}>✓</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
                    Get instant notifications for new listings
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: theme.palette.success.main, fontSize: '1.2rem' }}>✓</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Raleway, sans-serif' }}>
                    Priority customer support
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Customer Testimonial */}
            <Box sx={{ mt: 3, p: 3, backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderRadius: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ 
                fontStyle: 'italic', 
                mb: 2, 
                fontFamily: 'Raleway, sans-serif',
                lineHeight: 1.6
              }}>
                "Found my dream car in just 2 days! SayaraHub made the entire process so easy and secure. 
                Highly recommended to anyone looking for quality cars in Bahrain."
              </Typography>
              <Typography variant="caption" sx={{ 
                color: theme.palette.text.secondary,
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600
              }}>
                - Ahmed Al-Mansoori, Manama
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      </Box>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-15deg); }
            50% { transform: translateY(-20px) rotate(-15deg); }
          }
        `}
      </style>
    
      {/* Add Footer */}
      <Footer />
    </Box>
  )
}

export default Login
