import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography>
        Manage your tokens, view statistics, and more.
      </Typography>
    </Container>
  );
};

export default Dashboard;
