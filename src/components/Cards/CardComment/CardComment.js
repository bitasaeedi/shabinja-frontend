import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  maxWidth: 300,
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CardComment = ({ name, comment, avatarUrl }) => {
  return (
    <StyledCard>
      <Avatar
        src={avatarUrl}
        alt={name}
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          "{comment}"
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default CardComment;

// Example usage
// <CardComment
//   name="John Doe"
//   comment="This website is fantastic!"
//   avatarUrl="https://via.placeholder.com/80"
// />
