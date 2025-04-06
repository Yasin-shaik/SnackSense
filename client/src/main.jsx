import React from 'react';
import ReactDOM from 'react-dom/client';  // Note the 'client' import in React 18+
import { AppProvider } from './context/AppContext'; // Import the provider
import App from './App';  // Your main app component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element for React 18+

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
