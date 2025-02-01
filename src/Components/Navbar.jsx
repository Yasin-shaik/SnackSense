import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
//import login from "./Pages/Login";


export default function Navbar({ scrollToFeatureSteps }) {
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {  // Adjust the scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)",  // Reduced opacity when scrolled
        boxShadow: "none",
        backdropFilter: isScrolled ? "blur(5px)" : "none",  // Apply blur when scrolled
        padding: "8px 0",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",  // Smooth transition
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: isScrolled ? "black" : "white",  // Change text color based on scroll
            fontWeight: "bold",
            transition: "color 0.3s ease",  // Smooth transition for color change
          }}
        >
          Logo
        </Typography>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button 
            component={Link} 
            to="/" 
            sx={{
              color: isScrolled ? "black" : "white",  // Change text color based on scroll
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",  // Smooth transition for color change
            }}
          >
            Home
          </Button>
          <Button 
            // component={Link} 
            // to="/how-it-works" 
            sx={{
              color: isScrolled ? "black" : "white",  // Change text color based on scroll
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",  // Smooth transition for color change
            }}
            onClick={scrollToFeatureSteps}
          >
            How it works
          </Button>
          <Button 
            // component={Link} 
            // to="/features" 
            sx={{
              color: isScrolled ? "black" : "white",  // Change text color based on scroll
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",  // Smooth transition for color change
            }}
          >
            Features
          </Button>
        </Box>

        {/* SignUp/Login Button */}
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
          Join Us!
        </Button>
      </Toolbar>
    </AppBar>
  );
}
