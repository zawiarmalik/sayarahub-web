import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Fade,
  Button,
  TextField,
} from "@mui/material";
import {
  DirectionsCar,
  AttachMoney,
  LocationOn,
  WhatsApp,
  Add,
} from "@mui/icons-material";
import CarCard from "../components/car/CarCard";
import FilterSidebar from "../components/filters/FilterSidebar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import HeroSection from "../components/sections/HeroSection";
import BrandShowcase from "../components/sections/BrandShowcase";
import TrustSection from "../components/sections/TrustSection";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/sections/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";
import { dummyCars } from "../constants/dummyData";
import type { CarFilters } from "../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState<CarFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (key: keyof CarFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handlePostAd = () => {
    if (isAuthenticated) {
      navigate("/post-ad");
    } else {
      navigate("/login");
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredCars = dummyCars.filter((car) => {
    const matchesSearch =
      !searchTerm ||
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMake = !filters.make || car.make === filters.make;
    const matchesCategory =
      !filters.category || car.category === filters.category;
    const matchesYearMin = !filters.yearMin || car.year >= filters.yearMin;
    const matchesYearMax = !filters.yearMax || car.year <= filters.yearMax;
    const matchesPriceMin = !filters.priceMin || car.price >= filters.priceMin;
    const matchesPriceMax = !filters.priceMax || car.price <= filters.priceMax;
    const matchesMileageMin =
      !filters.mileageMin || car.mileage >= filters.mileageMin;
    const matchesMileageMax =
      !filters.mileageMax || car.mileage <= filters.mileageMax;

    return (
      matchesSearch &&
      matchesMake &&
      matchesCategory &&
      matchesYearMin &&
      matchesYearMax &&
      matchesPriceMin &&
      matchesPriceMax &&
      matchesMileageMin &&
      matchesMileageMax
    );
  });

  if (isLoading) {
    return <LoadingSpinner message="Finding your perfect car..." />;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            py: 8,
            px: { xs: 2, sm: 3, md: 4, lg: 4, xl: 4 },
            width: "100%",
            maxWidth: "100%",
            mx: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 4, lg: 6 },
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              minHeight: "80vh",
            }}
          >
            {/* Left Content */}
            <Box
              sx={{
                flex: { xs: 1, lg: "1 1 50%" },
                maxWidth: { xs: "100%", lg: "600px" },
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                pr: { xs: 0, lg: 2 },
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 900,
          mb: 2,
                    fontFamily: "Raleway, sans-serif",
                    fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                    lineHeight: 1.1,
                    color: "text.primary",
                  }}
                >
                  Buy & sell{" "}
                  <Box
                    component="span"
                    sx={{
                      background: (theme) =>
                        `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    reputable cars
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 400,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.4,
                  }}
                >
                  Your trusted partner in finding the perfect car. Every vehicle
                  is verified, every transaction is secure, and every dream is
                  within reach.
                </Typography>
              </Box>

              {/* Statistics */}
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  mb: 6,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "primary.main",
                      fontFamily: "Raleway, sans-serif",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    50+
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Trusted Brands
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: "divider",
                    alignSelf: "stretch",
                  }}
                />

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "secondary.main",
                      fontFamily: "Raleway, sans-serif",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    10k+
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Happy Customers
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: "divider",
                    alignSelf: "stretch",
                  }}
                />

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: "success.main",
                      fontFamily: "Raleway, sans-serif",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    100%
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Verified Listings
                  </Typography>
                </Box>
              </Box>

              {/* Search Interface */}
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: (theme) =>
                    `0 20px 40px ${
                      theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(0,0,0,0.1)"
                    }`,
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(30, 41, 59, 0.95)"
                      : "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
          Find Your Perfect Car
        </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", sm: "1 1 calc(33.333% - 8px)" },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <DirectionsCar
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "text.secondary",
                          zIndex: 1,
                        }}
                      />
                      <TextField
                        fullWidth
                        placeholder="Number of seats"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            pl: 5,
                            borderRadius: 1,
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", sm: "1 1 calc(33.333% - 8px)" },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <AttachMoney
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "text.secondary",
                          zIndex: 1,
                        }}
                      />
                      <TextField
                        fullWidth
                        placeholder="Price range"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            pl: 5,
                            borderRadius: 1,
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      flex: { xs: "1 1 100%", sm: "1 1 calc(33.333% - 8px)" },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <LocationOn
                        sx={{
                          position: "absolute",
                          left: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "text.secondary",
                          zIndex: 1,
                        }}
                      />
                      <TextField
                        fullWidth
                        placeholder="Location"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            pl: 5,
                            borderRadius: 1,
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    py: 2,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    background: (theme) =>
                      `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: (theme) =>
                      `0 8px 25px ${theme.palette.primary.main}40`,
                    "&:hover": {
                      background: (theme) =>
                        `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      boxShadow: (theme) =>
                        `0 12px 30px ${theme.palette.primary.main}60`,
                    },
                  }}
                >
                  Search Cars
                </Button>
              </Card>
            </Box>

            {/* Right Content - Car Image */}
            <Box
              sx={{
                flex: { xs: 1, lg: "1 1 50%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: { xs: "400px", lg: "600px" },
                pr: { xs: 0, lg: 0 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "400px", md: "500px", lg: "600px" },
                  maxWidth: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: (theme) =>
                      `0 25px 50px ${
                        theme.palette.mode === "dark"
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(0,0,0,0.15)"
                      }`,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                    alt="Premium Car"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(1.1) contrast(1.1)",
                    }}
                  />

                  {/* Overlay gradient */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: (theme) =>
                        `linear-gradient(45deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Trust & Safety Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e293b" : "white",
          borderTop: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "grey.200",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontFamily: "Raleway, sans-serif",
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            Why Choose SayaraHub?
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "white", fontWeight: 800 }}
                  >
                    ✓
        </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  Verified Listings
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Every car undergoes thorough inspection and verification. No
                  surprises, just honest, detailed information about every
                  vehicle.
                </Typography>
              </Card>
      </Box>

            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "white", fontWeight: 800 }}
                  >
                    🛡️
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  Secure Transactions
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Your money and personal information are protected with
                  bank-level security. Safe, secure, and worry-free
                  transactions.
                </Typography>
              </Card>
            </Box>

            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "white", fontWeight: 800 }}
                  >
                    💎
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  Premium Experience
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  From discovery to delivery, we provide a premium, personalized
                  experience that makes car buying a joy, not a chore.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Customer Testimonials */}
      <Box
        sx={{
          py: 8,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#0f172a" : "grey.50",
          borderTop: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "grey.200",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 6,
              fontFamily: "Raleway, sans-serif",
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            What Our Customers Say
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      SM
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      Sarah Mitchell
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      Car Buyer
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "text.secondary",
                  }}
                >
                  "SayaraHub made finding my dream car so easy! The detailed
                  information and verification process gave me complete
                  confidence. I found my perfect BMW in just 3 days!"
                </Typography>
              </Card>
            </Box>

            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      JD
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      James Davis
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      Car Seller
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "text.secondary",
                  }}
                >
                  "As a seller, I was amazed by how professional and efficient
                  the platform is. My car sold within a week to a serious buyer.
                  The whole process was seamless!"
                </Typography>
              </Card>
            </Box>

            <Box
              sx={{ flex: { xs: "1 1 100%", md: "1 1 calc(33.333% - 16px)" } }}
            >
              <Card
                sx={{
                  p: 4,
                  height: "100%",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
                      : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: 700 }}
                    >
                      MR
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      Maria Rodriguez
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      Dealer
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "text.secondary",
                  }}
                >
                  "The financing options and detailed car information help us
                  close deals faster. Our customers love the transparency and
                  comprehensive details available."
                </Typography>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Brand Showcase */}
      <Box
        sx={{
          py: 6,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e293b" : "white",
          borderTop: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "grey.200",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 4,
              fontFamily: "Raleway, sans-serif",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Trusted by Leading Brands
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
              opacity: 0.7,
            }}
          >
            {[
              "Toyota",
              "Honda",
              "BMW",
              "Mercedes",
              "Audi",
              "Ford",
              "Nissan",
              "Hyundai",
            ].map((brand) => (
              <Typography
                key={brand}
                variant="h6"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  color: "text.secondary",
                  fontSize: "1.2rem",
                }}
              >
                {brand}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Featured Categories Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontFamily: "Raleway, sans-serif",
              color: "text.primary",
            }}
          >
            Explore by Category
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
            }}
          >
            Find the perfect vehicle for your lifestyle
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 8 }}>
          {[
            {
              name: "Luxury Cars",
              count: "150+",
              icon: "🏎️",
              color: "#d32f2f",
            },
            { name: "SUVs", count: "300+", icon: "🚙", color: "#1976d2" },
            { name: "Sedans", count: "400+", icon: "🚗", color: "#388e3c" },
            { name: "Electric", count: "80+", icon: "⚡", color: "#f57c00" },
            {
              name: "Sports Cars",
              count: "120+",
              icon: "🏁",
              color: "#7b1fa2",
            },
            { name: "Trucks", count: "200+", icon: "🚛", color: "#5d4037" },
          ].map((category, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 12px)",
                  md: "1 1 calc(33.333% - 16px)",
                  lg: "1 1 calc(16.666% - 20px)",
                },
              }}
            >
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography variant="h2" sx={{ mb: 1 }}>
                  {category.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 700,
                    color: category.color,
                    mb: 1,
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  {category.count} vehicles
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontFamily: "Raleway, sans-serif",
              color: "text.primary",
            }}
          >
            Featured Vehicles
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
            }}
          >
            Discover our handpicked selection of premium cars
          </Typography>
        </Box>

        {/* Main Content in Row Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          {/* Filter Sidebar - Left Side */}
          <Box
            sx={{
              width: { xs: "100%", lg: "350px" },
              flexShrink: 0,
              position: { lg: "sticky" },
              top: 20,
            }}
          >
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onSearch={handleSearch}
            searchTerm={searchTerm}
          />
          </Box>

          {/* Car Listings - Right Side */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
          {/* Results Header */}
            <Card sx={{ mb: 3, borderRadius: 1, boxShadow: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontFamily: "Raleway, sans-serif",
                    }}
                  >
              {filteredCars.length} cars found
            </Typography>
            
            {/* Active Filters */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {filters.make && (
                <Chip 
                  label={`Make: ${filters.make}`} 
                        onDelete={() => handleFilterChange("make", undefined)}
                  color="primary"
                  variant="outlined"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                />
              )}
              {filters.category && (
                <Chip 
                  label={`Category: ${filters.category}`} 
                        onDelete={() =>
                          handleFilterChange("category", undefined)
                        }
                  color="primary"
                  variant="outlined"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                />
              )}
              {filters.yearMin && (
                <Chip 
                  label={`Year: ${filters.yearMin}+`} 
                        onDelete={() =>
                          handleFilterChange("yearMin", undefined)
                        }
                  color="primary"
                  variant="outlined"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                />
              )}
                    {filters.priceMin && (
                <Chip 
                        label={`Price: BHD ${filters.priceMin}+`}
                        onDelete={() =>
                          handleFilterChange("priceMin", undefined)
                        }
                  color="primary"
                  variant="outlined"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                />
              )}
            </Box>
          </Box>
              </CardContent>
            </Card>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Fade in={!isLoading} timeout={500}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(auto-fit, minmax(300px, 1fr))",
                      md: "repeat(auto-fit, minmax(320px, 1fr))",
                      lg: "repeat(auto-fit, minmax(350px, 1fr))",
                      xl: "repeat(auto-fit, minmax(380px, 1fr))",
                    },
                    gap: { xs: 2, sm: 3 },
                    justifyItems: "center",
                  }}
                >
            {filteredCars.map((car) => (
                    <Box key={car.id} sx={{ width: "100%", maxWidth: "400px" }}>
                <CarCard car={car} />
                    </Box>
            ))}
                </Box>
              </Fade>

          {filteredCars.length === 0 && (
                <Card sx={{ borderRadius: 3, boxShadow: 3, p: 6 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                      }}
                    >
                No cars found matching your criteria
              </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        mb: 4,
                        fontWeight: 400,
                      }}
                    >
                      Try adjusting your search or filter options to discover
                      more vehicles
              </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        background: "linear-gradient(45deg, #d32f2f, #f57c00)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #b71c1c, #e65100)",
                        },
                      }}
                      onClick={() => window.location.reload()}
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </Box>

        {/* Featured Cars Section */}
        <Box sx={{ py: 8, backgroundColor: "background.paper", width: "100%" }}>
          <Container maxWidth="xl" sx={{ width: "100%" }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                Featured Cars
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 400,
                }}
              >
                Discover our handpicked selection of premium vehicles
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 4,
                mb: 8,
              }}
            >
              {dummyCars.slice(0, 8).map((car) => (
                <Box key={`featured-${car.id}`} sx={{ width: "100%" }}>
                  <CarCard car={car} />
                </Box>
              ))}
            </Box>

            {/* Quick Filters */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 4,
                mb: 6,
              }}
            >
              {/* Popular Years */}
              <Card
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 3,
                  boxShadow: 1,
                  border: "1px solid #f0f0f0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Popular Years
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {[2024, 2023, 2022, 2021, 2020].map((year) => (
                    <Chip
                      key={year}
                      label={`${year} (${Math.floor(Math.random() * 15) + 5})`}
                      variant="outlined"
                      clickable
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Card>

              {/* Top Cities */}
              <Card
                sx={{
                  flex: 1,
                  p: 4,
                  borderRadius: 3,
                  boxShadow: 1,
                  border: "1px solid #f0f0f0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Top Cities
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {[
                    "Manama",
                    "Muharraq",
                    "Riffa",
                    "Hamala",
                    "Sitra",
                  ].map((city) => (
                    <Chip
                      key={city}
                      label={`${city} (${Math.floor(Math.random() * 20) + 10})`}
                      variant="outlined"
                      clickable
                      sx={{
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Box>
    </Container>
        </Box>

        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          {/* Post Ad Button */}
          <Button
            variant="contained"
            onClick={handlePostAd}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: (theme) => theme.palette.primary.main,
              boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.main}40`,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Add sx={{ fontSize: 32, color: "white" }} />
          </Button>
          
          {/* WhatsApp Button */}
          <Button
            variant="contained"
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#25D366",
              boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
              "&:hover": {
                backgroundColor: "#128C7E",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <WhatsApp sx={{ fontSize: 32, color: "white" }} />
          </Button>
        </Box>
      </Container>

      {/* Add Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
