import React from "react";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import logi from "../assets/images/woman.jpg"; // Import background image

export default function SnackSense() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${logi})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay for readability
          zIndex: 1,
        }}
      ></Box>
      <Container
        sx={{
          zIndex: 2,
          position: "relative",
          textAlign: "center",
          color: "white",
          padding: "0"
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight="bold">
            Welcome! Let's make healthier snack choices today!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your health insights, diet plans, and barcode scanner are just a tap
            away.
          </Typography>
        </Box>

        {/* Call to Action Section */}
        <Paper
          sx={{
            backgroundColor: "#7f5f32", // Custom color for CTA section
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "inline-block",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Make Every Bite Count!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Keep scanning and learning about your food choices. The more you
            scan, the smarter our recommendations get!
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Link to="/scanQR">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#313c03",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 30px",
                  "&:hover": {
                    backgroundColor: "#3e5c12",
                  },
                }}
              >
                Scan More Snacks
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
