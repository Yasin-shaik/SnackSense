import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a MUI Theme (Optional)
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Report performance metrics
reportWebVitals();
