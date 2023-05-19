/* eslint-disable no-nested-ternary */
import { Box, Typography, Button } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { selectCurrentToken } from '../../app/features/auth/authSelectors';

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the token is expired
  let isTokenExpired = false;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        isTokenExpired = true;
      }
    } catch (error) {
      console.log('Error decoding token:', error);
    }
  }

  return isTokenExpired ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h5" color="error" marginBottom={2}>
        Session expired. Please log in again.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Login
      </Button>
    </Box>
  ) : (
    token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  );
}

export default RequireAuth;
