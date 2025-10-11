import React, { useState } from 'react'
import { Box } from '@mui/material'
import HeroSection from '../components/sections/HeroSection'
import BrandShowcase from '../components/sections/BrandShowcase'
import TrustSection from '../components/sections/TrustSection'
import Testimonials from '../components/sections/Testimonials'
import Footer from '../components/sections/Footer'
import LoadingSpinner from '../components/common/LoadingSpinner'

const HomeNew: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (filters: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Search filters:', filters)
    }, 2000)
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <HeroSection onSearch={handleSearch} />
      <BrandShowcase />
      <TrustSection />
      <Testimonials />
      <Footer />
    </Box>
  )
}

export default HomeNew
