import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context/AppContext"; // Import AppContext
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";

export default function ForgotPassword() {
  const { user } = useContext(AppContext); // Using user state from AppContext
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      toast.warning("You are already logged in. Redirecting to home.");
      navigate("/home"); // Redirect to home page if user is logged in
    }
  }, [user, navigate]);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    try {
      // Send request to backend to reset the password
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resetPassword`, { email });
      toast.success("Password reset link sent to your email");
      navigate("/reset-password"); // Redirect to reset password page
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error sending password reset link");
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer position="top-center" theme="light" />
      <Box sx={{ boxShadow: 3, p: 3, borderRadius: 2 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
          Forgot Password
        </Typography>
        <TextField
          fullWidth
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleForgotPassword}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
