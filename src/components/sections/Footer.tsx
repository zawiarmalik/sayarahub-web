import React from 'react'
import {
  Container,
  Typography,
  Box,
  Link,
  Divider,
  IconButton
} from '@mui/material'
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  WhatsApp,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material'

const Footer: React.FC = () => {
  return (
    <Box sx={{ 
      backgroundColor: (theme) => 
        theme.palette.mode === 'dark' 
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      color: 'white',
      py: 6
    }}>
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 2fr' },
          gap: 4
        }}>
          {/* Company Info */}
          <Box>
            <Typography variant="h5" sx={{ 
              mb: 2,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 700
            }}>
              SayaraHub
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Your trusted partner in finding the perfect car. We connect buyers with verified sellers 
              across Bahrain, making car buying simple, safe, and transparent.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600
            }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Browse Cars
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Sell Your Car
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Financing
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Insurance
              </Link>
            </Box>
          </Box>

          {/* Support */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600
            }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Help Center
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Contact Us
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                Safety Tips
              </Link>
              <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>
                FAQ
              </Link>
            </Box>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 600
            }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +973 3312 3456
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@sayarahub.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Manama, Muharraq, Riffa
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatsApp fontSize="small" />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  WhatsApp Support
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © 2024 SayaraHub. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
              Terms of Service
            </Link>
            <Link href="#" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '0.875rem' }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
