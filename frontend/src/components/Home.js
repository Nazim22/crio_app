import React from 'react';
import { Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to Crio Token Management
      </Typography>
      <Typography variant="body1">
        Manage your tokens efficiently with our seamless app.
      </Typography>
    </Container>
  );
};

export default Home;
