import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  console.log("Token from localStorage: ", token);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5100";

  // Fetch user details using Axios
  const fetchUser = useCallback(async () => {
    if (!token) return; // Don't make the request if token is missing

    try {
      const response = await axios.get(`${API_URL}/api/user/userProfile`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Pass the token from state
        },
      });

      console.log('Response from server:', response);

      if (response && response.data) {
        setUser(response.data);
      } else {
        setUser(null); // Reset user if no data found
      }

    } catch (error) {
      console.error('Error fetching user:', error);
      
      // Check if the error is due to token expiration (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        // Handle token expiration here, such as redirecting to login
        console.warn("Token expired. Please log in again.");
        localStorage.removeItem('token');  // Remove expired token from localStorage
        setToken(null);
        setUser(null);
        // Optionally, you can redirect the user to the login page here
        window.location.href = "/login"; // or use navigate("/login") if using React Router
      } else {
        setUser(null); // Handle other errors
      }
    } finally {
      setLoading(false); // End the loading state once the request is finished
    }
  }, [API_URL, token]); // Add token to the dependency array

  // UseEffect to trigger fetching user details when token changes
  useEffect(() => {
    if (token) {
      fetchUser(); // Fetch user if token exists
    } else {
      setLoading(false); // End loading if no token is found
    }
  }, [token, fetchUser]);

  // Handle login, storing token and user data
  const loginUser = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token); // Store the token in localStorage
  };

  // Handle logout, clearing token and user data
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  // Function to save user details to backend
  const saveUserDetails = async (userData) => {
    if (!token) return; // Check if the token is available

    try {
      const response = await axios.post(`${API_URL}/api/user/userDetails`, {
        email: userData.email,  // Ensure you're passing the required details
        userData: userData, // Pass the user data
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, // Pass token for authentication
        },
      });

      console.log('User details saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  return (
    <AppContext.Provider value={{ user, token, loginUser, logoutUser, loading, saveUserDetails }}>
      {children}
    </AppContext.Provider>
  );
};
