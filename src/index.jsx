import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App.js';
import reportWebVitals from './reportWebVitals.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();
const GOOGLE_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
