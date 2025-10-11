import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import {
  DirectionsCar,
  CalendarToday,
  Speed,
  AttachMoney,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { Car } from "../../types";

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/car/${car.id}`);
  };

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

  return (
    <Card
      sx={{
        height: "420px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[800]} 100%)`
            : `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        border: (theme) =>
          `1px solid ${theme.palette.divider}`,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? `0 4px 20px ${theme.palette.common.black}40`
            : `0 4px 20px ${theme.palette.common.black}15`,
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: (theme) => 
            theme.palette.mode === "dark"
              ? `0 20px 40px ${theme.palette.common.black}50`
              : `0 20px 40px ${theme.palette.common.black}25`,
          "& .car-image": {
            transform: "scale(1.05)",
          },
          "& .car-badge": {
            transform: "scale(1.1)",
            boxShadow: "0 8px 20px rgba(211, 47, 47, 0.3)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="220"
          image={car.images[0]}
          alt={car.title}
          className="car-image"
          sx={{
            objectFit: "cover",
            width: "100%",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1,
          }}
        />

        {/* Category Badge */}
        <Chip
          label={car.category}
          size="small"
          className="car-badge"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 700,
            fontFamily: "Raleway, sans-serif",
            fontSize: "0.75rem",
            zIndex: 2,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        />

        {/* Price Badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            backdropFilter: "blur(10px)",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontFamily: "Raleway, sans-serif",
              fontSize: "1rem",
            }}
          >
            {formatPrice(car.price)}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1, px: 3, pt: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            fontSize: "1.2rem",
            lineHeight: 1.2,
            fontFamily: "Raleway, sans-serif",
            color: "text.primary",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {car.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontSize: "0.9rem",
            lineHeight: 1.4,
            fontFamily: "Raleway, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "2.8em",
          }}
        >
          {car.description}
        </Typography>

        {/* Car Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "grey.100",
                borderRadius: 1,
                flex: 1,
              }}
            >
              <DirectionsCar fontSize="small" color="primary" />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontSize: "0.8rem",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                }}
              >
                {car.make} {car.model}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "grey.100",
                borderRadius: 1,
                flex: 1,
              }}
            >
              <CalendarToday fontSize="small" color="primary" />
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontSize: "0.8rem",
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                }}
              >
                {car.year}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              backgroundColor: "grey.100",
              borderRadius: 1,
              width: "fit-content",
            }}
          >
            <Speed fontSize="small" color="primary" />
            <Typography
              variant="body2"
              color="text.primary"
              sx={{
                fontSize: "0.8rem",
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
              }}
            >
              {formatMileage(car.mileage)} mi
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 3,
          pt: 1,
          flexDirection: "column",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <Button
          variant="contained"
          onClick={handleViewDetails}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontFamily: "Raleway, sans-serif",
            py: 1.5,
            borderRadius: 1,
            fontSize: "1rem",
            background: "linear-gradient(45deg, #d32f2f, #f57c00)",
            boxShadow: "0 4px 15px rgba(211, 47, 47, 0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #b71c1c, #e65100)",
              boxShadow: "0 6px 20px rgba(211, 47, 47, 0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          View Details
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            pt: 1,
          }}
        >
          <IconButton
            size="medium"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "grey.100",
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <FavoriteBorder />
          </IconButton>
          <IconButton
            size="medium"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "grey.100",
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "white",
                transform: "scale(1.1)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Share />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CarCard;
