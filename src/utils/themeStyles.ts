import { Theme } from "@mui/material/styles";

// Consistent card styling across all components
export const getCardStyles = (theme: Theme) => ({
  borderRadius: 1,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 8px 25px ${theme.palette.common.black}40`
      : `0 8px 25px ${theme.palette.common.black}15`,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    boxShadow:
      theme.palette.mode === "dark"
        ? `0 12px 35px ${theme.palette.common.black}50`
        : `0 12px 35px ${theme.palette.common.black}25`,
    transition: "all 0.3s ease",
  },
});

// Consistent input field styling
export const getInputStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    backgroundColor: theme.palette.background.paper,
    "& fieldset": {
      border: `1px solid ${theme.palette.divider}`,
    },
    "&:hover fieldset": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&.Mui-focused fieldset": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    fontFamily: "Raleway, sans-serif",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
});

// Consistent button styling
export const getButtonStyles = (theme: Theme) => ({
  borderRadius: 1,
  fontFamily: "Raleway, sans-serif",
  fontWeight: 700,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
  },
});

// Consistent container styling
export const getContainerStyles = () => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden",
});

// Consistent page container styling
export const getPageContainerStyles = () => ({
  // maxWidth: false,
  px: { xs: 2, sm: 3, md: 4, lg: 4, xl: 4 },
  maxWidth: "100%",
  mx: 0,
});
