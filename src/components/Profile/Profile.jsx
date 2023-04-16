import { ExitToApp } from '@mui/icons-material';
import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth';

const Profile = () => {
  const userData = useSelector(userSelector);
  const favoriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          My Profile - {userData.user.username}
        </Typography>
        <Button
          color="inherit"
          onClick={logout}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? <Typography variant="h5">Add favorites or watchlist movies to see them here!</Typography> : <Box>Favorite movies</Box>}
    </Box>
  );
};

export default Profile;
