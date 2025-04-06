import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import signUpImage from '../assets/images/logi.jpg'; // Import background image

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import axios from "axios"; // Ensure axios is installed

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeat, setRepeat] = useState('');
  const [role, setRole] = useState('User');
  const { loginUser } = useContext(AppContext); // Use loginUser from context

  const register = async () => {
    if (!name || !email || !password || !repeat) {
      toast.warning("Fill all the required fields");
      return;
    }
    if (password !== repeat) {
      toast.warning("Password & confirm password not matched");
      return;
    }
    if (password.length < 8) {
      toast.warning("Password should be more than 8 characters");
      return;
    }

    try {
      // Perform API call based on role
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/${role === 'User' ? "registerUser" : "registerNutri"}`,
        { name, email, password }
      );
      

      // If registration is successful, store the user and token in context
      loginUser(response.data.user, response.data.token);
      toast.success("Registration successful");

      setTimeout(() => {
        navigate("/user-details"); // Redirect to home after successful registration
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${signUpImage})`, // Background image from assets
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <ToastContainer position="top-center" theme="light" />
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            boxShadow: 3,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" },
            mx: "auto",
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="#313c03">
            Sign up
          </Typography>
          <FormControl fullWidth margin="normal">
            <fieldset sx={{ color: "#313c03" }}>Signup as</fieldset>
            <Select value={role} onChange={(e) => setRole(e.target.value)} sx={{ color: "#313c03" }}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Nutritionist">Nutritionist</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Name"
            value={name}
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Repeat Password"
            type="password"
            value={repeat}
            margin="normal"
            onChange={(e) => setRepeat(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Link
              onClick={() => navigate("/forgot-password")}
              sx={{ cursor: "pointer", fontWeight: "bold", color: "#1565c0" }}
            >
              Forgot Password?
            </Link>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, fontWeight: "bold", backgroundColor: "#313c03", color: "white" }}
            onClick={register}
          >
            Register
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="#313c03">
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer", fontWeight: "bold", color: "#1565c0" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
