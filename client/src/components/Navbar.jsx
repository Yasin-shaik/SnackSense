import React, { useContext } from "react";
import {AppContext} from "../context/AppContext";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const { user, logoutUser, loading } = useContext(AppContext);
  const navigate = useNavigate();

  // Ensure the navbar only renders after the user data has been loaded
  if (loading) {
    return null; // You can also show a loading spinner here if desired
  }

  const isAuthenticated = user !== null;

  const handleHomeNavigation = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // Redirect to the homepage after logout
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(255, 255, 255, 0.3)",
        boxShadow: "none",
        backdropFilter: "none",
        padding: "8px 0",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/home">
            <img src={logo} alt="Logo" style={{ height: "60px", width: "auto" }} />
          </Link>
        </Box>

        {/* Center Nav Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            onClick={handleHomeNavigation}
            sx={{
              color: "black",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => scrollToSection("features-section")}
            sx={{
              color: "black",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            How it works
          </Button>
          <Button
            onClick={() => scrollToSection("why-choose")}
            sx={{
              color: "black",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            Features
          </Button>
        </Box>

        {/* Right Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/nutritionists"
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "20px",
                  padding: "6px 20px",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": { background: "#333" },
                }}
              >
                Connect to a Nutritionist
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  background: "#e53935",
                  color: "white",
                  borderRadius: "20px",
                  padding: "6px 20px",
                  fontWeight: "500",
                  textTransform: "none",
                  "&:hover": { background: "#c62828" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                background: "black",
                color: "white",
                borderRadius: "20px",
                padding: "6px 20px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": { background: "#333" },
              }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
