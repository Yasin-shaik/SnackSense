import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import logi from "../assets/images/logi.jpg";
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
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("");
  const { loginUser } = useContext(AppContext);


  const login = async () => {
    if (!email || !password) {
      toast.warning("Enter all the fields required");
      return;
    }
    if (password.length < 3) {
      toast.error("Password too short");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/${role === "User" ? "loginUser" : "loginNutri"}`,
        { email, password }
      );

      console.log("🧪 Login API response:", response.data);
console.log("🎯 token:", response.data?.token);
console.log("👤 user:", response.data?.user);



      loginUser(response.data.user, response.data.token);
      toast.success("Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${logi})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <ToastContainer position="top-center" theme="light" />
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            boxShadow: 3,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" },
            mx: "auto",
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="#313c03">
            Login
          </Typography>
          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1" color="#313c03">
              Login as
            </Typography>
            <Select value={role} onChange={(e) => setRole(e.target.value)} sx={{ color: "#313c03" }}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Nutritionist">Nutritionist</MenuItem>
            </Select>
          </FormControl>
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
            onClick={login}
          >
            Login
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="#313c03">
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
                sx={{ cursor: "pointer", fontWeight: "bold", color: "#1565c0" }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
