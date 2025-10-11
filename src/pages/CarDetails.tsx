import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  Fade,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from "@mui/material";
import { getCardStyles, getContainerStyles, getPageContainerStyles } from '../utils/themeStyles'
import Footer from '../components/sections/Footer';
import {
  DirectionsCar,
  CalendarToday,
  Speed,
  Person,
  Phone,
  Email,
  FavoriteBorder,
  Share,
  ArrowBack,
  LocalGasStation,
  Settings,
  Security,
  Star,
  LocationOn,
  CheckCircle,
  Warning,
  Info,
  Build,
  Palette,
  Directions,
  AttachMoney,
  Schedule,
  VerifiedUser,
  CarRepair,
  Air,
  MusicNote,
  Wifi,
  Nature,
  CameraAlt,
  BatteryChargingFull,
  // EcoMode,
  SportsMotorsports,
  DirectionsBike,
  LocalParking,
  Shield,
  GpsFixed,
  VolumeUp,
  Lightbulb,
  AcUnit,
  TouchApp,
  Visibility,
  Lock,
  Key,
  Dashboard,
  Tune,
  Engineering,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { dummyCars } from "../constants/dummyData";

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const car = dummyCars.find((c) => c.id === id);

  if (!car) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontFamily: "Raleway, sans-serif" }}>
          Car not found
        </Typography>
        <Button
          onClick={() => navigate("/")}
          sx={{ mt: 2, fontFamily: "Raleway, sans-serif" }}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BHD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  // Comprehensive car data
  const carFeatures = [
    {
      icon: <Air />,
      label: "Air Conditioning",
      value: "Dual Zone Climate Control",
    },
    {
      icon: <MusicNote />,
      label: "Audio System",
      value: "Premium 12-Speaker Bose",
    },
    { icon: <Wifi />, label: "Bluetooth", value: "Wireless Apple CarPlay" },
    {
      icon: <CameraAlt />,
      label: "Backup Camera",
      value: "360° Surround View",
    },
    { icon: <BatteryChargingFull />, label: "Battery", value: "New (2024)" },
    { icon: <Nature />, label: "Eco Mode", value: "Hybrid Drive System" },
    {
      icon: <SportsMotorsports />,
      label: "Sport Mode",
      value: "Dynamic Sport Suspension",
    },
    {
      icon: <DirectionsBike />,
      label: "Cruise Control",
      value: "Adaptive with Stop & Go",
    },
    {
      icon: <LocalParking />,
      label: "Parking Assist",
      value: "Automated Parallel Parking",
    },
    {
      icon: <Shield />,
      label: "Safety Features",
      value: "Advanced Driver Assistance",
    },
    {
      icon: <GpsFixed />,
      label: "Navigation",
      value: "Built-in GPS with Traffic",
    },
    {
      icon: <VolumeUp />,
      label: "Sound System",
      value: "Premium Audio with Subwoofer",
    },
    {
      icon: <Lightbulb />,
      label: "LED Headlights",
      value: "Adaptive LED with Auto High Beam",
    },
    {
      icon: <TouchApp />,
      label: "Touchscreen",
      value: '12.3" Infotainment Display',
    },
    {
      icon: <Key />,
      label: "Keyless Entry",
      value: "Smart Key with Push Button Start",
    },
    {
      icon: <Dashboard />,
      label: "Digital Dashboard",
      value: '12.3" Digital Instrument Cluster',
    },
  ];

  const safetyFeatures = [
    {
      icon: <Security />,
      label: "Airbags",
      value: "8 Airbags (Front, Side, Curtain)",
    },
    { icon: <Visibility />, label: "ABS", value: "4-Wheel Anti-lock Braking" },
    {
      icon: <Lock />,
      label: "Anti-theft",
      value: "Immobilizer & Alarm System",
    },
    {
      icon: <Shield />,
      label: "Stability Control",
      value: "Electronic Stability Control",
    },
    {
      icon: <Warning />,
      label: "Lane Assist",
      value: "Lane Departure Warning & Assist",
    },
    {
      icon: <CameraAlt />,
      label: "Blind Spot Monitor",
      value: "Blind Spot Detection & Alert",
    },
    {
      icon: <Visibility />,
      label: "Forward Collision",
      value: "Forward Collision Warning",
    },
    {
      icon: <Shield />,
      label: "Pedestrian Detection",
      value: "Automatic Emergency Braking",
    },
  ];

  const maintenanceHistory = [
    {
      date: "2024-01-15",
      service: "Oil Change & Filter",
      mileage: "22,000",
      status: "Completed",
      cost: "$89",
    },
    {
      date: "2023-12-10",
      service: "Brake Inspection & Service",
      mileage: "21,500",
      status: "Completed",
      cost: "$245",
    },
    {
      date: "2023-11-05",
      service: "Tire Rotation & Balance",
      mileage: "21,000",
      status: "Completed",
      cost: "$65",
    },
    {
      date: "2023-09-20",
      service: "Engine Tune-up & Diagnostics",
      mileage: "20,000",
      status: "Completed",
      cost: "$320",
    },
    {
      date: "2023-07-15",
      service: "Air Filter Replacement",
      mileage: "19,000",
      status: "Completed",
      cost: "$45",
    },
    {
      date: "2023-05-10",
      service: "Transmission Service",
      mileage: "18,000",
      status: "Completed",
      cost: "$180",
    },
  ];

  const financingOptions = {
    salesPrice: 25000,
    totalFees: 2500,
    warranty: 1200,
    gap: 800,
    cashPrice: 29500,
    netTrade: 0,
    rebate: 0,
    downPayment: 5000,
    loanBalance: 24500,
    term: 60,
    apr: 4.9,
    monthlyPayment: 461.88,
  };

  const detailedSpecs = {
    basic: [
      { label: "Make", value: car.make },
      { label: "Model", value: car.model },
      { label: "Year", value: car.year },
      { label: "Mileage", value: `${formatMileage(car.mileage)} miles` },
      { label: "Body Style", value: "4 Door Sedan" },
      { label: "Drive Type", value: "Front Wheel Drive" },
      { label: "Exterior Color", value: "Sonic Gray Pearl" },
      { label: "Interior Color", value: "Black Leather" },
      { label: "Stock #", value: "STK-2024-001" },
      { label: "VIN", value: "1HGBH41JXMN109186" },
    ],
    engine: [
      { label: "Engine", value: "2.0L 4-Cylinder Turbo" },
      { label: "Horsepower", value: "252 HP @ 5,500 RPM" },
      { label: "Torque", value: "273 lb-ft @ 1,500 RPM" },
      { label: "Transmission", value: "10-Speed Automatic" },
      { label: "Fuel Type", value: "Premium Unleaded" },
      { label: "Fuel Capacity", value: "14.8 Gallons" },
      { label: "MPG City", value: "22 MPG" },
      { label: "MPG Highway", value: "31 MPG" },
      { label: "0-60 MPH", value: "6.1 seconds" },
      { label: "Top Speed", value: "155 MPH (Limited)" },
    ],
    dimensions: [
      { label: "Length", value: "192.2 inches" },
      { label: "Width", value: "73.0 inches" },
      { label: "Height", value: "56.9 inches" },
      { label: "Wheelbase", value: "111.4 inches" },
      { label: "Curb Weight", value: "3,461 lbs" },
      { label: "Ground Clearance", value: "5.1 inches" },
      { label: "Turning Radius", value: "37.4 feet" },
      { label: "Cargo Capacity", value: "16.7 cubic feet" },
      { label: "Seating Capacity", value: "5 passengers" },
      { label: "Headroom Front", value: "39.5 inches" },
    ],
  };

  return (
    <Box sx={{ 
      ...getContainerStyles(),
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth={false} sx={{ py: 4, ...getPageContainerStyles() }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
      <Button
        startIcon={<ArrowBack />}
            onClick={() => navigate("/")}
            sx={{
              mb: 3,
              fontFamily: "Raleway, sans-serif",
              fontWeight: 600,
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
      >
        Back to Listings
      </Button>

          <Typography variant="h2" sx={{ 
            fontWeight: 800,
            fontFamily: "Raleway, sans-serif",
            color: "text.primary",
            mb: 1
          }}>
            {car.title}
          </Typography>
          
          <Typography variant="h5" sx={{ 
            color: "text.secondary",
            fontFamily: "Raleway, sans-serif",
            fontWeight: 400,
            mb: 2
          }}>
            {car.year} • {formatMileage(car.mileage)} miles • {car.category}
          </Typography>
          
          {/* Trust Badges */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <Chip 
              icon={<VerifiedUser />} 
              label="Verified Vehicle" 
              color="success" 
              sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
            />
            <Chip 
              icon={<CheckCircle />} 
              label="Inspection Passed" 
              color="primary" 
              sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
            />
            <Chip 
              icon={<Security />} 
              label="Warranty Available" 
              color="secondary" 
              sx={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600 }}
            />
          </Box>
        </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Left Column - Images and Tabs */}
        <Box sx={{ flex: { xs: 1, lg: 2 } }}>
          {/* Image Gallery */}
          <Card
            sx={{ 
              mb: 3, 
              overflow: "hidden", 
              ...getCardStyles(theme)
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="500"
                image={car.images[selectedImage]}
              alt={car.title}
                sx={{ objectFit: "cover" }}
              />

              {/* Image Navigation */}
              {car.images.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  {car.images.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor:
                          selectedImage === index
                            ? "white"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Trust Badges */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Chip
                  icon={<VerifiedUser />}
                  label="Verified"
                  color="success"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(16, 185, 129, 0.9)",
                    color: "white",
                    fontWeight: 600,
                    fontFamily: "Raleway, sans-serif",
                  }}
                />
                <Chip
                  icon={<CheckCircle />}
                  label="Inspected"
                  color="info"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(59, 130, 246, 0.9)",
                    color: "white",
                    fontWeight: 600,
                    fontFamily: "Raleway, sans-serif",
                  }}
                />
              </Box>
            </Box>
          </Card>

          {/* Thumbnail Gallery */}
          {car.images.length > 1 && (
            <Card sx={{ 
              mb: 3, 
              p: 2, 
              ...getCardStyles(theme)
            }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                }}
              >
                More Photos
              </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {car.images.map((image, index) => (
                  <Box key={index} sx={{ flex: '0 0 calc(25% - 8px)', minWidth: '120px' }}>
                    <Box
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: 1,
                        overflow: "hidden",
                        border:
                          selectedImage === index ? "3px solid" : "2px solid",
                        borderColor:
                          selectedImage === index
                            ? "primary.main"
                            : "transparent",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          borderColor: "primary.main",
                        },
                      }}
                    >
                  <img
                    src={image}
                        alt={`${car.title} ${index + 1}`}
                    style={{
                          width: "100%",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                ))}
            </Box>
            </Card>
          )}

          {/* Detailed Information Tabs */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                sx={{ px: 3 }}
              >
                <Tab
                  label="Overview"
                  sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                />
                <Tab
                  label="Features"
                  sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                />
                <Tab
                  label="Safety"
                  sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                />
                <Tab
                  label="History"
                  sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Overview Tab */}
              {tabValue === 0 && (
                <Fade in={tabValue === 0} timeout={300}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Vehicle Overview
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      <Box sx={{ flex: '0 0 calc(50% - 12px)', minWidth: '300px' }}>
                        <Card
                          sx={{
                            p: 2,
                            backgroundColor: "grey.50",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            Basic Information
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <DirectionsCar color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Make & Model"
                                secondary={`${car.make} ${car.model}`}
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <CalendarToday color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Year"
                                secondary={car.year}
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Speed color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Mileage"
                                secondary={`${formatMileage(
                                  car.mileage
                                )} miles`}
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Palette color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Color"
                                secondary="Black"
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                          </List>
                        </Card>
                      </Box>

                      <Box sx={{ flex: '0 0 calc(50% - 12px)', minWidth: '300px' }}>
                        <Card
                          sx={{
                            p: 2,
                            backgroundColor: "grey.50",
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2,
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            Technical Specifications
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemIcon>
                                <LocalGasStation color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Fuel Type"
                                secondary="Petrol"
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Settings color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Transmission"
                                secondary="Automatic"
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Engineering color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Engine"
                                secondary="2.0L 4-Cylinder"
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Directions color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary="Drive Type"
                                secondary="FWD"
                                primaryTypographyProps={{
                                  fontFamily: "Raleway, sans-serif",
                                  fontWeight: 600,
                                }}
                              />
                            </ListItem>
                          </List>
                        </Card>
                      </Box>
                    </Box>

                    <Card
                      sx={{
                        mt: 3,
                        p: 3,
                        backgroundColor: "grey.50",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Description
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.6,
                          fontFamily: "Raleway, sans-serif",
                        }}
                      >
                        {car.description}
                      </Typography>
                    </Card>
                  </Box>
                </Fade>
              )}

              {/* Features Tab */}
              {tabValue === 1 && (
                <Fade in={tabValue === 1} timeout={300}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Vehicle Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {carFeatures.map((feature, index) => (
                        <Box key={index} sx={{ flex: '0 0 calc(33.333% - 16px)', minWidth: '280px' }}>
                          <Card
                            sx={{
                              p: 2,
                              textAlign: "center",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <Box sx={{ color: "primary.main", mb: 1 }}>
                              {feature.icon}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "Raleway, sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              {feature.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontFamily: "Raleway, sans-serif" }}
                            >
                              {feature.value}
                            </Typography>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Safety Tab */}
              {tabValue === 2 && (
                <Fade in={tabValue === 2} timeout={300}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Safety Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {safetyFeatures.map((feature, index) => (
                        <Box key={index} sx={{ flex: '0 0 calc(33.333% - 16px)', minWidth: '280px' }}>
                          <Card
                            sx={{
                              p: 2,
                              textAlign: "center",
                              borderRadius: 1,
                              boxShadow: 1,
                            }}
                          >
                            <Box sx={{ color: "success.main", mb: 1 }}>
                              {feature.icon}
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontFamily: "Raleway, sans-serif",
                                fontWeight: 600,
                              }}
                            >
                              {feature.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontFamily: "Raleway, sans-serif" }}
                            >
                              {feature.value}
                            </Typography>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* History Tab */}
              {tabValue === 3 && (
                <Fade in={tabValue === 3} timeout={300}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 3,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Maintenance History
                    </Typography>
                    <List>
                      {maintenanceHistory.map((record, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary={record.service}
                            secondary={`${record.date} • ${record.mileage} miles`}
                            primaryTypographyProps={{
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                            }}
                            secondaryTypographyProps={{
                              fontFamily: "Raleway, sans-serif",
                            }}
                          />
                          <Chip
                            label={record.status}
                            color="success"
                            size="small"
                            sx={{ fontFamily: "Raleway, sans-serif" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Fade>
              )}
            </Box>
          </Card>
        </Box>

        {/* Right Column - Price and Contact */}
        <Box sx={{ flex: { xs: 1, lg: 1 } }}>
          <Box sx={{ position: "sticky", top: 20 }}>
            {/* Price Card */}
            <Card
              sx={{ mb: 3, borderRadius: 3, boxShadow: 3, overflow: "hidden" }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                  color: "white",
                  p: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontFamily: "Raleway, sans-serif",
                    mb: 1,
                  }}
                >
                  {formatPrice(car.price)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.9, fontFamily: "Raleway, sans-serif" }}
                >
                  Negotiable
                </Typography>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
                  >
                {car.title}
              </Typography>
              <Box>
                    <IconButton
                      sx={{ mr: 1, "&:hover": { backgroundColor: "grey.100" } }}
                    >
                  <FavoriteBorder />
                </IconButton>
                    <IconButton
                      sx={{ "&:hover": { backgroundColor: "grey.100" } }}
                    >
                  <Share />
                </IconButton>
              </Box>
            </Box>

            <Chip
              label={car.category}
              color="primary"
                  sx={{
                    mb: 3,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                  }}
                />

            <Button
              variant="contained"
              fullWidth
              size="large"
                  sx={{
                    mb: 2,
                    py: 1.5,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #d32f2f, #f57c00)",
                    boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #b71c1c, #e65100)",
                      boxShadow: "0 6px 20px rgba(211, 47, 47, 0.4)",
                    },
                  }}
            >
              Contact Seller
            </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    py: 1.5,
                  }}
                >
                  Schedule Test Drive
                </Button>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Seller Information
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                    {car.seller.firstName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {car.seller.firstName} {car.seller.lastName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating
                        value={4.8}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        4.8 (24 reviews)
                </Typography>
              </Box>
                  </Box>
              </Box>
              
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={car.seller.email}
                      primaryTypographyProps={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Phone color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={car.seller.phone}
                      primaryTypographyProps={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <LocationOn color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Manama, Bahrain"
                      primaryTypographyProps={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Quick Stats
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        backgroundColor: "grey.50",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary.main"
                        sx={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 800,
                        }}
                      >
                        {car.year}
            </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Model Year
              </Typography>
            </Box>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        backgroundColor: "grey.50",
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary.main"
                        sx={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: 800,
                        }}
                      >
                        {formatMileage(car.mileage)}
              </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Miles
                </Typography>
              </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
    
    {/* Add Footer */}
    <Footer />
  </Box>
  );
};

export default CarDetails;
