import React from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material'
import { Grid } from '@mui/material'
import {
  Person,
  Email,
  Phone,
  DirectionsCar,
  Edit,
  Add
} from '@mui/icons-material'
import Footer from '../components/sections/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../modules/auth/AuthContext'
import { dummyCars } from '../constants/dummyData'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Please log in to view your profile
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Container>
    )
  }

  // Get user's cars (in a real app, this would come from an API)
  const userCars = dummyCars.filter(car => car.sellerId === user.id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BHD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 700, 
          mb: 2,
          fontFamily: 'Raleway, sans-serif',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome Back, {user.firstName}!
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontFamily: 'Raleway, sans-serif' }}>
          Manage your profile and view your car listings
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Profile Info */}
        <Box sx={{ flex: { xs: 1, md: '0 0 33.333%' } }}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
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
            
            <Box sx={{ textAlign: 'center', mb: 3, position: 'relative', zIndex: 2 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '2.5rem',
                  border: '3px solid rgba(255,255,255,0.3)'
                }}
              >
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>
              <Chip
                label="Member"
                sx={{ 
                  mt: 1,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />

            <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'rgba(255,255,255,0.8)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>{user.email}</Typography>
              </Box>
              
              {user.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ color: 'rgba(255,255,255,0.8)' }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>{user.phone}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ color: 'rgba(255,255,255,0.8)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              startIcon={<Edit />}
              sx={{ 
                mt: 3,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Box>

        {/* My Cars */}
        <Box sx={{ flex: { xs: 1, md: '0 0 66.666%' } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              My Car Listings ({userCars.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/post-ad')}
            >
              Post New Ad
            </Button>
          </Box>

          {userCars.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No cars listed yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start by posting your first car ad to reach potential buyers
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/post-ad')}
              >
                Post Your First Ad
              </Button>
            </Paper>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              {userCars.map((car) => (
                <Box key={car.id}>
                  <Card>
                    <Box
                      component="img"
                      src={car.images[0]}
                      alt={car.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        {car.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {car.make} {car.model} • {car.year}
                      </Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        {formatPrice(car.price)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`/car/${car.id}`)}
                      >
                        View Details
                      </Button>
                      <Button size="small" color="error">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      </Container>
      
      {/* Add Footer */}
      <Footer />
    </Box>
  )
}

export default Profile
