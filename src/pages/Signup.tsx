import React, { useState } from "react";
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
} from "@mui/material";
import {
  getCardStyles,
  getInputStyles,
  getButtonStyles,
  getContainerStyles,
  getPageContainerStyles,
} from "../utils/themeStyles";
import { DriveEta } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";
import Footer from "../components/sections/Footer";
import type { SignupData } from "../types";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const theme = useTheme();
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : '#f8fafc'
    }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
      {/* Left Side - Branding & Content */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, 
          ${theme.palette.mode === "dark" ? "#0a0e1a" : "#667eea"} 0%, 
          ${theme.palette.mode === "dark" ? "#1a1f3a" : "#764ba2"} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          }}
        />

        {/* Floating Car Icon */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            opacity: 0.1,
            transform: "rotate(15deg)",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          <DriveEta sx={{ fontSize: 200, color: "white" }} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            zIndex: 2,
            textAlign: "center",
            color: "white",
            px: 6,
            maxWidth: 500,
          }}
        >
          <DriveEta
            sx={{
              fontSize: 80,
              color: "white",
              mb: 3,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontFamily: "Raleway, sans-serif",
              background: "linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SayaraHub
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 3,
              fontFamily: "Raleway, sans-serif",
              opacity: 0.9,
            }}
          >
            Your Dream Car Awaits
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.8,
              fontFamily: "Raleway, sans-serif",
              lineHeight: 1.6,
            }}
          >
            Bahrain's #1 trusted car marketplace. Join thousands of satisfied
            customers who found their perfect vehicle through SayaraHub.
            Verified listings, secure transactions, and exceptional service
            await you.
          </Typography>

          {/* Features */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 4,
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#4CAF50", fontSize: "1.2rem" }}>
                ✓
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Raleway, sans-serif" }}
              >
                Verified car listings with detailed inspection reports
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#4CAF50", fontSize: "1.2rem" }}>
                ✓
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Raleway, sans-serif" }}
              >
                Secure payment processing and escrow services
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#4CAF50", fontSize: "1.2rem" }}>
                ✓
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Raleway, sans-serif" }}
              >
                24/7 customer support and assistance
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#4CAF50", fontSize: "1.2rem" }}>
                ✓
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Raleway, sans-serif" }}
              >
                Free car inspection and verification services
              </Typography>
            </Box>
          </Box>

          {/* Enhanced Stats Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: 6,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                50K+
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                Cars Listed
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                25K+
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                Happy Users
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#ffffff",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                98%
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                Success Rate
              </Typography>
            </Box>
          </Box>

          {/* Trust Indicators */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                mb: 2,
                textAlign: "center",
                color: "white",
              }}
            >
              🏆 Trusted by Leading Brands
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                opacity: 0.9,
                fontFamily: "Raleway, sans-serif",
                lineHeight: 1.5,
              }}
            >
              Partnered with Toyota, Honda, Nissan, and 500+ verified dealers
              across Bahrain
            </Typography>
          </Box>
        </Box>
      </Box>

        {/* Right Side - Signup Form */}
        <Box
          sx={{
            flex: { xs: 1, lg: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 4, lg: 4 },
            py: 4,
            width: "100%",
            maxWidth: { lg: "500px" },
          }}
        >
        <Paper
          sx={{
            p: 4,
            maxWidth: 480,
            width: "100%",
            borderRadius: 3,
            background:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 25px 50px rgba(0, 0, 0, 0.5)"
                : "0 25px 50px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <DriveEta
              sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                fontFamily: "Raleway, sans-serif",
                mb: 1,
              }}
            >
              Join SayaraHub
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "1.1rem",
                mb: 3,
              }}
            >
              Create your account and start your car buying journey today
            </Typography>

            {/* Quick Benefits */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ textAlign: "center", minWidth: "80px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  🚀
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  Quick Setup
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", minWidth: "80px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  💎
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  Best Deals
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", minWidth: "80px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "success.main",
                    fontWeight: 700,
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  ⭐
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  Trusted Platform
                </Typography>
              </Box>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ flex: 1 }}
                helperText="Enter your first name"
              />
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                sx={{ flex: 1 }}
                helperText="Enter your last name"
              />
            </Box>

            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              helperText="We'll use this to send you updates about your account"
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              helperText="Choose a strong password with at least 8 characters"
            />

            <TextField
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              helperText="Optional - for better communication"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 2,
                fontSize: "1.1rem",
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
                "&:hover": {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                  boxShadow: `0 12px 35px ${theme.palette.primary.main}40`,
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography
                variant="body1"
                sx={{ fontFamily: "Raleway, sans-serif" }}
              >
                Already have an account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    fontWeight: 600,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>

          </Box>
        </Paper>
      </Box>
      </Box>

      {/* Add Footer */}
      <Footer />
    </Box>
  );
};

export default Signup;
