import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { DriveEta } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/AuthContext";
import ThemeSwitcher from "../common/ThemeSwitcher";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[200]
            : theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: 56, py: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mr: 3,
          }}
          onClick={() => navigate("/")}
        >
          <DriveEta
            sx={{
              mr: 1,
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? "inherit"
                  : theme.palette.grey[800],
              fontSize: 28,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              fontFamily: "Raleway, sans-serif",
              fontSize: "1.4rem",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`
                  : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SayaraHub
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isAuthenticated ? (
            <>
              <Button
                variant="contained"
                onClick={() => navigate("/post-ad")}
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                }}
              >
                Post Ad
              </Button>
              <IconButton size="small" onClick={handleMenuOpen} color="inherit">
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: "rgba(255,255,255,0.2)",
                  }}
                >
                  {user?.firstName?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    mt: 1,
                    minWidth: 160,
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                  }}
                >
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
