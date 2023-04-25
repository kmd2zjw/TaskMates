import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContexProvider } from './context/authContext';
import Box from '@mui/material/Box';
import image from "./img/4907157.jpg";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
        <Box>
            <App />
        </Box>
    </AuthContexProvider>
  </React.StrictMode>
);
