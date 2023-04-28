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
        <Box component="div" style={{
            backgroundImage:`url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}
             sx={{
                 overflow:'hidden',
                 minHeight: '100vh',
                 width: '100vw',
                 m: '0px'
             }}>
            <App />
        </Box>
    </AuthContexProvider>
  </React.StrictMode>
);
