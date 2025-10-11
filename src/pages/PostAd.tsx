import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
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
import {
  DriveEta,
  CloudUpload,
  Description,
  DirectionsCar,
  AttachMoney,
  PhotoCamera,
  Lightbulb,
  CheckCircle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../modules/auth/AuthContext";
import Footer from "../components/sections/Footer";
import type { CarFormData } from "../types";

const PostAd: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const [formData, setFormData] = useState<CarFormData>({
    title: "",
    description: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    manufacturingMonth: "",
    manufacturingYear: new Date().getFullYear(),
    mileage: 0,
    price: 0,
    category: "Sedan",
    images: [],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          ...getContainerStyles(),
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container
          maxWidth={false}
          sx={{ py: 8, textAlign: "center", ...getPageContainerStyles() }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontFamily: "Raleway, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            Please log in to post an ad
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login")}
            sx={{ ...getButtonStyles(theme) }}
          >
            Login
          </Button>
        </Container>
      </Box>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "year" ||
        name === "manufacturingYear" ||
        name === "mileage" ||
        name === "price"
          ? parseInt(value) || 0
          : value,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: Array.from(e.target.files),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    } catch (err) {
      setError("Failed to post ad. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[200]
              : theme.palette.grey[100],
          color:
            theme.palette.mode === "dark" ? "white" : theme.palette.grey[200],
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <DriveEta
          sx={{
            fontSize: 48,
            color:
              theme.palette.mode === "dark" ? "white" : theme.palette.grey[800],
            mb: 2,
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 800,
            mb: 1,
            color:
              theme.palette.mode === "dark" ? "white" : theme.palette.grey[800],
            background:
              theme.palette.mode === "dark"
                ? `linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)`
                : `linear-gradient(45deg, #333333 30%, #666666 90%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Post Your Car Ad
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.9)"
                : theme.palette.grey[600],
            fontFamily: "Raleway, sans-serif",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          List your vehicle and reach thousands of potential buyers across
          Bahrain
        </Typography>
      </Box>

      {/* Main Form Container */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl" sx={{ px: 0 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Two Column Layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 4,
                mb: 4,
              }}
            >
              {/* Left Column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Basic Information */}
                <Paper sx={{ p: 3, ...getCardStyles(theme) }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Description sx={{ fontSize: 24 }} />
                    Basic Information
                  </Typography>

                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Ad Title"
                    name="title"
                    placeholder="e.g., 2022 Toyota Camry LE - Low Mileage"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={isLoading}
                    helperText="Create an eye-catching title that highlights your car's key features"
                    sx={getInputStyles(theme)}
                  />

                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="description"
                    label="Description"
                    name="description"
                    placeholder="Describe your car's condition, features, and any additional details..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading}
                    helperText="Include details about condition, maintenance history, features, and any modifications"
                    sx={{ mt: 2, ...getInputStyles(theme) }}
                  />
                </Paper>

                {/* Vehicle Details */}
                <Paper sx={{ p: 3, ...getCardStyles(theme) }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <DirectionsCar sx={{ fontSize: 24 }} />
                    Vehicle Details
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                      }}
                    >
                      <FormControl fullWidth required>
                        <InputLabel>Make</InputLabel>
                        <Select
                          name="make"
                          value={formData.make}
                          label="Make"
                          onChange={handleSelectChange}
                          disabled={isLoading}
                          sx={getInputStyles(theme)}
                        >
                          <MenuItem value="Toyota">Toyota</MenuItem>
                          <MenuItem value="Honda">Honda</MenuItem>
                          <MenuItem value="Ford">Ford</MenuItem>
                          <MenuItem value="Chevrolet">Chevrolet</MenuItem>
                          <MenuItem value="BMW">BMW</MenuItem>
                          <MenuItem value="Mercedes-Benz">
                            Mercedes-Benz
                          </MenuItem>
                          <MenuItem value="Audi">Audi</MenuItem>
                          <MenuItem value="Nissan">Nissan</MenuItem>
                          <MenuItem value="Hyundai">Hyundai</MenuItem>
                          <MenuItem value="Kia">Kia</MenuItem>
                          <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                          <MenuItem value="Mazda">Mazda</MenuItem>
                          <MenuItem value="Subaru">Subaru</MenuItem>
                          <MenuItem value="Lexus">Lexus</MenuItem>
                          <MenuItem value="Tesla">Tesla</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        required
                        fullWidth
                        id="model"
                        label="Model"
                        name="model"
                        placeholder="e.g., Camry, CR-V, F-150"
                        value={formData.model}
                        onChange={handleChange}
                        disabled={isLoading}
                        sx={getInputStyles(theme)}
                      />
                    </Box>

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
                        type="number"
                        id="year"
                        label="Model Year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        disabled={isLoading}
                        inputProps={{
                          min: 1900,
                          max: new Date().getFullYear() + 1,
                        }}
                        helperText="The year the car model was released"
                        sx={getInputStyles(theme)}
                      />

                      <FormControl fullWidth required>
                        <InputLabel>Manufacturing Month</InputLabel>
                        <Select
                          name="manufacturingMonth"
                          value={formData.manufacturingMonth}
                          label="Manufacturing Month"
                          onChange={handleSelectChange}
                          disabled={isLoading}
                          sx={getInputStyles(theme)}
                        >
                          <MenuItem value="January">January</MenuItem>
                          <MenuItem value="February">February</MenuItem>
                          <MenuItem value="March">March</MenuItem>
                          <MenuItem value="April">April</MenuItem>
                          <MenuItem value="May">May</MenuItem>
                          <MenuItem value="June">June</MenuItem>
                          <MenuItem value="July">July</MenuItem>
                          <MenuItem value="August">August</MenuItem>
                          <MenuItem value="September">September</MenuItem>
                          <MenuItem value="October">October</MenuItem>
                          <MenuItem value="November">November</MenuItem>
                          <MenuItem value="December">December</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

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
                        type="number"
                        id="manufacturingYear"
                        label="Manufacturing Year"
                        name="manufacturingYear"
                        value={formData.manufacturingYear}
                        onChange={handleChange}
                        disabled={isLoading}
                        inputProps={{
                          min: 1900,
                          max: new Date().getFullYear(),
                        }}
                        helperText="The actual year the car was manufactured"
                        sx={getInputStyles(theme)}
                      />

                      <TextField
                        required
                        fullWidth
                        type="number"
                        id="mileage"
                        label="Mileage (km)"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        disabled={isLoading}
                        inputProps={{ min: 0 }}
                        sx={getInputStyles(theme)}
                      />
                    </Box>

                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        label="Category"
                        onChange={handleSelectChange}
                        disabled={isLoading}
                        sx={getInputStyles(theme)}
                      >
                        <MenuItem value="SUV">SUV</MenuItem>
                        <MenuItem value="Sedan">Sedan</MenuItem>
                        <MenuItem value="Hatchback">Hatchback</MenuItem>
                        <MenuItem value="Coupe">Coupe</MenuItem>
                        <MenuItem value="Convertible">Convertible</MenuItem>
                        <MenuItem value="Wagon">Wagon</MenuItem>
                        <MenuItem value="Pickup">Pickup</MenuItem>
                        <MenuItem value="Van">Van</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Paper>
              </Box>

              {/* Right Column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {/* Pricing */}
                <Paper sx={{ p: 3, ...getCardStyles(theme) }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AttachMoney sx={{ fontSize: 24 }} />
                    Pricing
                  </Typography>

                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="price"
                    label="Price (BHD)"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={isLoading}
                    inputProps={{ min: 0 }}
                    helperText="Enter the price in Bahraini Dinar (BHD). Consider market value and your car's condition"
                    sx={getInputStyles(theme)}
                  />
                </Paper>

                {/* Image Upload */}
                <Paper sx={{ p: 3, ...getCardStyles(theme) }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PhotoCamera sx={{ fontSize: 24 }} />
                    Photos
                  </Typography>

                  <Box
                    sx={{
                      border: `2px dashed ${theme.palette.divider}`,
                      p: 4,
                      textAlign: "center",
                      borderRadius: 1,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[800]
                          : theme.palette.background.paper,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? theme.palette.grey[700]
                            : theme.palette.background.default,
                      },
                    }}
                  >
                    <CloudUpload
                      sx={{
                        fontSize: 64,
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontFamily: "Raleway, sans-serif",
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Upload Car Images
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color: theme.palette.text.secondary,
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      Upload up to 10 high-quality images (JPG, PNG, WebP)
                    </Typography>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                      disabled={isLoading}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        disabled={isLoading}
                        size="large"
                        startIcon={<CloudUpload />}
                        sx={{
                          ...getButtonStyles(theme),
                          px: 4,
                          py: 1.5,
                        }}
                      >
                        Choose Images
                      </Button>
                    </label>
                    {formData.images.length > 0 && (
                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CheckCircle
                            sx={{
                              color: theme.palette.success.main,
                              fontSize: 20,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.success.main,
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {formData.images.length} file(s) selected
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Paper>

                {/* Quick Tips */}
                <Paper sx={{ p: 3, ...getCardStyles(theme) }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Raleway, sans-serif",
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Lightbulb sx={{ fontSize: 24 }} />
                    Quick Tips
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircle
                        sx={{ color: theme.palette.success.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Use clear, high-quality photos
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircle
                        sx={{ color: theme.palette.success.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Be honest about condition and history
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircle
                        sx={{ color: theme.palette.success.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Research market prices for fair pricing
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <CheckCircle
                        sx={{ color: theme.palette.success.main, fontSize: 20 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        Respond quickly to inquiries
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                mt: 4,
                pt: 4,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                disabled={isLoading}
                size="large"
                sx={{
                  ...getButtonStyles(theme),
                  minWidth: { xs: "100%", sm: "160px" },
                  py: 1.5,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                size="large"
                sx={{
                  minWidth: { xs: "100%", sm: "180px" },
                  ...getButtonStyles(theme),
                  py: 1.5,
                  fontSize: "1.1rem",
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Post Your Ad"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Add Footer */}
      <Footer />
    </Box>
  );
};

export default PostAd;
