import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context/AppContext"; // Import AppContext
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { user, loginUser } = useContext(AppContext); // Using user state from AppContext
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.warning("Please log in to reset your password");
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [user, navigate]);

  const handleResetPassword = async () => {
    if (password !== repeatPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      // Call backend to reset password
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resetPassword`, { password });

      toast.success("Password reset successful");

      // Log the user in after reset (assuming you have the necessary token)
      loginUser({ email: user.email }, "new-jwt-token"); // Use actual user data and token

      // Redirect to the home page or the user's profile page
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Error resetting password");
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer position="top-center" theme="light" />
      <Box sx={{ boxShadow: 3, p: 3, borderRadius: 2 }}>
        <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
          Reset Password
        </Typography>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" fullWidth onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}
