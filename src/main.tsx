import App from '@/App.tsx';
import theme from '@/config/theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { OpenAPI } from './api';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={App} />
    </ThemeProvider>
  </React.StrictMode>,
);

// api setup
OpenAPI.BASE = import.meta.env.VITE_LMS_API_SERVER || '';
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.CREDENTIALS = 'include';
