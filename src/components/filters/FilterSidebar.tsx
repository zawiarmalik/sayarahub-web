import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Divider,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  InputAdornment,
  Card,
  CardContent,
  Fade,
  useTheme
} from '@mui/material'
import { getCardStyles, getInputStyles } from '../../utils/themeStyles'
import {
  ExpandMore,
  Search,
  FilterList,
  Clear,
  LocationOn,
  DirectionsCar,
  AttachMoney,
  CalendarToday,
  Speed,
  Settings,
  Star
} from '@mui/icons-material'
import type { CarFilters } from '../../types'

interface FilterSidebarProps {
  filters: CarFilters
  onFilterChange: (key: keyof CarFilters, value: any) => void
  onClearFilters: () => void
  onSearch: (searchTerm: string) => void
  searchTerm: string
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onSearch,
  searchTerm
}) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    location: true,
    make: true,
    price: true,
    year: true,
    mileage: true,
    features: true
  })

  const handleSectionToggle = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const priceRange = [0, 1000000]
  const yearRange = [1990, 2024]
  const mileageRange = [0, 500000]

  const makes = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Audi', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia']
  const cities = ['Manama', 'Muharraq', 'Riffa', 'Hamala', 'Sitra', 'Adliya', 'Juffair', 'Seef', 'Sanabis', 'Budaiya']
  const provinces = ['Capital', 'Muharraq', 'Northern', 'Southern']
  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Pickup', 'Van']
  const transmissions = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic']
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG', 'LPG']
  const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold', 'Other']

  const theme = useTheme()

  return (
    <Card 
      elevation={0}
      sx={{ 
        height: 'fit-content', 
        overflow: 'hidden',
        background: theme.palette.background.paper,
        ...getCardStyles(theme)
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header with Logo and Search */}
        <Box sx={{ 
          p: 2, 
          background: (theme) => 
            theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px 8px 0 0'
        }}>
          <Box sx={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <DirectionsCar sx={{ fontSize: 60, transform: 'rotate(15deg)' }} />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              fontSize: '1.2rem',
              fontFamily: 'Raleway, sans-serif'
            }}
          >
            Find Your Car
          </Typography>
          
          <TextField
            fullWidth
            placeholder="e.g. Honda in Manama"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 1,
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                '& input': {
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                },
              },
            }}
          />
        </Box>

        {/* Filter Controls */}
        <Box sx={{ 
          p: 2, 
          background: (theme) => 
            theme.palette.mode === 'dark' 
              ? '#1e293b'
              : '#f8fafc'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: (theme) => theme.palette.text.primary,
                fontFamily: 'Raleway, sans-serif'
              }}
            >
              <Settings sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
              Filters
            </Typography>
            <Button
              startIcon={<Clear />}
              onClick={onClearFilters}
              size="small"
              variant="outlined"
              sx={{ 
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                minWidth: 'auto',
                px: 2,
                py: 0.5,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white'
                }
              }}
            >
              Clear
            </Button>
          </Box>

          {/* Compact Filter Layout */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>

          {/* Location Filters */}
          <Accordion 
            expanded={expandedSections.location} 
            onChange={() => handleSectionToggle('location')}
            sx={{ 
              borderRadius: 1,
              boxShadow: 'none',
              background: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '#334155'
                  : '#ffffff',
              border: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 0
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 18, color: (theme) => theme.palette.text.primary }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 48,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 48
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '12px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 700, 
                  fontSize: '0.9rem', 
                  color: (theme) => theme.palette.text.primary,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  LOCATION
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.location} timeout={200}>
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      placeholder="City"
                      value={filters.city || ''}
                      onChange={(e) => onFilterChange('city', e.target.value || undefined)}
                      sx={{
                        '& .MuiInputBase-input': {
                          py: 1.5
                        },
                        ...getInputStyles(theme)
                      }}
                    >
                      <MenuItem value="" sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>City</MenuItem>
                      {cities.map(city => (
                        <MenuItem key={city} value={city} sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>{city}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    placeholder="Province"
                    value={filters.province || ''}
                    onChange={(e) => onFilterChange('province', e.target.value || undefined)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        backgroundColor: (theme) => 
                          theme.palette.mode === 'dark' 
                            ? '#ffffff'
                            : '#ffffff',
                        '& fieldset': {
                          border: (theme) => 
                            theme.palette.mode === 'dark' 
                              ? '1px solid rgba(0,0,0,0.1)'
                              : '1px solid rgba(0,0,0,0.1)',
                        },
                        '&:hover fieldset': {
                          border: (theme) => 
                            theme.palette.mode === 'dark' 
                              ? '1px solid rgba(0,0,0,0.2)'
                              : '1px solid rgba(0,0,0,0.2)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main'
                        }
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.9rem',
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 500,
                        py: 1.5
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>Province</MenuItem>
                    {provinces.map(province => (
                      <MenuItem key={province} value={province} sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>{province}</MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>

          {/* Make & Model */}
          <Accordion 
            expanded={expandedSections.make} 
            onChange={() => handleSectionToggle('make')}
            sx={{ 
              borderRadius: 1,
              boxShadow: 'none',
              background: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '#334155'
                  : '#ffffff',
              border: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.1)',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 0
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 18, color: (theme) => theme.palette.text.primary }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 48,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 48
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '12px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsCar sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 700, 
                  fontSize: '0.9rem', 
                  color: (theme) => theme.palette.text.primary,
                  fontFamily: 'Raleway, sans-serif'
                }}>
                  MAKE & MODEL
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.make} timeout={200}>
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      placeholder="Make"
                      value={filters.make || ''}
                      onChange={(e) => onFilterChange('make', e.target.value || undefined)}
                      sx={{
                        '& .MuiInputBase-input': {
                          py: 1.5
                        },
                        ...getInputStyles(theme)
                      }}
                    >
                      <MenuItem value="" sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>Make</MenuItem>
                      {makes.map(make => (
                        <MenuItem key={make} value={make} sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>{make}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    placeholder="Body Type"
                    value={filters.category || ''}
                    onChange={(e) => onFilterChange('category', e.target.value || undefined)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        backgroundColor: (theme) => 
                          theme.palette.mode === 'dark' 
                            ? '#ffffff'
                            : '#ffffff',
                        '& fieldset': {
                          border: (theme) => 
                            theme.palette.mode === 'dark' 
                              ? '1px solid rgba(0,0,0,0.1)'
                              : '1px solid rgba(0,0,0,0.1)',
                        },
                        '&:hover fieldset': {
                          border: (theme) => 
                            theme.palette.mode === 'dark' 
                              ? '1px solid rgba(0,0,0,0.2)'
                              : '1px solid rgba(0,0,0,0.2)',
                        },
                        '&.Mui-focused fieldset': {
                          border: '2px solid',
                          borderColor: 'primary.main'
                        }
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.9rem',
                        fontFamily: 'Raleway, sans-serif',
                        fontWeight: 500,
                        py: 1.5
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>Body Type</MenuItem>
                    {bodyTypes.map(type => (
                      <MenuItem key={type} value={type} sx={{ fontSize: '0.9rem', fontFamily: 'Raleway, sans-serif' }}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>

          {/* Price Range */}
          <Accordion 
            expanded={expandedSections.price} 
            onChange={() => handleSectionToggle('price')}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 1
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 40,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 40
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AttachMoney sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.text.primary }}>
                  PRICE RANGE
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.price} timeout={200}>
                <Box>
                  <Box sx={{ px: 1, py: 0.5 }}>
                    <Slider
                      value={[filters.priceMin || priceRange[0], filters.priceMax || priceRange[1]]}
                      onChange={(_, newValue) => {
                        const [min, max] = newValue as number[]
                        onFilterChange('priceMin', min)
                        onFilterChange('priceMax', max)
                      }}
                      valueLabelDisplay="auto"
                      min={priceRange[0]}
                      max={priceRange[1]}
                      step={10000}
                      valueLabelFormat={(value) => `BHD ${value.toLocaleString()}`}
                      sx={{
                        color: theme.palette.primary.main,
                        height: 4,
                        '& .MuiSlider-thumb': {
                          height: 16,
                          width: 16,
                          backgroundColor: theme.palette.primary.main,
                          border: `2px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[2]
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.primary.main,
                          height: 4
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.grey[300],
                          height: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, gap: 0.5 }}>
                      <TextField
                        size="small"
                        label="Min Price"
                        type="number"
                        value={filters.priceMin || ''}
                        onChange={(e) => onFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                      <TextField
                        size="small"
                        label="Max Price"
                        type="number"
                        value={filters.priceMax || ''}
                        onChange={(e) => onFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>

          {/* Year */}
          <Accordion 
            expanded={expandedSections.year} 
            onChange={() => handleSectionToggle('year')}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 1
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 40,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 40
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarToday sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.text.primary }}>
                  YEAR
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.year} timeout={200}>
                <Box>
                  <Box sx={{ px: 1, py: 0.5 }}>
                    <Slider
                      value={[filters.yearMin || yearRange[0], filters.yearMax || yearRange[1]]}
                      onChange={(_, newValue) => {
                        const [min, max] = newValue as number[]
                        onFilterChange('yearMin', min)
                        onFilterChange('yearMax', max)
                      }}
                      valueLabelDisplay="auto"
                      min={yearRange[0]}
                      max={yearRange[1]}
                      step={1}
                      sx={{
                        color: theme.palette.primary.main,
                        height: 4,
                        '& .MuiSlider-thumb': {
                          height: 16,
                          width: 16,
                          backgroundColor: theme.palette.primary.main,
                          border: `2px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[2]
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.primary.main,
                          height: 4
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.grey[300],
                          height: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, gap: 0.5 }}>
                      <TextField
                        size="small"
                        label="Min Year"
                        type="number"
                        value={filters.yearMin || ''}
                        onChange={(e) => onFilterChange('yearMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                      <TextField
                        size="small"
                        label="Max Year"
                        type="number"
                        value={filters.yearMax || ''}
                        onChange={(e) => onFilterChange('yearMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>

          {/* Mileage */}
          <Accordion 
            expanded={expandedSections.mileage} 
            onChange={() => handleSectionToggle('mileage')}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 1
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 40,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 40
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Speed sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.text.primary }}>
                  MILEAGE (KM)
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.mileage} timeout={200}>
                <Box>
                  <Box sx={{ px: 1, py: 0.5 }}>
                    <Slider
                      value={[filters.mileageMin || mileageRange[0], filters.mileageMax || mileageRange[1]]}
                      onChange={(_, newValue) => {
                        const [min, max] = newValue as number[]
                        onFilterChange('mileageMin', min)
                        onFilterChange('mileageMax', max)
                      }}
                      valueLabelDisplay="auto"
                      min={mileageRange[0]}
                      max={mileageRange[1]}
                      step={1000}
                      valueLabelFormat={(value) => `${value.toLocaleString()} km`}
                      sx={{
                        color: theme.palette.primary.main,
                        height: 4,
                        '& .MuiSlider-thumb': {
                          height: 16,
                          width: 16,
                          backgroundColor: theme.palette.primary.main,
                          border: `2px solid ${theme.palette.background.paper}`,
                          boxShadow: theme.shadows[2]
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: theme.palette.primary.main,
                          height: 4
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: theme.palette.grey[300],
                          height: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, gap: 0.5 }}>
                      <TextField
                        size="small"
                        label="Min Mileage"
                        type="number"
                        value={filters.mileageMin || ''}
                        onChange={(e) => onFilterChange('mileageMin', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                      <TextField
                        size="small"
                        label="Max Mileage"
                        type="number"
                        value={filters.mileageMax || ''}
                        onChange={(e) => onFilterChange('mileageMax', e.target.value ? parseInt(e.target.value) : undefined)}
                        sx={{ 
                          width: '45%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            '& input': { fontSize: '0.75rem', py: 0.5 }
                          },
                          '& .MuiInputLabel-root': { fontSize: '0.75rem' }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>

          {/* Additional Features */}
          <Accordion 
            expanded={expandedSections.features} 
            onChange={() => handleSectionToggle('features')}
            sx={{ 
              mb: 1, 
              borderRadius: 1,
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: 0,
                '&:not(:last-child)': {
                  marginBottom: 1
                }
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: 'transparent',
                minHeight: 40,
                px: 2,
                '&.Mui-expanded': {
                  minHeight: 40
                },
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Star sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.text.primary }}>
                  FEATURES
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 2, backgroundColor: 'transparent' }}>
              <Fade in={expandedSections.features} timeout={200}>
                <Box>
                  <Box sx={{ mb: 1 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.75rem' }}>Transmission</InputLabel>
                      <Select
                        value={filters.transmission || ''}
                        onChange={(e) => onFilterChange('transmission', e.target.value || undefined)}
                        label="Transmission"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiSelect-select': { fontSize: '0.75rem', py: 0.5 }
                        }}
                      >
                        <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All Transmissions</MenuItem>
                        {transmissions.map(trans => (
                          <MenuItem key={trans} value={trans} sx={{ fontSize: '0.75rem' }}>{trans}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.75rem' }}>Fuel Type</InputLabel>
                      <Select
                        value={filters.fuelType || ''}
                        onChange={(e) => onFilterChange('fuelType', e.target.value || undefined)}
                        label="Fuel Type"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiSelect-select': { fontSize: '0.75rem', py: 0.5 }
                        }}
                      >
                        <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All Fuel Types</MenuItem>
                        {fuelTypes.map(fuel => (
                          <MenuItem key={fuel} value={fuel} sx={{ fontSize: '0.75rem' }}>{fuel}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel sx={{ fontSize: '0.75rem' }}>Color</InputLabel>
                      <Select
                        value={filters.color || ''}
                        onChange={(e) => onFilterChange('color', e.target.value || undefined)}
                        label="Color"
                        sx={{ 
                          borderRadius: 1,
                          '& .MuiSelect-select': { fontSize: '0.75rem', py: 0.5 }
                        }}
                      >
                        <MenuItem value="" sx={{ fontSize: '0.75rem' }}>All Colors</MenuItem>
                        {colors.map(color => (
                          <MenuItem key={color} value={color} sx={{ fontSize: '0.75rem' }}>{color}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.trustedCars || false}
                        onChange={(e) => onFilterChange('trustedCars', e.target.checked)}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                        Trusted Cars Only
                      </Typography>
                    }
                  />
                </Box>
              </Fade>
            </AccordionDetails>
          </Accordion>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FilterSidebar
